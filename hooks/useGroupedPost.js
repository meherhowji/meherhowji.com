"use client"
import { useEffect, useState, useRef } from 'react';
import sortBy from 'ramda/es/sortBy';
import propOr from 'ramda/es/propOr';

export default function useGroupedPosts(postList, sortByOrder = false) {
  const tagOrder = ['javascript', 'blog', 'cloud', 'nextjs'];
  const [groupedPosts, setGroupedPosts] = useState(null);
  const dataSortedByTime = useRef(null);

  useEffect(() => {
    if (postList.length) {
      const postData = new Map();

      tagOrder.forEach((tag) => {
        postData.set(tag, []);
      });
      postList.forEach((item) => {
        let tag = item.tags[0];
        if (tagOrder.includes(tag)) {
          postData.get(tag).push(item);
        }
      });

      const dataWithValues = Array.from(postData).filter(
        ([key, value]) => value.length
      );
      const data = new Map(dataWithValues);

      setGroupedPosts(data);
    }
  }, [postList]);

  useEffect(() => {
    if (sortByOrder) {
      const sorted = new Map();
      const preferOrderSort = sortBy((obj) => propOr(Infinity, 'order', obj));
      groupedPosts.forEach((value, key) => {
        sorted.set(key, preferOrderSort(value));
      });
      !dataSortedByTime.current && (dataSortedByTime.current = groupedPosts);
      setGroupedPosts(sorted);
    } else {
      dataSortedByTime.current && setGroupedPosts(dataSortedByTime.current);
    }
  }, [sortByOrder]);

  return groupedPosts;
}

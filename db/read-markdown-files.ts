import fs from 'fs';
import path from 'path';

interface BlogPost {
  content: string;
  metadata: Metadata;
  computedFields: ComputedFields;
}

interface ComputedFields {
  slug: string;
  readingTime: string;
}

type Metadata = {
  title: string;
  excerpt: string;
  publishedTime: string;
  modifiedTime: string;
  coverImage?: string;
  coverCredit?: string;
  author: string;
  tags: string[];
  draft: string;
  order?: number;
  publishTo?: string;
};

// Define the absolute path to the Markdown blog posts directory.
// process.cwd() returns the current working directory of the Node.js process,
// and path.join() is used to append the relative path (MARKDOWN_BLOG_POSTS_PATH)
// to create the full path to the blog posts directory.
export function getBlogPosts(): BlogPost[] {
  const MARKDOWN_BLOG_POSTS_PATH = 'data/articles';
  const ROOT_FOLDER = path.join(process.cwd(), MARKDOWN_BLOG_POSTS_PATH);
  // getMDXData > getMDXFiles > readMDXFile > parseFrontMatter > enrichComputedFields
  return getMDXData(ROOT_FOLDER); //
}

function getMDXData(folder: string): BlogPost[] {
  return getMDXFiles(folder).map((file) => {
    const { content, metadata } = readMDXFile(path.join(folder, file));
    const slug = path.basename(file, path.extname(file));
    const computedFields = enrichComputedFields(slug, content); // Enrich the blog post with computed fields
    return {
      content,
      metadata,
      computedFields,
    };
  });
}

function getMDXFiles(folder: string): string[] {
  // the contents are mdx but the extension is md because it is pull from obsidian vault
  return fs.readdirSync(folder).filter((file) => path.extname(file) === '.md');
}

function readMDXFile(filePath: string): {
  content: string;
  metadata: Metadata;
} {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error('Failed to parse frontmatter');

  let metadata: Partial<Metadata> = {};
  // strip out the frontmatter metadata block
  const content = fileContent.replace(frontmatterRegex, '').trim();
  // the 0th index is the entire frontmatter block including the opening and closing ---.
  // the 1st index is the content inside the frontmatter block, without the opening and closing ---.
  const frontMatterBlock = match[1];
  const frontMatterLines = frontMatterBlock.trim().split('\n');

	// clean up frontmatter
  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(':');
    let value: string[] | string = valueArr.join(':').trim();
    value =
      key === 'tags' ? value.split(', ') : value.replace(/^'(.*)'$/, '$1');
    metadata[key.trim() as keyof Metadata] = value as any;
  });

  return { metadata: metadata as Metadata, content };
}

function enrichComputedFields(slug: string, content: string): ComputedFields {
  const computeReadingTime = (text: string): string => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    const suffix = readingTime > 1 ? 'mins' : 'min';
    return `${readingTime} ${suffix}`;
  };

  return {
    slug,
    readingTime: computeReadingTime(content),
  };
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload('/assets/sprite.svg', { as: 'image' });
  return null;
}

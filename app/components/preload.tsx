'use client';
import ReactDOM from 'react-dom';


// TODO: verify this
export function PreloadResources() {
  ReactDOM.preload('/assets/sprite.svg', { as: 'image' });
  return null;
}

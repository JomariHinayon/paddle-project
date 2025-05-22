import React from 'react';
// This file helps resolve TypeScript issues in Netlify environment
declare module 'react' {
  export = React;
}

declare namespace React {
  // Add minimal type declarations for React
  
  
  interface Component<P = {}, S = {}> { }
  interface FunctionComponent<P = {}> { }
}

declare module 'react-dom' {
  export function render(element, container);
  export function hydrate(element, container);
}

declare module 'next' {
  export default function Next();
}

declare module '@/*' {
  const content;
  export default content;
} 
// This file helps resolve TypeScript issues in Netlify environment
declare module 'react' {
  export = React;
}

declare namespace React {
  // Add minimal type declarations for React
  interface Element { }
  interface ReactNode { }
  interface Component<P = {}, S = {}> { }
  interface FunctionComponent<P = {}> { }
}

declare module 'react-dom' {
  export function render(element: React.ReactNode, container: Element): void;
  export function hydrate(element: React.ReactNode, container: Element): void;
}

declare module 'next' {
  export default function Next(): any;
}

declare module '@/*' {
  const content: any;
  export default content;
} 
import React from 'react';
// Basic TypeScript declarations to prevent build errors

// React declarations
declare namespace React {
  interface FC<P = {}> {
    (props);
  }
  
  interface Component<P = {}, S = {}> {
    render();
  }
  
  
  
}

// Path aliases
declare module '@/*' {
  const content;
  export default content;
  export * from content;
}

// Next.js declarations
declare module 'next/navigation' {
  export function useRouter(): {
    push(url);
    replace(url);
    back();
    forward();
  };
  
  export function useSearchParams(): {
    get(key);
    getAll(key);
    has(key);
    forEach(callback: (value, key=> void);
  } | null;
}

// Firebase auth declarations
declare module 'firebase/auth' {
  export function sendEmailVerification(user);
  export 
    email?;
    reload();
  };
} 
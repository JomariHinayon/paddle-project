// Basic TypeScript declarations to prevent build errors

// React declarations
declare namespace React {
  interface FC<P = {}> {
    (props: P): React.ReactElement | null;
  }
  
  interface Component<P = {}, S = {}> {
    render(): React.ReactNode;
  }
  
  type ReactNode = ReactElement | string | number | boolean | null | undefined;
  type ReactElement = any;
}

// Path aliases
declare module '@/*' {
  const content: any;
  export default content;
  export * from content;
}

// Next.js declarations
declare module 'next/navigation' {
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    back(): void;
    forward(): void;
  };
  
  export function useSearchParams(): {
    get(key: string): string | null;
    getAll(key: string): string[];
    has(key: string): boolean;
    forEach(callback: (value: string, key: string) => void): void;
  } | null;
}

// Firebase auth declarations
declare module 'firebase/auth' {
  export function sendEmailVerification(user: any): Promise<void>;
  export type User = {
    emailVerified: boolean;
    email?: string | null;
    reload(): Promise<void>;
  };
} 
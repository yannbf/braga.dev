import type { ReactNode } from 'react'

// next-themes@0.0.14 predates the React 18+ @types/react convention where
// React.FC no longer implicitly includes `children` in its props.
declare module 'next-themes' {
  export interface ThemeProviderProps {
    children?: ReactNode
  }
}

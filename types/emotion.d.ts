import '@emotion/react'

// Matches the shape of the theme objects in .storybook/themes.ts, which
// Storybook's ThemeProvider decorator (.storybook/withTheme.tsx) supplies.
declare module '@emotion/react' {
  export interface Theme {
    text: string
    secondary?: string
    backgrounds: {
      app: string
      card: string
    }
  }
}

import '@/css/tailwind.css'
import 'katex/dist/katex.css'
import './styles.css'
import '@code-hike/mdx/dist/index.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import blogMetadata from '@/data/blogMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import CommandPalette from '@/components/CommandPalette'
import * as React from 'react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <CommandPalette blogPosts={blogMetadata}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </CommandPalette>
    </ThemeProvider>
  )
}

import '@/css/tailwind.css'
import 'katex/dist/katex.css'
import '../pages/styles.css'
import '@code-hike/mdx/dist/index.css'

import '@fontsource/inter/variable-full.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

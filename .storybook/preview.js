import { withTheme } from './withTheme'
import { withI18n } from './withI18n'
import { withFidelity } from './withFidelity'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withRTL = (StoryFn, context) => {
  const { parameters, globals } = context

  const defaultDirection = 'ltr'
  const textDirection = parameters.textDirection || globals.textDirection || defaultDirection

  if (textDirection === 'side-by-side' || textDirection === 'stacked') {
    const isStacked = textDirection === 'stacked'
    const styles = {
      grid: {
        display: 'grid',
        gridTemplateColumns: isStacked ? '1fr' : 'repeat(auto-fit, minmax(0px, 1fr))',
        height: isStacked ? 'auto' : '100vh',
      },
      gridItem: {
        outline: '1px solid #eee',
      },
    }

    return (
      <div style={styles.grid}>
        <div style={styles.gridItem}>
          <StoryFn />
        </div>
        <div style={styles.gridItem} dir="rtl">
          <StoryFn />
        </div>
      </div>
    )
  }

  // Set RTL only if passed as a parameter or toggled via toolbar
  if (textDirection === 'rtl') {
    return (
      <div dir="rtl">
        <StoryFn />
      </div>
    )
  }

  return <StoryFn />
}

export const globalTypes = {
  fidelity: {
    name: 'Low fidelity',
    description: 'Toggle low fidelity mode',
    defaultValue: 'fidelity',
    toolbar: {
      // See this link for the list of available icons that you can use:
      // https://storybook.js.org/docs/react/faq#what-icons-are-available-for-my-toolbar-or-my-addon
      icon: 'listunordered',
      dynamicTitle: true,
      items: [
        { value: 'low', icon: 'listunordered', title: 'Low fidelity' },
        { value: 'high', icon: 'undo', title: 'Original' },
      ],
      shortcuts: {
        next: {
          label: 'Go to next fidelity mode',
          keys: ['shift', 'Q'],
        },
        previous: {
          label: 'Go to previous fidelity mode',
          keys: ['Q'],
        },
        reset: {
          label: 'Reset fidelity mode',
          keys: ['control', 'Q'],
        },
      },
    },
  },
  // textDirection: {
  //   name: 'Text direction',
  //   description: 'Direction of the text',
  //   defaultValue: 'ltr',
  //   toolbar: {
  //     // See this link for the list of available icons that you can use:
  //     // https://storybook.js.org/docs/react/faq#what-icons-are-available-for-my-toolbar-or-my-addon
  //     icon: 'arrowrightalt',
  //     items: [
  //       { value: 'ltr', icon: 'arrowrightalt', title: 'left to right' },
  //       { value: 'rtl', icon: 'arrowleftalt', title: 'right to left' },
  //       { value: 'side-by-side', icon: 'sidebaralt', title: 'both side by side' },
  //       { value: 'stacked', icon: 'bottombar', title: 'both stacked' },
  //     ],
  //     shortcuts: {
  //       next: {
  //         label: 'Go to next reading mode',
  //         keys: ['shift', 'R'],
  //       },
  //       previous: {
  //         label: 'Go to previous reading mode',
  //         keys: ['R'],
  //       },
  //       reset: {
  //         label: 'Reset reading mode',
  //         keys: ['control', 'R'],
  //       },
  //     },
  //   },
  // },
  // theme: {
  //   name: 'Theme',
  //   description: 'Set the color theme',
  //   defaultValue: 'light',
  //   toolbar: {
  //     dynamicTitle: true,
  //     // See this link for the list of available icons that you can use:
  //     // https://storybook.js.org/docs/react/faq#what-icons-are-available-for-my-toolbar-or-my-addon
  //     items: [
  //       { value: 'light', right: '⚪️', title: 'Light' },
  //       { value: 'dark', right: '⚫️', title: 'Dark' },
  //       { value: 'acqua', right: '🔵', title: 'Acqua' },
  //       { value: 'fira', right: '🔴', title: 'Fira' },
  //       { value: 'terra', right: '🟠', title: 'Terra' },
  //       { value: 'side-by-side', icon: 'sidebaralt', title: 'all side by side' },
  //       { value: 'stacked', icon: 'bottombar', title: 'all stacked' },
  //     ],
  //     shortcuts: {
  //       next: {
  //         label: 'Go to next reading mode',
  //         keys: ['shift', 'W'],
  //       },
  //       previous: {
  //         label: 'Go to previous reading mode',
  //         keys: ['W'],
  //       },
  //       reset: {
  //         label: 'Reset reading mode',
  //         keys: ['control', 'W'],
  //       },
  //     },
  //   },
  // },
  // i18n: {
  //   name: 'I18n',
  //   description: 'Set the language',
  //   defaultValue: 'en',
  //   toolbar: {
  //     dynamicTitle: true,
  //     // See this link for the list of available icons that you can use:
  //     // https://storybook.js.org/docs/react/faq#what-icons-are-available-for-my-toolbar-or-my-addon
  //     items: [
  //       { value: 'en', right: '🇺🇸', title: 'English' },
  //       { value: 'pt', right: '🇧🇷', title: 'Portuguese' },
  //       { value: 'side-by-side', icon: 'sidebaralt', title: 'all side by side' },
  //       { value: 'stacked', icon: 'bottombar', title: 'all stacked' },
  //     ],
  //     shortcuts: {
  //       next: {
  //         label: 'Go to next language',
  //         keys: ['shift', 'L'],
  //       },
  //       previous: {
  //         label: 'Go to previous language',
  //         keys: ['L'],
  //       },
  //       reset: {
  //         label: 'Reset language',
  //         keys: ['control', 'L'],
  //       },
  //     },
  //   },
  // },
}

export const decorators = [
  withTheme,
  // withRTL,
  // withI18n,
  withFidelity,
]

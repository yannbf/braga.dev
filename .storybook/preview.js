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

  // Set RTL only if passed as a parameter or toggled via toolbar
  if (parameters.rtl || globals.textDirection === 'rtl') {
    return (
      <div dir="rtl">
        <StoryFn />
      </div>
    )
  }

  return <StoryFn />
}

export const decorators = [withRTL]

export const globalTypes = {
  textDirection: {
    name: 'Text direction',
    description: 'Direction of the text',
    defaultValue: 'ltr',
    toolbar: {
      // See this link for the list of available icons that you can use:
      // https://storybook.js.org/docs/react/faq#what-icons-are-available-for-my-toolbar-or-my-addon
      icon: 'arrowrightalt',
      items: [
        { value: 'ltr', icon: 'arrowrightalt', title: 'left to right' },
        { value: 'rtl', icon: 'arrowleftalt', title: 'right to left' },
      ],
    },
  },
}

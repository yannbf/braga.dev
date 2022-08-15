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

  const defaultDirection = 'rtl'
  const textDirection = parameters.textDirection || globals.textDirection || defaultDirection

  if (textDirection === 'all') {
    const gridStyles = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(0px, 1fr))',
      height: '100vh',
    }
    return (
      <div style={gridStyles}>
        <div style={{ borderRight: '1px solid #ccc' }}>
          <StoryFn />
        </div>
        <div dir="rtl">
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
        { value: 'all', icon: 'transfer', title: 'both' },
      ],
    },
  },
}

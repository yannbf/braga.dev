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

  // Set RTL only if passed as a parameter
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
    defaultValue: 'LTR',
    toolbar: {
      icon: 'arrowrightalt',
      items: [
        { value: 'ltr', icon: 'arrowrightalt', title: 'left to right' },
        { value: 'rtl', icon: 'arrowleftalt', title: 'right to left' },
      ],
    },
  },
}

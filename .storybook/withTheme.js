import { Global, ThemeProvider, css } from '@emotion/react'

const allThemes = {
  light: {
    primary: '#333',
    appBackground: '#fff',
    cardBackground: 'linear-gradient(to bottom right, #fff, #fff)',
  },
  dark: {
    primary: '#fff',
    appBackground: '#000',
    cardBackground: 'linear-gradient(to bottom right, #252525, #4a4a4a)',
  },
  acqua: {
    primary: '#fff',
    appBackground: '#004cb2',
    cardBackground: 'linear-gradient(to bottom right, #00bfad, #99a3d4)',
  },
  fira: {
    primary: '#fff',
    secondary: '#f500bb',
    appBackground: '#cc3131',
    cardBackground: 'linear-gradient(to bottom right, #ec407b, #ff7d94)',
  },
  terra: {
    primary: '#fff',
    appBackground: '#585858',
    cardBackground: 'linear-gradient(to right bottom, rgb(177 71 71), rgb(255 212 125))',
  },
}

export const withTheme = (StoryFn, context) => {
  const { parameters, globals } = context

  const defaultTheme = 'light'
  const theme = parameters.theme || globals.theme || defaultTheme

  if (theme === 'side-by-side' || theme === 'stacked') {
    const isStacked = theme === 'stacked'
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
        <Global
          styles={css`
            body {
              padding: 0px !important;
            }
          `}
        />
        {Object.values(allThemes).map((tm) => (
          <ThemeProvider theme={tm}>
            <div style={{ padding: '1rem', background: tm.appBackground }}>
              <StoryFn />
            </div>
          </ThemeProvider>
        ))}
      </div>
    )
  }

  const selectedTheme = allThemes[theme]
  return (
    <ThemeProvider theme={selectedTheme}>
      <Global
        styles={css`
          body {
            background: ${selectedTheme.appBackground};
          }
        `}
      />
      <StoryFn />
    </ThemeProvider>
  )
}

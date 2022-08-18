import { Global, ThemeProvider, css } from '@emotion/react'
import { appThemes } from './themes'

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
              // remove body padding for grid view and add padding in grid item instead
              padding: 0px !important;
            }
          `}
        />
        {Object.values(appThemes).map((tm) => (
          <ThemeProvider theme={tm}>
            <div style={{ padding: '1rem', background: tm.backgrounds.app }}>
              <StoryFn />
            </div>
          </ThemeProvider>
        ))}
      </div>
    )
  }

  const selectedTheme = appThemes[theme]
  return (
    <ThemeProvider theme={selectedTheme}>
      <Global
        styles={css`
          body {
            // override body styles to get a matching background color
            background: ${selectedTheme.backgrounds.app};
          }
        `}
      />
      <StoryFn />
    </ThemeProvider>
  )
}

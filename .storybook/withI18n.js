import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from './i18n'

export const withI18n = (StoryFn, context) => {
  const { parameters, globals } = context
  const { t, i18n } = useTranslation()
  const defaultLanguage = 'en'
  const language = parameters.i18n || globals.i18n || defaultLanguage

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  if (language === 'side-by-side' || language === 'stacked') {
    const isStacked = language === 'stacked'
    const styles = {
      grid: {
        display: 'grid',
        gridTemplateColumns: isStacked ? '1fr' : 'repeat(auto-fit, minmax(0px, 1fr))',
        height: isStacked ? 'auto' : '100vh',
      },
      gridItem: {
        position: 'relative',
        outline: '1px solid #eee',
      },
    }

    const langStyles = {
      position: 'absolute',
      top: '0.5rem',
      left: '0.5rem',
      fontSize: '12px',
      background: 'purple',
      padding: '0.25rem',
      borderRadius: '8px',
      color: 'white',
    }

    return (
      <div style={styles.grid}>
        {languages.map((lang) => (
          <span style={styles.gridItem}>
            <span style={langStyles}>{lang}</span>
            <StoryFn />
          </span>
        ))}
      </div>
    )
  }

  return <StoryFn />
}

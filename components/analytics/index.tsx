import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import Umami from './Umami'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  if (!isProduction) return null
  return (
    <>
      {siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {siteMetadata.analytics.umamiWebsiteId && <Umami />}
      {siteMetadata.analytics.googleAnalyticsId && <GA />}
    </>
  )
}

export default Analytics

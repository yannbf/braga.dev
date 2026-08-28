import siteMetadata from '@/data/siteMetadata'
import cvData from '@/data/cvData'
import { PageSEO } from '@/components/SEO'
import CV from '@/components/CV'

export default function CVPage() {
  return (
    <>
      <PageSEO title={`CV - ${siteMetadata.author}`} description="Yann Braga's resume" />
      <CV data={cvData} />
    </>
  )
}

import mailchimp from '@mailchimp/mailchimp_marketing'
import type { NextApiRequest, NextApiResponse } from 'next'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // E.g. us1
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID as string, {
      email_address: email,
      status: 'subscribed',
    })
    return res.status(201).json({ error: '' })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ error: err.message || err.toString() })
  }
}

export default handler

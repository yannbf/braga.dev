import { Card } from './Card'
import isChromatic from 'chromatic/isChromatic'

export default {
  title: 'Themed/Card',
  component: Card,
}

export const Primary = {
  parameters: {
    theme: isChromatic() ? 'stacked' : 'light',
  },
}

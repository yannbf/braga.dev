import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card } from './Card'
import isChromatic from 'chromatic/isChromatic'

const meta: Meta<typeof Card> = {
  title: 'Themed/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const Primary: Story = {
  parameters: {
    theme: isChromatic() ? 'stacked' : undefined,
  },
}

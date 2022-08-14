import talks from '@/data/talksData'
import TalkList from './TalkList'

export default {
  title: 'Components/TalkList',
  component: TalkList,
}

export const Default = {
  args: {
    talks,
  },
}

export const Empty = {}

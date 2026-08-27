declare module 'react-scroll-progress-bar' {
  import type { FC } from 'react'

  interface ProgressBarProps {
    bgcolor?: string
    height?: string
  }

  const ProgressBar: FC<ProgressBarProps>
  export default ProgressBar
}

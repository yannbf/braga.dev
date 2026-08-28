import type { ReactNode } from 'react'

// MDX renders `<table>` elements at their natural width, which overflows the
// prose column on narrow viewports. Wrapping it in a scrollable container
// keeps the table intact instead of forcing the whole page to scroll.
const TableWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper

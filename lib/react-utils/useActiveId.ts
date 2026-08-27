import { useEffect, useState } from 'react'

export interface ActiveIdItem {
  id: string
  parentId?: string
  depth: number
}

interface ActiveId {
  id: string
  parentId?: string
}

export const useActiveId = (items: ActiveIdItem[]) => {
  const [activeId, setActiveId] = useState<ActiveId | undefined>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId({
              id: entry.target.id,
              parentId: items.find(({ id }) => id === entry.target.id)?.parentId,
            })
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      items.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [items])

  return activeId
}

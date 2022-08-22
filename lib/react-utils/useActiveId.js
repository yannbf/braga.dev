import { useEffect, useState } from 'react'

export const useActiveId = (items) => {
  const [activeId, setActiveId] = useState()

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
      observer.observe(document.getElementById(id))
    })

    return () => {
      items.forEach(({ id }) => {
        if (document.getElementById(id)) {
          observer.unobserve(document.getElementById(id))
        }
      })
    }
  }, [items])

  return activeId
}

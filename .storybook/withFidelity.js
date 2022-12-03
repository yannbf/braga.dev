import { useEffect, useState } from 'react'

const getAllTextNodes = () => {
  let textNode,
    nodesWithText = []

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false)
  while ((textNode = walker.nextNode())) {
    nodesWithText.push(textNode.parentNode)
  }

  return nodesWithText.filter(Boolean)
}

const addSkeletonStyles = (element) => {
  const selector = element.tagName.toLowerCase()
  console.log({ selector })
  if (selector === 'script') return
  if (selector === 'path') {
    element.style.fill = 'transparent'
  } else if (selector === 'svg') {
    element.style.background = '#eee'
  } else if (selector === 'img') {
    element.src =
      'https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg'
    element.style.backgroundSize = 'contain'
    element.style.backgroundRepeat = 'no-repeat'
    element.style.backgroundPosition = 'center'
  }

  if (selector !== 'button') {
    element.style.borderRadius = '4px'
  }

  element.style.color = 'transparent'
  element.style.background = '#eee'
  element.style.border = 'none'
  element.style.boxShadow = 'none'
  element.style.outline = 'none'
}

export const withFidelity = (StoryFn, context) => {
  const { globals } = context
  const stylesMap = new Map()
  const [allElements, setAllElements] = useState()

  const fidelity = globals.fidelity

  useEffect(() => {
    const allTextElements = getAllTextNodes()
    allTextElements.push(...Array.from(document.querySelectorAll('path')))
    allTextElements.push(...Array.from(document.querySelectorAll('svg')))
    allTextElements.forEach((element) => {
      stylesMap.set(element, element.style)
    })

    setAllElements(allTextElements)
  }, [])

  useEffect(() => {
    if (!allElements) return

    if (fidelity === 'low') {
      allElements.forEach((textNode) => {
        addSkeletonStyles(textNode, 'text')
      })
    } else if (fidelity === 'high') {
      allElements.forEach((textNode) => {
        textNode.style = stylesMap.get(textNode)
      })
    }
  }, [allElements, fidelity])

  return <StoryFn />
}

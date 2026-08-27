import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'

export interface TocHeading {
  value: string
  url: string
  depth: number
}

interface RemarkTocHeadingsOptions {
  exportRef: TocHeading[]
}

export default function remarkTocHeadings(options: RemarkTocHeadingsOptions) {
  return (tree: any) =>
    visit(tree, 'heading', (node: any) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })
}

import NextImage from 'next/image'

const convertImage = (width, height) => {
  const w = typeof width === 'string' ? width.replace(/(px|[r]?em)$/, '') : width
  const h = typeof height === 'string' ? height.replace(/(px|[r]?em)$/, '') : height
  return `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`
}

const toBase64 = (str) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)
// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => {
  const extraProps =
    rest.placeholder === 'blur'
      ? {
          blurDataURL: `data:image/svg+xml;base64,${toBase64(
            convertImage(rest.width, rest.height)
          )}`,
        }
      : {}
  return <NextImage {...rest} {...extraProps} />
}

export default Image

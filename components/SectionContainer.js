export default function SectionContainer({ children, ...rest }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0" {...rest}>
      {children}
    </div>
  )
}

import type { ReactNode, SVGProps } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import type { CVData, CVExperienceEntry } from '@/data/cvData'

const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
)

interface CVSectionProps {
  title: string
  children: ReactNode
}

const CVSection = ({ title, children }: CVSectionProps) => (
  <section className="mt-6 break-inside-avoid">
    <h2 className="mb-2.5 border-b border-gray-300 pb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
      {title}
    </h2>
    {children}
  </section>
)

const ExperienceEntry = ({
  company,
  role,
  start,
  end,
  location,
  intro,
  bullets,
  techLine,
}: CVExperienceEntry) => (
  <div className="break-inside-avoid">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="font-semibold text-gray-900">
        {company} <span className="font-normal text-gray-500">— {role}</span>
      </h3>
      <span className="whitespace-nowrap text-right text-xs text-gray-500">
        {start} – {end}
      </span>
    </div>
    <p className="text-xs italic text-gray-500">{location}</p>
    {intro && <p className="mt-1.5 text-[13px] leading-snug text-gray-700">{intro}</p>}
    {techLine && <p className="mt-1 text-xs text-gray-500">{techLine}</p>}
    {bullets && (
      <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[13px] leading-snug text-gray-700">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    )}
  </div>
)

interface CVProps {
  data: CVData
}

const CV = ({ data }: CVProps) => {
  const {
    name,
    role,
    location,
    avatar,
    links,
    summary,
    experience,
    openSource,
    skills,
    education,
  } = data

  return (
    <div className="relative -mx-4 w-screen max-w-none bg-gray-200 px-4 py-10 dark:bg-neutral-950 sm:-mx-6 sm:px-6 sm:py-16 xl:left-1/2 xl:right-1/2 xl:-mx-[50vw] xl:w-screen xl:px-8 print:static print:left-auto print:right-auto print:m-0 print:w-auto print:bg-white print:p-0">
      <button
        type="button"
        onClick={() => window.print()}
        className="fixed right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-lg transition hover:bg-gray-700 dark:bg-black dark:hover:bg-gray-800 print:hidden"
      >
        <DownloadIcon className="h-3.5 w-3.5" />
        Download PDF
      </button>

      <div className="mx-auto max-w-[210mm] rounded-sm bg-white p-12 text-sm text-gray-900 shadow-2xl print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="flex items-start gap-5 border-b border-gray-300 pb-5">
          <Image
            src={avatar}
            alt={name}
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full print:h-16 print:w-16"
          />
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {name}
            </h1>
            <p className="mt-0.5 text-sm text-gray-600">{role}</p>
            <p className="text-xs text-gray-500">{location}</p>
            <p className="mt-2 flex flex-wrap gap-x-1.5 gap-y-0.5 text-xs text-gray-600">
              {links.map((link, index) => (
                <span key={link.kind} className="flex items-center gap-1.5">
                  <Link href={link.href} className="hover:text-gray-900 hover:underline">
                    {link.href.replace(/^https?:\/\//, '')}
                  </Link>
                  {index < links.length - 1 && <span className="text-gray-300">·</span>}
                </span>
              ))}
            </p>
          </div>
        </header>

        <p className="mt-5 text-[13px] leading-snug text-gray-700">{summary}</p>

        <CVSection title="Work Experience">
          <div className="space-y-5">
            {experience.map((entry) => (
              <ExperienceEntry key={entry.company} {...entry} />
            ))}
          </div>
        </CVSection>

        <CVSection title="Open Source">
          <ul className="space-y-1.5">
            {openSource.map((item) => (
              <li key={item.name} className="break-inside-avoid text-[13px] leading-snug">
                <Link href={item.href} className="font-semibold text-gray-900 hover:underline">
                  {item.name}
                </Link>{' '}
                <span className="text-gray-500">— {item.role}</span>
                {item.description && <span className="text-gray-700">: {item.description}</span>}
              </li>
            ))}
          </ul>
        </CVSection>

        <CVSection title="Skills">
          <p className="text-[13px] leading-snug text-gray-700">
            {skills.map((skill, index) => (
              <span key={skill}>
                {skill}
                {index < skills.length - 1 && <span className="text-gray-400"> · </span>}
              </span>
            ))}
          </p>
        </CVSection>

        <CVSection title="Education">
          <ul className="space-y-1">
            {education.map((entry) => (
              <li key={entry.institution} className="text-[13px] leading-snug text-gray-700">
                {entry.institution}
                {entry.degree ? ` — ${entry.degree}` : ''}
              </li>
            ))}
          </ul>
        </CVSection>

        <p className="mt-6 border-t border-gray-300 pt-3 text-xs text-gray-500">
          Conference talks and appearances →{' '}
          <Link href="/talks" className="text-gray-700 hover:underline">
            /talks
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CV

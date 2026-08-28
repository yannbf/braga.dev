import type { ReactNode, SVGProps } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import SocialIcon from '@/components/icon'
import type { CVData, CVExperienceEntry } from '@/data/cvData'

const BriefcaseIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const CodeIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const SparklesIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
)

const GraduationCapIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
  </svg>
)

interface CVSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

const CVSection = ({ title, icon, children }: CVSectionProps) => (
  <section className="pt-8">
    <h2 className="mb-4 flex items-center gap-2 text-base font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
      <span className="text-primary-500 dark:text-primary-400">{icon}</span>
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
  <div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {company} <span className="font-normal text-gray-500 dark:text-gray-400">— {role}</span>
      </h3>
      <span className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
        {start} – {end}
      </span>
    </div>
    <p className="text-xs italic text-gray-500 dark:text-gray-400">{location}</p>
    {intro && <p className="mt-1.5 text-gray-700 dark:text-gray-300">{intro}</p>}
    {techLine && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{techLine}</p>}
    {bullets && (
      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
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
    <div className="cv-card overflow-hidden rounded-2xl border border-gray-200 border-opacity-20 bg-white p-6 text-sm shadow-lg shadow-gray-400/20 dark:bg-[#303030] dark:shadow-gray-800/20 sm:p-10 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black print:shadow-none">
      <header className="flex flex-col items-center text-center">
        <Image
          src={avatar}
          alt={name}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full print:h-20 print:w-20"
        />
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 print:text-black">
          {name}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300 print:text-black">{role}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 print:text-black">{location}</p>
        <div className="mt-4 flex space-x-3 print:hidden">
          {links.map((link) => (
            <SocialIcon
              key={link.kind}
              kind={link.kind}
              href={link.href}
              animated={false}
              size="6"
            />
          ))}
        </div>
        {/* Screen-reader/print fallback for the icon-only link row above. */}
        <ul className="mt-2 hidden text-xs text-gray-600 print:flex print:flex-wrap print:justify-center print:gap-x-3 print:text-black">
          {links.map((link) => (
            <li key={link.kind}>{link.href.replace(/^https?:\/\//, '')}</li>
          ))}
        </ul>
      </header>

      <p className="mt-6 text-gray-700 dark:text-gray-300 print:text-black">{summary}</p>

      <CVSection title="Work Experience" icon={<BriefcaseIcon className="h-4 w-4" />}>
        <div className="space-y-6">
          {experience.map((entry) => (
            <ExperienceEntry key={entry.company} {...entry} />
          ))}
        </div>
      </CVSection>

      <CVSection title="Open Source" icon={<CodeIcon className="h-4 w-4" />}>
        <ul className="space-y-2">
          {openSource.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-semibold text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 print:text-black"
              >
                {item.name}
              </Link>{' '}
              <span className="text-gray-500 dark:text-gray-400 print:text-black">
                — {item.role}
              </span>
              {item.description && (
                <span className="text-gray-700 dark:text-gray-300 print:text-black">
                  : {item.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CVSection>

      <CVSection title="Skills" icon={<SparklesIcon className="h-4 w-4" />}>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200 print:border print:border-gray-400 print:bg-white print:text-black"
            >
              {skill}
            </span>
          ))}
        </div>
      </CVSection>

      <CVSection title="Education" icon={<GraduationCapIcon className="h-4 w-4" />}>
        <ul className="space-y-1">
          {education.map((entry) => (
            <li
              key={entry.institution}
              className="text-gray-700 dark:text-gray-300 print:text-black"
            >
              {entry.institution}
              {entry.degree ? ` — ${entry.degree}` : ''}
            </li>
          ))}
        </ul>
      </CVSection>

      <p className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 print:border-gray-400 print:text-black">
        Conference talks and appearances →{' '}
        <Link
          href="/talks"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 print:text-black"
        >
          /talks
        </Link>
      </p>
    </div>
  )
}

export default CV

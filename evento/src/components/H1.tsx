import { twMerge } from 'tailwind-merge'

type H1Props = {
  children: React.ReactNode
  className?: string
}

export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={twMerge(
        'text-3xl font-bold tracking-tight lg:text-6xl',
        className,
      )}
    >
      {children}
    </h1>
  )
}

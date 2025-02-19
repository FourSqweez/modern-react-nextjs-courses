import Logo from '@/components/logo'

type Props = {
  children: React.ReactNode
}

export default function Page({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <Logo />
      {children}
    </div>
  )
}

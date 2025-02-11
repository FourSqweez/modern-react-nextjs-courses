import Link from 'next/link'
import Logo from './Logo'

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Events',
    path: '/events/all',
  },
]
export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 sm:px-9">
      <Logo />
      <nav>
        <ul className="flex gap-x-6">
          {links.map((route) => (
            <li
              key={route.path}
              className="text-white/50 transition hover:text-white"
            >
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

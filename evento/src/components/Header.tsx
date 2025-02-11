'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const activePathname = usePathname()
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 sm:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="flex h-full gap-x-6">
          {links.map((route) => (
            <li
              key={route.path}
              className={clsx(
                'relative flex items-center transition hover:text-white',
                {
                  'text-white': activePathname === route.path,
                  'text-white/50': activePathname !== route.path,
                },
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {activePathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent absolute bottom-0 h-1 w-full"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

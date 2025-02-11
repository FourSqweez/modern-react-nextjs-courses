import Link from 'next/link'

const routes = [
  {
    path: '/terms-conditions',
    name: 'Terms & Conditions',
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto flex h-16 items-center justify-between border-t border-white/10 px-3 text-xs text-white/25 sm:px-9">
      <small className="text-xs">
        &copy; 2050 ByteGrad. All rights reserved.
      </small>

      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}

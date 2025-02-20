'use client'

import { logOut } from '@/actions/actions'
import { Button } from './ui/button'

type SignOutBtnProps = {}

export default function SignOutBtn({}: SignOutBtnProps) {
  return <Button onClick={async () => await logOut()}>Sign out</Button>
}

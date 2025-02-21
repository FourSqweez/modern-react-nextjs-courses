'use client'

import { logOut } from '@/actions/actions'
import { useTransition } from 'react'
import { Button } from './ui/button'

type SignOutBtnProps = {}

export default function SignOutBtn({}: SignOutBtnProps) {
  const [isPending, startTransition] = useTransition()
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut()
        })
      }}
    >
      Sign out
    </Button>
  )
}

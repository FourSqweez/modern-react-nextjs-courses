'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import PetForm from './pet-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout'
  children?: React.ReactNode
  disable?: boolean
  onClick?: () => void
}
export default function PetButton({
  actionType,
  children,
  onClick,
  disable,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (actionType === 'checkout') {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disable}>
        {children}
      </Button>
    )
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => flushSync(() => setIsFormOpen(false))}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

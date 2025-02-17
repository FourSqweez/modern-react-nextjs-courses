'use client'
import { IMG_BASE_URL } from '@/lib/constant'
import { usePetContext } from '@/lib/hooks'
import { FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

type PetFormProps = {
  actionType: 'add' | 'edit'
}
export default function PetForm({ actionType }: PetFormProps) {
  const { handleAddPet } = usePetContext()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        `${IMG_BASE_URL}/pet-placeholder.png`,
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    }

    handleAddPet(newPet)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" name="ownerName" type="text" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" name="imageUrl" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="text" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="name" name="notes" rows={3} required />
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end">
        {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
      </Button>
    </form>
  )
}

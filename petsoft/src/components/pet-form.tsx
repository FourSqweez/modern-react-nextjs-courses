'use client'
import { DEFAULT_PET_IMAGE } from '@/lib/constant'
import { usePetContext } from '@/lib/hooks'
import { petFormSchema, TPetForm } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PetFormBtn from './pet-form-btn'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

type PetFormProps = {
  actionType: 'add' | 'edit'
  onFormSubmission: () => void
}

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext()
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
  })

  return (
    <form
      action={async (formData) => {
        const result = await trigger()

        if (!result) return

        onFormSubmission()

        const petData = getValues()
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE

        if (actionType === 'add') {
          await handleAddPet(petData)
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData)
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register('ownerName')}
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            {...register('imageUrl')}
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register('age')}
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
          {errors.notes && (
            <span className="text-red-500">{errors.notes.message}</span>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  )
}

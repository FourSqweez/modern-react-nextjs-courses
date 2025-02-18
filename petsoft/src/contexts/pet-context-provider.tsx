'use client'
import { addPet, checkoutPet, editPet } from '@/actions/actions'
import { OmitPetType, PetIdType, PetType } from '@/lib/types'
import React, { createContext, useOptimistic, useState } from 'react'
import { toast } from 'sonner'

type PetContextProviderProps = {
  children: React.ReactNode
  data: PetType[]
}

type TPetContext = {
  pets: PetType[]
  selectedPetId: PetIdType | null
  handleChangeSelectedPetId: (id: PetIdType) => void
  handleCheckoutPet: (id: PetIdType) => Promise<void>
  handleAddPet: (newPet: OmitPetType) => Promise<void>
  handleEditPet: (petId: PetIdType, newPetData: OmitPetType) => Promise<void>
  selectedPet: PetType | undefined
  numberOfPets: number
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (prevState, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...prevState, { ...payload, id: Math.random().toString() }]

        case 'edit':
          return prevState.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData }
            }
            return pet
          })

        case 'delete':
          return prevState.filter((pet) => pet.id !== payload)

        default:
          return prevState
      }
    },
  )
  const [selectedPetId, setSelectedPetId] = useState<PetIdType | null>(null)

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  // event handlers / actions
  const handleAddPet = async (newPet: OmitPetType) => {
    setOptimisticPets({ action: 'add', payload: newPet })
    const error = await addPet(newPet)
    if (error) {
      toast.warning(error.message)
      return
    }
  }

  const handleEditPet = async (petId: PetIdType, newPetData: OmitPetType) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, newPetData } })

    console.log('Formdata :', newPetData)

    const error = await editPet(petId, newPetData)
    if (error) {
      toast.warning(error.message)
      return
    }
  }

  const handleCheckoutPet = async (petId: PetIdType) => {
    setOptimisticPets({ action: 'delete', payload: petId })
    const error = await checkoutPet(petId)
    if (error) {
      toast.warning(error.message)
      return
    }
    setSelectedPetId(null)
  }

  const handleChangeSelectedPetId = (id: PetIdType) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}

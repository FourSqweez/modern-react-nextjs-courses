'use client'
import { addPet } from '@/actions/actions'
import { Pet } from '@/lib/types'
import React, { createContext, useState } from 'react'

type PetContextProviderProps = {
  children: React.ReactNode
  data: Pet[]
}

type TPetContext = {
  pets: Pet[]
  selectedPetId: string | null
  handleChangeSelectedPetId: (id: string) => void
  handleCheckoutPet: (id: string) => void
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void
  handleEditPet: (petId: string, newPetData: Omit<Pet, 'id'>) => void
  selectedPet: Pet | undefined
  numberOfPets: number
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  // event handlers / actions
  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id))
    setSelectedPetId(null)
  }

  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    // setPets((prev) => [
    //   ...prev,
    //   {
    //     ...newPet,
    //     id: Date.now().toString(),
    //   },
    // ])

    await addPet(newPet)
  }

  const handleEditPet = (petId: string, newPetData: Omit<Pet, 'id'>) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          return {
            id: petId,
            ...newPetData,
          }
        }
        return pet
      }),
    )
  }
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets,
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

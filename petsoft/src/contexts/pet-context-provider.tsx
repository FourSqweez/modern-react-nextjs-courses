'use client'
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
  selectedPet: Pet | undefined
  numberOfPets: number
}

export const PetContext = createContext<TPetContext | null>(null)

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  // event handlers / actions
  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id))
    setSelectedPetId(null)
  }
  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    setPets((prev) => [
      ...prev,
      {
        ...newPet,
        id: Date.now().toString(),
      },
    ])
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
      }}
    >
      {children}
    </PetContext.Provider>
  )
}

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

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id)
  }

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = pets.length

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numberOfPets,
      }}>
      {children}
    </PetContext.Provider>
  )
}

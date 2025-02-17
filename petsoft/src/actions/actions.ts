'use server'

import { prisma } from '@/lib/prisma'
import { OmitPetType, PetIdType } from '@/lib/types'
import { sleep } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function addPet(pet: OmitPetType) {
  await sleep(1000)
  try {
    await prisma.pet.create({
      data: pet,
    })
  } catch (error) {
    return {
      message: 'Could not add pet.',
    }
  }

  revalidatePath('/app', 'layout')
}

export async function editPet(petId: PetIdType, newPetData: OmitPetType) {
  await sleep(1000)
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    })
  } catch (error) {
    return {
      message: 'Could not edit pet.',
    }
  }
  revalidatePath('/app', 'layout')
}

export async function checkoutPet(petId: PetIdType) {
  await sleep(1000)

  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    })
  } catch (error) {
    return {
      message: 'Could not delete pet.',
    }
  }
  revalidatePath('/app', 'layout')
}

'use server'

import { signIn, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sleep } from '@/lib/utils'
import { petFormSchema, petIdSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

// --- user actions ---

export async function login(formData: FormData) {
  const authData = Object.fromEntries(formData.entries())
  await signIn('credentials', authData)
}

export async function logOut() {
  await signOut({ redirectTo: '/' })
}

// --- pet actions ---
export async function addPet(pet: unknown) {
  await sleep(1000)

  const validatedPet = petFormSchema.safeParse(pet)

  if (!validatedPet.success) {
    return {
      message: 'invalid pet data.',
    }
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    })
  } catch (error) {
    return {
      message: 'Could not add pet.',
    }
  }

  revalidatePath('/app', 'layout')
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000)

  const validatedPetId = petIdSchema.safeParse(petId)
  const validatedPet = petFormSchema.safeParse(newPetData)

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'invalid pet data.',
    }
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    })
  } catch (error) {
    return {
      message: 'Could not edit pet.',
    }
  }
  revalidatePath('/app', 'layout')
}

export async function checkoutPet(petId: unknown) {
  await sleep(1000)

  const validatedPetId = petIdSchema.safeParse(petId)

  if (!validatedPetId.success) {
    return {
      message: 'invalid pet data.',
    }
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    })
  } catch (error) {
    return {
      message: 'Could not delete pet.',
    }
  }
  revalidatePath('/app', 'layout')
}

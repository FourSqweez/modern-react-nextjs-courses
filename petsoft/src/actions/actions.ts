'use server'

import { signIn, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { checkAuth } from '@/lib/server-utils'
import { sleep } from '@/lib/utils'
import { petFormSchema, petIdSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

// --- user actions ---

export async function login(formData: FormData) {
  await signIn('credentials', formData)
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get('password') as string,
    10,
  )
  await prisma.user.create({
    data: {
      email: formData.get('email') as string,
      hashedPassword,
    },
  })

  await signIn('credentials', formData)
}

export async function logOut() {
  await signOut({ redirectTo: '/' })
}

// --- pet actions ---
export async function addPet(pet: unknown) {
  await sleep(1000)
  const session = await checkAuth()

  const validatedPet = petFormSchema.safeParse(pet)

  if (!validatedPet.success) {
    return {
      message: 'invalid pet data.',
    }
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  // authentication check
  const session = await checkAuth()

  // validation
  const validatedPetId = petIdSchema.safeParse(petId)
  const validatedPet = petFormSchema.safeParse(newPetData)

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'invalid pet data.',
    }
  }

  // authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  })

  if (!pet) {
    return {
      message: 'Pet not found',
    }
  }

  if (pet.userId !== session.user.id) {
    return {
      message: 'Not authorized.',
    }
  }

  // database mutation
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

  // authentication check
  const session = await checkAuth()

  // validation
  const validatedPetId = petIdSchema.safeParse(petId)
  if (!validatedPetId.success) {
    return {
      message: 'invalid pet data.',
    }
  }

  // authorization check (user own pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  })

  if (!pet) {
    return {
      message: 'Pet not found',
    }
  }
  if (pet.userId !== session.user.id) {
    return {
      message: 'Not authorized.',
    }
  }

  // database mutation
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

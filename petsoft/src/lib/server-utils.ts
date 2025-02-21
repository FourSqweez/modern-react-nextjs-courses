import 'server-only'

import { redirect } from 'next/navigation'
import { auth } from './auth'
import { prisma } from './prisma'
import { PetIdType, UserEmailType, UserIdType } from './types'

export async function checkAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  return session
}

export async function getUserByEmail(email: UserEmailType) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

export async function getPetById(petId: PetIdType) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  })

  return pet
}

export async function getPetsByUserId(userId: UserIdType) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  })

  return pets
}

'use server'

import { prisma } from '@/lib/prisma'

export async function addPet(pet) {
  await prisma.pet.create({
    data: pet,
  })
}

'use server'

import { IMG_BASE_URL } from '@/lib/constant'
import { prisma } from '@/lib/prisma'

export async function addPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get('name'),
      ownerName: formData.get('ownerName'),
      age: parseInt(formData.get('age')),
      imageUrl:
        formData.get('imageUrl') || `${IMG_BASE_URL}/pet-placeholder.png`,
      notes: formData.get('notes'),
    },
  })
}

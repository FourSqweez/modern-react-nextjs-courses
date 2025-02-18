'use server'

import { IMG_BASE_URL } from '@/lib/constant'
import { prisma } from '@/lib/prisma'
import { sleep } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function addPet(formData) {
  await sleep(2000)
  try {
    await prisma.pet.create({
      data: {
        name: formData.get('name'),
        ownerName: formData.get('ownerName'),
        // age: parseInt(formData.get('age')),
        imageUrl:
          formData.get('imageUrl') || `${IMG_BASE_URL}/pet-placeholder.png`,
        notes: formData.get('notes'),
      },
    })
  } catch (error) {
    return {
      message: 'Could not add pet.',
    }
  }

  revalidatePath('/app', 'layout')
}

import { Pet, User } from '@prisma/client'

export type PetType = Pet

export type OmitPetType = Omit<Pet, 'id' | 'updatedAt' | 'createdAt'>

export type PetIdType = Pet['id']

export type UserIdType = User['id']

export type UserEmailType = User['email']

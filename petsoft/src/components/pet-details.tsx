'use client'

import { usePetContext } from '@/lib/hooks'
import { PetType } from '@/lib/types'
import Image from 'next/image'
import { startTransition } from 'react'
import PetButton from './pet-button'

export default function PetDetails() {
  const { selectedPet } = usePetContext()

  return (
    <section className="flex h-full w-full flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />

          <OtherInfo pet={selectedPet} />

          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  )
}

function EmptyView() {
  return (
    <p className="flex h-full items-center justify-center text-2xl font-medium">
      No pet selected
    </p>
  )
}

type Props = {
  pet: PetType
}

function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext()

  return (
    <div className="flex items-center border-b border-light bg-white px-8 py-5">
      <Image
        src={pet.imageUrl}
        alt="Selected pet image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />

      <h2 className="ml-5 text-3xl font-semibold leading-7">{pet.name}</h2>

      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={() =>
            startTransition(async () => await handleCheckoutPet(pet.id))
          }
        >
          Checkout
        </PetButton>
      </div>
    </div>
  )
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around px-5 py-10 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  )
}

function Notes({ pet }: Props) {
  return (
    <section className="mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5">
      {pet.notes}
    </section>
  )
}

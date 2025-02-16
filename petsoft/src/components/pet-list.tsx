import { Pet } from '@/lib/types'
import Image from 'next/image'

type PetListProps = {
  pets: Pet[]
}
export default async function PetList({ pets }: PetListProps) {
  return (
    <ul className=" bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className=" flex h-[70px] items-center w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] transition">
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="rounded-full object-cover w-[45px] h-[45px]"
            />
            <p className=" font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

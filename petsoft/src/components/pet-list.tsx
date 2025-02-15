import { IMG_BASE_URL } from '@/lib/constant'
import Image from 'next/image'

export default function PetList() {
  return (
    <ul className=" bg-white border-b border-black/[0.08]">
      <li>
        <button className=" flex h-[70px] items-center w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] transition">
          <Image
            src={`${IMG_BASE_URL}/pet-placeholder.png`}
            alt="Pet image"
            width={45}
            height={45}
            className=" rounded-full object-cover"
          />
          <p className=" font-semibold">Benjamin</p>
        </button>
      </li>
    </ul>
  )
}

import SkeletonCard from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-20 px-[20px] py-24">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      {Array.from({ length: 6 }).map((item, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

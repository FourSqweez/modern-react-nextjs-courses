import Branding from '@/components/branding'
import ContentBlock from '@/components/content-block'
import PetButton from '@/components/pet-button'
import PetDetails from '@/components/pet-details'
import PetList from '@/components/pet-list'
import SearchForm from '@/components/search-form'
import Stats from '@/components/stats'

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />

        <Stats />
      </div>

      <div className="flex flex-col gap-4 md:h-[600px] md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <div className="h-[45px]">
            <SearchForm />
          </div>
          <div className="relative h-[300px] md:flex-1">
            <ContentBlock>
              <PetList />

              <div className="absolute bottom-4 right-4">
                <PetButton actionType="add" />
              </div>
            </ContentBlock>
          </div>
        </div>

        <div className="h-[500px] md:h-auto md:flex-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  )
}

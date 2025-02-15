import Branding from '@/components/branding'
import ContentBlock from '@/components/content-block'
import PetDetails from '@/components/pet-details'
import PetList from '@/components/pet-list'
import SearchForm from '@/components/search-form'
import Stats from '@/components/stats'

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />

        <Stats />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:h-[600px]">
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="h-[45px]">
            <SearchForm />
          </div>
          <div className="md:flex-1 h-[300px]">
            <ContentBlock>
              <PetList />
            </ContentBlock>
          </div>
        </div>

        <div className="h-[500px] md:flex-1 md:h-auto">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  )
}

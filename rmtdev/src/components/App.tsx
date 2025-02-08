import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDebounce, useJobItems } from '../lib/hooks';
import Background from './Background';
import BookmarksButton from './BookmarksButton';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import JobItemContent from './JobItemContent';
import JobList from './JobList';
import Logo from './Logo';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SearchForm from './SearchForm';
import Sidebar, { SidebarTop } from './Sidebar';
import SortingControls from './SortingControls';

function App() {
  // state
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 400);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const jobItemsSliced = jobItems?.slice(0, 7) || [];

  // event handlers / actions
  const handleChangePage = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;

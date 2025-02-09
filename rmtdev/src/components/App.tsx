import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RESULTS_PER_PAGE } from '../lib/constants';
import { useDebounce, useJobItems } from '../lib/hooks';
import { type PageDirection, type SortBy } from '../lib/types';
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
  const [sortBy, setSortBy] = useState<SortBy>('relevant');

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // event handlers / actions
  const handleChangePage = (direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
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
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
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

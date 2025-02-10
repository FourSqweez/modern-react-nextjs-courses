import { Toaster } from 'react-hot-toast';
import Background from './Background';
import BookmarksButton from './BookmarksButton';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import JobItemContent from './JobItemContent';
import JobListSearchWrapper from './JobListSearchWrapper';
import Logo from './Logo';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SearchForm from './SearchForm';
import Sidebar, { SidebarTop } from './Sidebar';
import SortingControls from './SortingControls';

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobListSearchWrapper />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;

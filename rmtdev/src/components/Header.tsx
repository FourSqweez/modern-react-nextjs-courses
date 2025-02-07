import BookmarksButton from './BookmarksButton';
import Logo from './Logo';
import SearchForm from './SearchForm';

interface HeaderProps {
  setSearchText: (text: string) => void;
  searchText: string;
}

export default function Header({ setSearchText, searchText }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>

      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </header>
  );
}

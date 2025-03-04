import { createContext, ReactNode, useState } from 'react';
import { useDebounce } from '../lib/hooks';

type SearchTextContextProviderProps = {
  children: ReactNode;
};

type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 400);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}

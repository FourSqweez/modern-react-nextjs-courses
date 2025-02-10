import { createContext, ReactNode, useState } from 'react';
import { RESULTS_PER_PAGE } from '../lib/constants';
import { useSearchQuery, useSearchTextContext } from '../lib/hooks';
import { JobItem, PageDirection, SortBy } from '../lib/types';

type JobItemsContextProviderProps = {
  children: ReactNode;
};

type TJobItemsContext = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  jobItemsSortedAndSliced: JobItem[];
  sortBy: SortBy;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
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
    <JobItemsContext.Provider
      value={{
        jobItems,
        isLoading,
        jobItemsSortedAndSliced,
        currentPage,
        sortBy,
        totalNumberOfPages,
        totalNumberOfResults,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}

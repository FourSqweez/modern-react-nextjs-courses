import { useJobItemsContext } from '../lib/hooks';
import JobList from './JobList';

export default function JobListSearchWrapper() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}

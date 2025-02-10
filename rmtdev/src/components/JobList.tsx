import { useActiveIdContext, useJobItemsContext } from '../lib/hooks';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

export function JobList() {
  const { activeId } = useActiveIdContext();
  const { jobItemsSortedAndSliced: jobItems, isLoading } = useJobItemsContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;

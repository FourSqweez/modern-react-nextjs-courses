import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
type PaginationControlsProps = {
  onClick: (direction: 'next' | 'previous') => void;
  previousPage: number;
  nextPage: number;
};
export default function PaginationControls({
  onClick,
  previousPage,
  nextPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <button
        onClick={() => onClick('previous')}
        className="pagination__button"
      >
        <ArrowLeftIcon /> Page {previousPage}
      </button>
      <button onClick={() => onClick('next')} className="pagination__button">
        Page {nextPage} <ArrowRightIcon />
      </button>
    </section>
  );
}

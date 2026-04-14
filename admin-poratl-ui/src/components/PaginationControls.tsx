type PageableInfo = {
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type PaginationControlsProps = {
  pageInfo: PageableInfo;
  onPageChange: (page: number) => void;
};

export function PaginationControls({ pageInfo, onPageChange }: PaginationControlsProps) {
  const pages = buildVisiblePages(pageInfo.currentPage, pageInfo.totalPages);
  const start = pageInfo.total === 0 ? 0 : pageInfo.offset + 1;
  const end = Math.min(pageInfo.total, pageInfo.offset + pageInfo.limit);

  return (
    <div className="pagination-bar">
      <p className="subtle-copy">
        Showing {start}-{end} of {pageInfo.total}
      </p>
      <div className="pagination-actions">
        <button className="ghost-button" disabled={!pageInfo.hasPrevious} onClick={() => onPageChange(0)} type="button">
          First
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasPrevious}
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
          type="button"
        >
          Previous
        </button>

        <div className="pagination-pages">
          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <span className="pagination-ellipsis" key={`ellipsis-${index}`}>
                ...
              </span>
            ) : (
              <button
                className={`pagination-page-button ${page === pageInfo.currentPage ? 'active' : ''}`}
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page + 1}
              </button>
            )
          )}
        </div>

        <button className="ghost-button" disabled={!pageInfo.hasNext} onClick={() => onPageChange(pageInfo.currentPage + 1)} type="button">
          Next
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasNext || pageInfo.totalPages === 0}
          onClick={() => onPageChange(Math.max(pageInfo.totalPages - 1, 0))}
          type="button"
        >
          Last
        </button>
      </div>
    </div>
  );
}

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = new Set<number>([0, 1, currentPage - 1, currentPage, currentPage + 1, totalPages - 2, totalPages - 1]);
  const sorted = Array.from(pages).filter((page) => page >= 0 && page < totalPages).sort((a, b) => a - b);
  const visible: Array<number | 'ellipsis'> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];

    if (index > 0 && previous !== undefined && page - previous > 1) {
      visible.push('ellipsis');
    }

    visible.push(page);
  }

  return visible;
}

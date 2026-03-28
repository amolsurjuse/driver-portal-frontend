export function Skeleton({ width, height, rounded }: { width?: string; height?: string; rounded?: boolean }) {
  return (
    <div
      className={`skeleton ${rounded ? 'skeleton-rounded' : ''}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="table-skeleton">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="table-skeleton-row">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div key={colIdx} className="table-skeleton-cell">
              <Skeleton height="1rem" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

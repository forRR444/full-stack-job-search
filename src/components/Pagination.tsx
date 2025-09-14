"use client";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (next: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-base select-none">
      <button
        className="disabled:opacity-30"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        ◀
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? "font-bold" : ""}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        className="disabled:opacity-30"
        disabled={page === pageCount}
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
      >
        ▶
      </button>
    </div>
  );
}

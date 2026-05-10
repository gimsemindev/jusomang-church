'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // 한 번에 보이는 페이지 번호 계산 (5개씩)
  const window = 2;
  const start = Math.max(1, currentPage - window);
  const end = Math.min(totalPages, currentPage + window);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const btn = 'px-3 py-2 rounded-md text-sm';

  return (
    <nav className="flex items-center justify-center gap-1 mt-10" aria-label="페이지 이동">
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${btn} ${currentPage <= 1 ? 'text-primary-300' : 'text-primary-700 hover:bg-primary-50'}`}
      >
        ‹ 이전
      </button>

      {start > 1 && (
        <>
          <button onClick={() => goTo(1)} className={`${btn} text-primary-700 hover:bg-primary-50`}>
            1
          </button>
          {start > 2 && <span className="px-1 text-primary-400">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          className={`${btn} ${p === currentPage ? 'bg-primary-900 text-white' : 'text-primary-700 hover:bg-primary-50'}`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-primary-400">…</span>}
          <button onClick={() => goTo(totalPages)} className={`${btn} text-primary-700 hover:bg-primary-50`}>
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${btn} ${currentPage >= totalPages ? 'text-primary-300' : 'text-primary-700 hover:bg-primary-50'}`}
      >
        다음 ›
      </button>
    </nav>
  );
}

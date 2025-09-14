// src/app/search-client.tsx（クライアントコンポーネント）
"use client";

import { useMemo, useState, useEffect } from "react";
import type { Category, Job } from "@/types/job";
import { salarySteps, categories as CATEGORIES } from "@/types/jobs";

export default function ClientSearch({ jobs }: { jobs: Job[] }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [minSalary, setMinSalary] = useState<number>(300);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const toggleCategory = (c: Category) =>
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const filtered = useMemo(() => {
    const byCat = selectedCategories.length
      ? jobs.filter((j) => selectedCategories.includes(j.category))
      : jobs;
    return byCat.filter((j) => j.salary >= minSalary);
  }, [jobs, selectedCategories, minSalary]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => setPage(1), [selectedCategories, minSalary]);

  return (
    <div className="flex w-full">
      {/* サイドバー */}
      <aside className="w-64 shrink-0 bg-gray-200 p-4 pt-6">
        <p className="mb-2 text-sm font-semibold text-slate-700">
          求人カテゴリ
        </p>
        <ul className="space-y-2">
          {CATEGORIES.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <input
                id={`cat-${c}`}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={selectedCategories.includes(c)}
                onChange={() => toggleCategory(c)}
              />
              <label htmlFor={`cat-${c}`} className="text-sm">
                {c}
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-slate-700">年収</p>
          <select
            className="w-full rounded-md border border-slate-300 bg-white p-2 text-sm"
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
          >
            {salarySteps.map((v) => (
              <option key={v} value={v}>
                {v === 1000 ? "1000万円以上" : `${v}万円以上`}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* 一覧 */}
      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-semibold">求人一覧</h2>
          <p className="mt-1 text-xs md:text-sm text-slate-500">
            該当件数: {filtered.length}件
          </p>
        </div>

        <section className="grid gap-4">
          {paged.map((job) => (
            <article
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-base md:text-lg font-semibold">
                {job.title}
              </h3>
              <div className="mt-2 text-sm text-slate-500">
                <p>カテゴリ：{job.category}</p>
                <p>年収：{job.salary}万円</p>
              </div>
            </article>
          ))}
          {jobs.length === 0 && (
            <p className="text-sm text-slate-500">
              まだ求人が登録されていません。
            </p>
          )}
        </section>

        {/* ページネーション */}
        <div className="mt-6 flex items-center justify-center gap-3 text-base select-none">
          <button
            className="disabled:opacity-30"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ◀
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={p === page ? "font-bold" : ""}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}
          <button
            className="disabled:opacity-30"
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            ▶
          </button>
        </div>
      </main>
    </div>
  );
}

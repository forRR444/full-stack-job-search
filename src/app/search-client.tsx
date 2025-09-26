//クライアントコンポーネント
"use client";

import { useMemo, useState, useEffect } from "react";
import type { Category, Job } from "@/types/job";
import { salarySteps, categories as CATEGORIES } from "@/types/jobs";
import { CategoryChips } from "@/components/CategoryChips";
import { SalarySelect } from "@/components/SalarySelect";
import { Pagination } from "@/components/Pagination";
import { JobList } from "@/components/JobList";

export default function ClientSearch({ jobs }: { jobs: Job[] }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [minSalary, setMinSalary] = useState<number>(300);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  //職種の選択・解除
  const toggleCategory = (c: Category) =>
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  //絞り込み
  const filtered = useMemo(() => {
    const byCat = selectedCategories.length
      ? jobs.filter((j) => selectedCategories.includes(j.category))
      : jobs;
    return byCat.filter((j) => j.salary >= minSalary);
  }, [jobs, selectedCategories, minSalary]);
  //ページング
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => setPage(1), [selectedCategories, minSalary]); //絞り込み条件が変わったら1ページ目へ

  return (
    <div className="flex w-full">
      {/* サイドバー */}
      <aside className="w-64 shrink-0 bg-gray-200 p-4 pt-6">
        <p className="mb-2 text-sm font-semibold text-slate-700">
          求人カテゴリ
        </p>
        {/* カテゴリフィルター */}
        <CategoryChips
          all={CATEGORIES}
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
        {/* 年収フィルター*/}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-slate-700">年収</p>
          <SalarySelect
            options={salarySteps}
            value={minSalary}
            onChange={setMinSalary}
          />
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

        {/* 求人リスト表示 */}
        <JobList jobs={paged} />

        {/* ページネーション */}
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </main>
    </div>
  );
}

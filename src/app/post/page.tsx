"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/types/jobs";
import type { Category } from "@/types/job";

export default function PostPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"" | Category>("");
  const [salary, setSalary] = useState<string>("");
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const salaryNum = Number(salary);
    if (!Number.isFinite(salaryNum) || salaryNum < 1) {
      alert("年収は1以上の整数で入力してください");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          salary: salaryNum,
        }),
      });

      if (res.ok) {
        alert("投稿が完了しました");
        router.push("/");
      } else {
        let msg = "投稿に失敗しました";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {}
        alert(msg);
      }
    } catch (err) {
      alert("ネットワークエラーが発生しました");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900">求人投稿</h2>

      <form onSubmit={onSubmit} className="mt-6 max-w-2xl">
        <label className="block max-w-md" htmlFor="category">
          <span className="text-sm font-semibold text-slate-800">
            求人カテゴリ選択
          </span>
          <select
            id="category"
            className="mt-2 block w-full border border-slate-300 bg-white px-4 h-11 text-[15px] rounded-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "")}
            required
          >
            <option value="" disabled>
              カテゴリを選択 ▼
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-6 block max-w-md" htmlFor="salary">
          <span className="text-sm font-semibold text-slate-800">
            年収（万円）
          </span>
          <input
            id="salary"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            className="mt-2 block w-full border border-slate-300 bg-white px-4 h-11 text-[15px] rounded-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </label>

        <label className="mt-6 block" htmlFor="title">
          <span className="text-sm font-semibold text-slate-800">
            求人タイトル
          </span>
          <input
            id="title"
            className="mt-2 block w-full border border-slate-300 bg-white px-4 h-11 text-[15px] rounded-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <div className="mt-8">
          <button
            type="submit"
            disabled={pending}
            className="inline-block bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white px-12 py-3 rounded-md shadow-sm"
          >
            {pending ? "投稿中..." : "投稿"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ← useNavigate の代わり
import { categories } from "@/types/jobs"; // パスは環境に合わせて
import type { Category } from "@/types/job";

export default function PostPage() {
  const router = useRouter();

  const [category, setCategory] = useState<"" | Category>("");
  const [salary, setSalary] = useState<string>("");
  const [title, setTitle] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        category,
        salary: Number(salary),
      }),
    });

    if (res.ok) {
      router.push("/"); // 投稿後にホームへ戻る
    } else {
      alert("投稿に失敗しました");
    }
    // 送信後は一覧（ホーム）へ
    alert("投稿が完了しました");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900">求人投稿</h2>

      <form onSubmit={onSubmit} className="mt-6 max-w-2xl">
        <label className="block max-w-md">
          <span className="text-sm font-semibold text-slate-800">
            求人カテゴリ選択
          </span>
          <select
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

        <label className="mt-6 block max-w-md">
          <span className="text-sm font-semibold text-slate-800">
            年収（万円）
          </span>
          <input
            type="number"
            inputMode="numeric"
            className="mt-2 block w-full border border-slate-300 bg-white px-4 h-11 text-[15px] rounded-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </label>

        <label className="mt-6 block ">
          <span className="text-sm font-semibold text-slate-800">
            求人タイトル
          </span>
          <input
            className="mt-2 block w-full border border-slate-300 bg-white px-4 h-11 text-[15px] rounded-none focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <div className="mt-8">
          <button
            type="submit"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-12 py-3 rounded-md shadow-sm"
          >
            投稿
          </button>
        </div>
      </form>
    </div>
  );
}

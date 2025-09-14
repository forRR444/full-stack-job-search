"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold">求人検索アプリ</div>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="hover:underline aria-[current=page]:font-semibold"
          >
            求人検索
          </Link>
          <Link
            href="/post"
            className="hover:underline aria-[current=page]:font-semibold"
          >
            求人投稿
          </Link>
        </nav>
      </div>
    </header>
  );
}

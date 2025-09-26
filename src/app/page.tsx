// サーバーコンポーネント：SSR
import type { Category, Job } from "@/types/job";
import ClientSearch from "./search-client"; // クライアント用の子

export const dynamic = "force-dynamic"; // 毎回SSR

export default async function Page() {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job?select=*`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY as string}`,
    },
    cache: "no-store", // 常に最新をSSR
  });

  if (!res.ok) {
    // 簡易エラーハンドリング（SSRでもHTML返る）
    return <div className="p-6">読み込みに失敗しました。</div>;
  }

  type ApiJob = {
    id: string;
    title: string;
    category: Category;
    salary: number | string;
  };

  const raw = (await res.json()) as ApiJob[];

  const jobs: Job[] = raw.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    salary: Number(d.salary),
  }));

  // ここで初期HTMLを生成し、jobs を子へ渡す
  return <ClientSearch jobs={jobs} />;
}

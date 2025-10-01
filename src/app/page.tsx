// サーバーコンポーネント：SSR
import type { Category, Job } from "@/types/job";
import ClientSearch from "./search-client"; // クライアント用の子
import { prisma } from "@/prisma";

export const dynamic = "force-dynamic"; // 毎回SSR
export const runtime = "nodejs";

export default async function Page() {
  // Prisma 経由で Supabase(Postgres) に直接アクセス
  const jobs = await prisma.job.findMany({
    orderBy: { created_at: "desc" },
  });

  // jobs を子へ渡して描画
  return <ClientSearch jobs={jobs as unknown as Job[]} />;
}

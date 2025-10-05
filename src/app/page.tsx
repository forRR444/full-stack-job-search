import ClientSearch from "./search-client";
import { listJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage() {
  // DBから求人データを取得
  // 最大1000件取得
  const jobs = await listJobs({ limit: 1000, offset: 0 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ClientSearch jobs={jobs} />
    </div>
  );
}

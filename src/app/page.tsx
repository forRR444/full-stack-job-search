import { listJobs } from "@/lib/jobs";
import type { Job } from "@/types/job";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage({
  // ★ searchParams は Promise として受け取る
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  // ★ まず await してから使う
  const sp = await searchParams;
  const page = Number(sp.page ?? "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  const jobs: Job[] = await listJobs({ q: sp.q, limit, offset });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-4">求人一覧</h1>
      <ul className="space-y-3">
        {jobs.map((j) => (
          <li key={j.id} className="rounded border p-4">
            <div className="font-semibold">{j.title}</div>
            <div className="text-sm text-gray-600">
              {j.category} / 年収: {j.salary}万円
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

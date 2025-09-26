import type { Job } from "@/types/job";
//求人一覧コンポーネント
export function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0)
    return <p className="text-sm text-slate-500">該当する求人がありません。</p>;
  return (
    <section className="grid gap-4">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h3 className="text-base md:text-lg font-semibold">{job.title}</h3>
          <div className="mt-2 text-sm text-slate-500">
            <p>カテゴリ：{job.category}</p>
            <p>年収：{job.salary}万円</p>
          </div>
        </article>
      ))}
    </section>
  );
}

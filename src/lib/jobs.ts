import "server-only";
import { query } from "@/lib/db";
import type { Job } from "@/types/job";

//求人一覧を取得
export async function listJobs(opts?: {
  //検索クエリ・ページング情報
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<Job[]> {
  const limit = opts?.limit ?? 20;
  const offset = opts?.offset ?? 0;

  //全件取得
  const { rows } = await query<Job>(
    `SELECT id, title, category, salary
     FROM jobs
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}
//求人を新規登録
export async function createJob(input: {
  title: string;
  category: Job["category"];
  salary: number;
}): Promise<Job> {
  const sql = `
    INSERT INTO jobs (title, category, salary)
    VALUES ($1, $2, $3)
    RETURNING id, title, category, salary
  `;
  const { rows } = await query<Job>(sql, [
    input.title,
    input.category,
    input.salary,
  ]);
  return rows[0]; // 登録した1件を返す
}

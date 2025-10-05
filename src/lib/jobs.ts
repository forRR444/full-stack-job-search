import "server-only";
import { query } from "@/lib/db";
import type { Job } from "@/types/job";

export async function listJobs(opts?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<Job[]> {
  const limit = opts?.limit ?? 20;
  const offset = opts?.offset ?? 0;

  if (opts?.q) {
    const qv = `%${opts.q}%`;
    const sql = `
      SELECT id, title, category, salary
      FROM jobs
      WHERE title ILIKE $1 OR category ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const { rows } = await query<Job>(sql, [qv, limit, offset]);
    return rows;
  }

  const { rows } = await query<Job>(
    `SELECT id, title, category, salary
     FROM jobs
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}

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
  return rows[0];
}

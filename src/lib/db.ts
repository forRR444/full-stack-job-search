import "server-only";
import { Pool } from "pg";
import type { QueryResult, QueryResultRow } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pool__: Pool | undefined;
}

export const pool =
  global.__pool__ ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global.__pool__ = pool;
}

/**
 * 汎用クエリ。pg本体にはジェネリクスを渡さず、
 * 戻り値を QueryResult<T> としてキャストして型安全に扱う。
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const res = await pool.query(text, params);
  return res as QueryResult<T>;
}

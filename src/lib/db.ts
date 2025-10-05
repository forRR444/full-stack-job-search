import "server-only"; // サーバー専用
import { Pool } from "pg";
import type { QueryResult, QueryResultRow } from "pg";

// グローバルスコープに Pool をキャッシュして、
// 開発中のホットリロード時にもコネクションを再作成しないようにする。
declare global {
  // eslint-disable-next-line no-var
  var __pool__: Pool | undefined;
}

export const pool =
  globalThis.__pool__ ??
  new Pool({
    // PostgreSQL の接続設定
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10, // 最大接続数
  });

// 開発中はグローバルスコープにキャッシュ
if (process.env.NODE_ENV !== "production") {
  globalThis.__pool__ = pool;
}

// SQLクエリを実行する関数
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: ReadonlyArray<unknown>
): Promise<QueryResult<T>> {
  // pg の型は params に any[] を要求するので、この行だけ any を許可
  const res = await pool.query<T>(text, params as any[]);
  return res;
}

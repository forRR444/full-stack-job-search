import "server-only"; //サーバー専用
import { Pool } from "pg";
import type { QueryResult, QueryResultRow } from "pg";

// グローバルスコープに Pool をキャッシュして、
// 開発中のホットリロード時にもコネクションを再作成しないようにする。
declare global {
  var __pool__: Pool | undefined;
}

export const pool =
  global.__pool__ ??
  new Pool({
    //PostgreSQLの接続設定
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10, //最大接続数
  });

//開発中はグローバルスコープにキャッシュ
if (process.env.NODE_ENV !== "production") {
  global.__pool__ = pool;
}

//SQLクエリを実行する関数
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  //SQLクエリを実行し、結果を返す
  const res = await pool.query(text, params);
  return res as QueryResult<T>;
}

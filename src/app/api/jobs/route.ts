import { NextResponse } from "next/server";
import { listJobs, createJob } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

//GETメソッド:求人一覧を取得
export async function GET(request: Request) {
  // URLから検索クエリ・ページング情報を取得
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined; //検索
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");

  //DBから求人データを取得
  const jobs = await listJobs({ q, limit, offset });
  //JSON形式でレスポンスを返す
  return NextResponse.json(jobs);
}
//POSTメソッド:新規を登録
export async function POST(request: Request) {
  const body = await request.json(); //リクエストをJSONとしてパース
  const job = await createJob({
    title: body.title,
    category: body.category,
    salary: Number(body.salary),
  });
  //登録した求人データをJSON形式でレスポンスを返す
  return NextResponse.json(job, { status: 201 });
}

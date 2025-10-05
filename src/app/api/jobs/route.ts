import { NextResponse } from "next/server";
import { listJobs, createJob } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");
  const jobs = await listJobs({ q, limit, offset });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const job = await createJob({
    title: body.title,
    category: body.category, // "エンジニア" 等
    salary: Number(body.salary),
  });
  return NextResponse.json(job, { status: 201 });
}

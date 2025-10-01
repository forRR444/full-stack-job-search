import { prisma } from "@/prisma";
export const runtime = "nodejs";

// BigInt を文字列に変換して JSON 化
function serialize<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  ) as T;
}

// 一覧取得(最新順に一覧を取得して返す)
export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { created_at: "desc" },
  });
  return Response.json(serialize(jobs));
}

// 新規投稿
export async function POST(req: Request) {
  const body = await req.json();

  const created = await prisma.job.create({
    data: {
      title: body.title,
      category: body.category,
      salary: String(body.salary),
    },
  });

  return Response.json(serialize(created));
}

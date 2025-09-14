// src/app/api/jobs/route.ts
export async function GET() {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job?select=*`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
// src/app/api/jobs/route.ts
export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=representation", // 追加後の行を返す
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}

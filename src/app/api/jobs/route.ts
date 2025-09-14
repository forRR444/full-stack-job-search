// --- 一覧取得 ---
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

// --- 新規投稿 ---
export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Supabase insert error:", data); // ← エラー内容を出力
    return new Response(JSON.stringify(data), { status: 500 });
  }

  return Response.json(data);
}

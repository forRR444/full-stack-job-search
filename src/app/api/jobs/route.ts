//一覧取得
export async function GET() {
  //Supabase REST API を呼び出しjob テーブルの全行を取得
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job?select=*`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
    },
  });
  //帰ってきたJSONをそのままAPIのレスポンス
  const data = await res.json();
  return Response.json(data);
}

//新規投稿
export async function POST(req: Request) {
  //クライアントから送られたリクエストを受け取る
  const body = await req.json();
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/job`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=representation", //追加後のレコードを返す
    },
    body: JSON.stringify(body),
  });

  //SupabaseのレスポンスをJSON化
  const data = await res.json();

  if (!res.ok) {
    console.error("Supabase insert error:", data); //失敗
    return new Response(JSON.stringify(data), { status: 500 });
  }

  return Response.json(data); //成功
}

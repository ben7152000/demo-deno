// main.ts
const MODEL = "gemini-2.5-flash"; // 快速通用型

// CORS 头部
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// 处理 CORS 预检请求
function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return null;
}

// 健康检查端点
function handleHealthCheck(): Response {
  return new Response(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }), {
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

// 聊天端点
async function handleChat(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const apiKey = url.searchParams.get("key");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "请提供 API Key 参数" }),
        {
          status: 400,
          headers: { ...corsHeaders, "content-type": "application/json" },
        }
      );
    }

    const { input } = await req.json().catch(() => ({ input: "" }));

    if (!input || typeof input !== "string") {
      return new Response(
        JSON.stringify({ error: "请提供有效的 input 参数" }),
        {
          status: 400,
          headers: { ...corsHeaders, "content-type": "application/json" },
        }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: input }] }],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API 错误:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Gemini API 请求失败" }),
        {
          status: response.status,
          headers: { ...corsHeaders, "content-type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ??
      "";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  } catch (error) {
    console.error("处理聊天请求时出错:", error);
    return new Response(
      JSON.stringify({ error: "服务器内部错误" }),
      {
        status: 500,
        headers: { ...corsHeaders, "content-type": "application/json" },
      }
    );
  }
}

// 主服务器处理函数
Deno.serve(async (req) => {
  const { pathname } = new URL(req.url);

  // 处理 CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // 路由处理
  if (req.method === "GET" && pathname === "/") {
    return handleHealthCheck();
  }

  if (req.method === "GET" && pathname === "/health") {
    return handleHealthCheck();
  }

  if (req.method === "POST" && pathname === "/api/chat") {
    return await handleChat(req);
  }

  // 404 处理
  return new Response(
    JSON.stringify({ error: "接口不存在" }),
    {
      status: 404,
      headers: { ...corsHeaders, "content-type": "application/json" },
    }
  );
});

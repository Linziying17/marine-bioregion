// 根路径改写（2026-10-21 v3 诊断版）：/ 返回垂线主页；带自诊断输出定位 ASSETS 绑定问题
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      try {
        return await env.ASSETS.fetch(new Request(url.origin + "/descent.html", request));
      } catch (e) {
        return new Response(
          "DIAG: ASSETS=" + typeof env.ASSETS + " ERR=" + (e && e.message) + " STACK=" + (e && e.stack ? String(e.stack).slice(0, 300) : ""),
          { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
        );
      }
    }
    return env.ASSETS.fetch(request);
  },
};

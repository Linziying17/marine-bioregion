// 根路径改写（2026-10-21）：访问 / 时返回垂线主页 descent.html；
// 其余路径全部交给静态资源（index.html=档案页、catalog.html=物种库，站内相对链接零改动）。
// 同时为 .html 显式补 charset，防止服务器编码歧义。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(url.origin + "/descent.html", request));
    }
    const resp = await env.ASSETS.fetch(request);
    if (url.pathname.endsWith(".html")) {
      const headers = new Headers(resp.headers);
      headers.set("Content-Type", "text/html; charset=utf-8");
      return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers });
    }
    return resp;
  },
};

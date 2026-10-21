// 根路径改写（2026-10-21 定稿 v2）：访问 / 时返回垂线主页 descent.html。
// 兜底：/descent、/catalog、/index 等无扩展名路径补 .html（兼容旧版 307 重定向链残留）。
// 其余路径全部交给静态资源（index.html=档案页、catalog.html=物种库，站内相对链接零改动）。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(url.origin + "/descent.html", request));
    }
    if (/^\/(descent|catalog|index)$/.test(url.pathname)) {
      return env.ASSETS.fetch(new Request(url.origin + url.pathname + ".html" + url.search, request));
    }
    return env.ASSETS.fetch(request);
  },
};

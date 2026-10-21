// 根路径改写（2026-10-21 定稿）：访问 / 时返回垂线主页 descent.html。
// 其余路径全部交给静态资源（index.html=档案页、catalog.html=物种库，站内相对链接零改动）。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(url.origin + "/descent.html", request));
    }
    return env.ASSETS.fetch(request);
  },
};

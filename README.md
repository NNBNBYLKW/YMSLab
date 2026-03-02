# YMSLab

一个以中文为主的个人站点（Next.js App Router），包含：
- 首页（高级但克制的动效）
- 作品页（主题特效 + 结构化详情）
- 博客（Markdown 驱动，SSG 优先）

## 1. 本地开发

```bash
cd app
npm install
npm run dev
```

生产构建校验：

```bash
cd app
npm run build
```

## 2. 部署（Docker + Caddy）

仓库根目录执行：

```bash
git pull

docker compose up -d --build
```

### 验证服务

```bash
curl -I http://127.0.0.1/
```

预期：返回 `HTTP/1.1 200 OK`（或 301/308 跳转后 200）。

### Caddy 偶发 502（启动空窗）可选改进

默认配置不改动即可运行。如果你在冷启动时偶发 502，可选在 `Caddyfile` 的 `reverse_proxy` 块内启用：

```caddyfile
reverse_proxy web:3000 {
  lb_try_duration 5s
  lb_try_interval 250ms
  health_uri /
  health_interval 10s
  health_timeout 2s
}
```

> 建议仅在确实出现冷启动空窗时启用，保持最小改动原则。

## 3. 博客内容管理（Markdown）

博客内容目录：`app/content/blog/`

新增文章：创建 `*.md` 文件，frontmatter 至少包含：

```md
---
title: 示例标题
date: 2026-03-01
summary: 一句话摘要
tags:
  - tag1
  - tag2
---

正文内容...
```

说明：
- 列表按 `date` 倒序。
- 页面通过 SSG 生成，无需数据库。

## 4. 作品内容管理（TS 数据模型）

作品数据在：`app/data/works.ts`

每个作品至少包含：
- `responsibilities`（职责）
- `stack`（技术栈）
- `links`（项目/源码/演示等链接）
- `images`（图片）
- `videos`（视频，本地或外链）
- `bilibili`（B 站链接）

最小示例：

```ts
{
  slug: "demo-work",
  title: "示例作品",
  year: 2026,
  tags: ["动效", "实验"],
  excerpt: "一句话简介",
  cover: { kicker: "Demo", oneLiner: "封面一句话" },
  summary: "详情页摘要",
  responsibilities: ["视觉设计", "前端实现"],
  stack: ["Next.js", "CSS"],
  links: [{ label: "项目链接", href: "https://example.com" }],
  images: [{ title: "截图", src: "https://picsum.photos/seed/demo/1200/700", alt: "示意图" }],
  videos: [{ title: "演示视频", src: "https://example.com/demo.mp4", type: "external" }],
  bilibili: "https://www.bilibili.com/video/BVxxxx",
  theme: { accent: "#9ea8ff", mood: "motion", effect: "glow" },
  body: ["段落 1", "段落 2"]
}
```

## 5. 主题（日间/夜间）与优先级

主题策略：
1. **用户手动覆盖优先**（日间 / 夜间 / 跟随系统）
2. 若为“跟随系统”，优先读取 `prefers-color-scheme`
3. 若系统不可用，则回退到时间段（白天亮色、夜间暗色）

实现方式：
- `data-theme` + CSS Variables
- `localStorage` 持久化用户选择
- 媒体查询监听 + 定时器校正
- 12s 慢速渐变过渡（`prefers-reduced-motion` 下缩短过渡）

## 6. 安全与性能最小注意点

- 不引入额外动画库，动效以 `transform/opacity/filter` 为主。
- 已启用 `robots` 与 `sitemap`（见 `app/app/robots.ts`、`app/app/sitemap.ts`）。
- 静态资源缓存：Next.js 默认对指纹化静态资源提供长期缓存；如需进一步加强，可在 Caddy 中补充静态资源缓存头（可选）。

# 作品内容维护与发布流程

## 1. 新增作品（像写博客一样）

1. 在 `app/content/works/` 新建一个 Markdown 文件：`<slug>.md`。
2. 写 frontmatter（至少包含 `title`、`date`，推荐补齐 `summary/category/roles/stack/tags/cover/links/media`）。
3. 在正文中写项目背景、过程、复盘等内容，支持常见 Markdown。

### frontmatter 示例

```yaml
---
title: "作品标题"
date: "2025-03-01"
summary: "一句话简介"
category: "开发"
roles: ["前端", "设计"]
stack: ["Next.js", "TypeScript"]
tags: ["作品集", "重构"]
cover:
  src: "/works/my-work/cover.jpg"
  alt: "封面描述"
links:
  - label: "GitHub"
    url: "https://github.com/..."
  - label: "B站"
    url: "https://www.bilibili.com/video/..."
media:
  - type: "image"
    src: "/works/my-work/shot-1.jpg"
    alt: "截图"
    caption: "首屏"
---
```

## 2. 资源管理约定

- 推荐把静态资源放在 `app/public/works/<slug>/...`。
- 在 Markdown 里使用 `/works/<slug>/...` 路径引用 `cover` 与 `media`。
- 视频优先使用 B 站外链（通过 `links` 配置），站内 `video` 仅用于少量直链 mp4。

## 3. 发布流程

1. 本地改完后执行：
   - `cd app && npm run build`
2. 推送代码到仓库。
3. 服务器执行部署：
   - `docker compose up -d --build`

## 4. 主题模式切换

站点导航支持三态主题模式：

- `自动`：按本地时间自动过渡（日出/白天/日落/夜间）。
- `日间`：固定日间主题。
- `夜间`：固定夜间主题。

用户选择会保存到 `localStorage`（key：`ymslab_theme_mode`），刷新后会保持。

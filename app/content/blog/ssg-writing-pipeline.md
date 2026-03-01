---
title: SSG 写作流水线：从草稿到上线
date: 2026-02-28
summary: 用最小成本维护博客：Markdown + frontmatter + 静态构建。
tags:
  - markdown
  - ssg
  - publishing
---

这篇笔记记录一条简单但稳定的流程：

1. 在 `content/blog/` 新建 `.md` 文件。
2. 填写 frontmatter（`title/date/summary/tags`）。
3. 本地预览后提交，构建时自动生成列表与详情页。

## 为什么选这条路径？

- 不依赖数据库，部署更轻。
- 内容可追踪、可审阅，适合团队协作。
- SSG 输出稳定，SEO 与首屏性能更容易控制。

## 一个最小 Frontmatter 示例

```yaml
---
title: 一篇文章
date: 2026-03-01
summary: 这是一段摘要
tags: ["notes", "workflow"]
---
```

流程看起来朴素，但长期维护时非常省心。

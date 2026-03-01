---
title: 内容驱动站点的 Markdown 工作流
date: 2026-02-18
summary: 用 frontmatter + 静态渲染构建一个轻量而稳定的写作系统。
tags:
  - markdown
  - nextjs
  - workflow
---

当页面由内容驱动时，发布流程应尽量简单：

- 写作只关注 `.md` 文件。
- frontmatter 负责标题、日期、摘要、标签。
- 渲染层处理目录、列表和详情页。

## 建议的 frontmatter 约定

| 字段 | 含义 | 是否必填 |
| --- | --- | --- |
| title | 标题 | 是 |
| date | 日期（YYYY-MM-DD） | 是 |
| summary | 列表摘要 | 是 |
| tags | 标签数组 | 是 |

## 一条实用原则

> 元信息尽可能结构化，正文尽可能自由。

这样在做列表筛选、SEO、RSS 或站内搜索时，成本会更低。

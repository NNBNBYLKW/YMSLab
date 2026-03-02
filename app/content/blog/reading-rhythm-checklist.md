---
title: 阅读节奏检查清单（发布前）
date: 2026-03-01
summary: 发布前用 5 分钟检查排版节奏，让文章更易读。
tags:
  - typography
  - checklist
  - writing
---

发布前我会做一轮“阅读节奏检查”：

- 段落是否过长（建议 3–6 行）
- 标题层级是否连续
- 列表与正文是否有清晰留白
- 代码块是否需要补注释
- 关键句是否可在 3 秒内抓到

## 简单示例

```tsx
export function NoteBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

当排版有节奏时，读者会更愿意继续向下读。

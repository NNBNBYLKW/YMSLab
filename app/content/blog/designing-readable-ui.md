---
title: 设计可读性优先的界面
date: 2026-02-10
summary: 在视觉表达和信息传达之间找到平衡：间距、行长、层级与节奏。
tags:
  - design
  - typography
  - ux
---

可读性不是“朴素”的同义词，而是**有节奏的组织**。

## 1. 从行长开始

- 正文建议控制在 60–75 个字符宽度。
- 太短会造成视线频繁跳转，太长会增加回读成本。

> 当用户愿意连续阅读 3 分钟，说明你的排版没有打扰他。

## 2. 建立稳定层级

1. 标题只承担结构，不承担装饰。
2. 小标题与正文要有可感知的节奏差异。
3. 通过留白，而非边框，区分段落关系。

## 3. 代码与正文需要“语义断点”

```tsx
export function ReadableBlock({ children }: { children: React.ReactNode }) {
  return <article className="prose">{children}</article>;
}
```

代码块的核心不是“炫”，而是让用户快速定位关键行。

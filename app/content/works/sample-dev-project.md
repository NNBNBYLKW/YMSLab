---
title: "YMS Dashboard 重构"
date: "2025-02-16"
summary: "把运营后台改造成可扩展的 Next.js App Router 架构，兼顾性能和可维护性。"
category: "开发"
roles:
  - "前端负责人"
  - "架构设计"
  - "性能优化"
stack:
  - "Next.js"
  - "TypeScript"
  - "Node.js"
  - "PostgreSQL"
tags:
  - "后台系统"
  - "性能"
  - "可维护性"
cover:
  src: "/works/sample-dev-project/cover.jpg"
  alt: "YMS Dashboard 页面截图"
links:
  - label: "GitHub"
    url: "https://github.com/NNBNBYLKW/YMSLab"
  - label: "在线演示"
    url: "https://example.com/demo/yms-dashboard"
  - label: "B站"
    url: "https://www.bilibili.com/video/BV1abcd12345"
media:
  - type: "image"
    src: "/works/sample-dev-project/architecture.png"
    alt: "系统架构图"
    caption: "模块拆分后，页面与数据层解耦。"
  - type: "gallery"
    title: "关键界面"
    images:
      - src: "/works/sample-dev-project/ui-1.jpg"
        alt: "概览页"
        caption: "改版后的概览页"
      - src: "/works/sample-dev-project/ui-2.jpg"
        alt: "报表页"
        caption: "报表页支持按时间段快速筛选"
---

## 项目背景

原系统存在路由耦合、数据请求重复、首屏较慢等问题。重构目标是让团队可以持续迭代，同时保持开发体验。

## 我的工作

- 设计 App Router 下的页面分层，按业务域拆分模块。
- 建立共享组件与主题 token，统一交互样式。
- 对关键路径做缓存与渲染策略优化，降低首屏阻塞。

## 成果

- 首屏渲染时间明显下降，交互响应更稳定。
- 新增页面的开发周期缩短，维护成本降低。

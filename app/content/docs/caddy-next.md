---
title: "Caddy + Next.js 部署笔记"
date: "2026-02-28"
summary: "用 Caddy 反代 Next.js 的最小部署记录。"
tags: ["caddy", "nextjs", "deploy"]
---

关键点：

1. 备案前用 **IP** 访问，避免域名链路被拦截。
2. Docker Hub 不通时使用 **ECR Public** 镜像源。

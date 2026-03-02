# YMSLab 一页总览

## 1) 项目是什么 / 解决什么问题
YMSLab 是一个中文优先的个人创作站，当前聚焦三类内容：
- 首页叙事（品牌介绍 + 近期作品 + 博客精选）
- 作品集（可筛选列表 + 单作品详情）
- 博客（Markdown 内容流）

核心目标是：用轻量、可维护的 Next.js 内容站点承载“作品+文章+视觉表达”，并通过时间驱动主题与可降级动效提升观感。

> 代码入口：`app/app/page.tsx`、`app/components/home/HomeClient.tsx`、`app/app/works/page.tsx`、`app/app/blog/page.tsx`

---

## 2) 核心页面与用户路径
### 关键页面
- `/`：首页（近期作品 + 博客精选）
- `/works`：作品列表（标签筛选）
- `/works/[slug]`：作品详情
- `/blog`：博客列表
- `/blog/[slug]`：博客详情
- `/docs`、`/docs/[slug]`：站内文档页（Markdown）

### 用户路径（典型）
1. 访客从首页进入，先看到 Hero 与视觉风格。
2. 通过“近期作品”进入 `/works/[slug]` 查看案例细节。
3. 或通过“博客精选”进入 `/blog/[slug]` 阅读方法论文章。
4. 搜索引擎通过 `sitemap.xml` 与 `robots.txt` 收录页面。

---

## 3) 技术栈与运行模式
- **Next.js（App Router）**：目录位于 `app/app/*`。
- **React**：Server Component + Client Component 混合。
- **TypeScript**：启用，但 `strict: false`（见 `app/tsconfig.json`）。
- **内容系统**：Markdown + `gray-matter` + `remark` 渲染 HTML（`app/lib/blog.ts`、`app/lib/docs.ts`）。
- **部署形态**：Docker 多阶段构建 + Caddy 反代（`app/Dockerfile`、`docker-compose.yml`、`Caddyfile`）。

### 运行模式说明
- 首页、列表页、详情页使用 App Router；动态详情页实现了 `generateStaticParams`，支持静态路径预构建。
- 动态路由参数按“Next 新行为兼容”写法处理（`params: Promise<{slug:string}>` 或 `Promise.resolve(params)`）。

### 为什么这样选
- App Router + 文件路由让页面与数据读取逻辑靠近，便于小团队维护。
- Markdown 流程降低发文门槛，便于长期迭代内容。
- Docker+Caddy 方案轻、稳定，适合单机/小规模云主机部署。

---

## 4) 目录结构导览（关键部分）
```text
YMSLab/
├─ app/
│  ├─ app/                     # Next App Router 页面、全局样式、SEO 入口
│  │  ├─ blog/ works/ docs/    # 列表与动态详情路由
│  │  ├─ layout.tsx            # 根布局+全局导航
│  │  ├─ globals.css           # 全局 tokens + 组件样式 + 动效样式
│  │  ├─ robots.ts sitemap.ts  # SEO 元数据路由
│  ├─ components/
│  │  ├─ home/                 # 首页客户端组件
│  │  ├─ works/                # 作品列表与详情客户端组件
│  │  ├─ motion/               # Reveal/Parallax/Magnetic 等动效组件
│  │  ├─ theme/                # ThemeController
│  │  └─ ui/                   # 基础 UI 容器组件
│  ├─ content/
│  │  ├─ blog/*.md             # 博客 Markdown 内容
│  │  └─ docs/*.md             # 站内 docs Markdown
│  ├─ data/works.ts            # 作品数据（TS 静态数据）
│  ├─ hooks/useReducedMotion.ts
│  ├─ lib/                     # blog/docs/theme/motion/timeTheme 等
│  ├─ Dockerfile               # Next standalone 生产镜像
│  └─ package.json
├─ docker-compose.yml          # web + caddy
├─ Caddyfile                   # 反代与 HTTPS
├─ README.md
└─ docs/                       # 交接文档（本次新增）
```

---

## 5) 关键约束（接手必须遵守）
1. **不新增 npm 外部依赖**（当前交接任务约束）。
2. **部署基线是 Docker + Caddy**，生产流量由 Caddy 反代到 `web:3000`。
3. **主题系统原则**：时间驱动 + CSS Variables 注入，不要绕开 ThemeController 在局部硬编码主题色。
4. **动效系统原则**：默认允许动效，但所有非平凡动效都必须有 `prefers-reduced-motion` 降级策略，优先 `transform/opacity`。
5. **动态路由 params 兼容**：保留 `await params` / `Promise.resolve(params)` 写法，避免 Next 升级后类型不兼容。

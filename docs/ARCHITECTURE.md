# 功能模块详解

## 1) 路由与页面

### 首页 `/`
- 入口：`app/app/page.tsx`
- 主要组件：`app/components/home/HomeClient.tsx`
- 数据流：
  - 服务器端读取 `works` 与 `getAllPosts()`
  - 传入客户端组件做交互（滚动进度、指针光晕、动效降级）
- 可扩展点：
  - 新增首页板块可在 `HomeClient` 按 Reveal/Stagger 模式扩展
  - 建议保持“服务端取数 + 客户端交互”边界

### 博客列表 `/blog` 与详情 `/blog/[slug]`
- 入口：`app/app/blog/page.tsx`、`app/app/blog/[slug]/page.tsx`
- 数据源：`app/lib/blog.ts`（读取 `app/content/blog/*.md`）
- 动态参数兼容：详情页使用 `params: Promise<{slug:string}>` + `await params`
- 可扩展点：
  - 列表分页/标签筛选
  - 详情页 TOC、上一篇下一篇

### 作品列表 `/works` 与详情 `/works/[slug]`
- 入口：`app/app/works/page.tsx`、`app/app/works/[slug]/page.tsx`
- 数据源：`app/data/works.ts`
- 关键客户端：
  - `app/components/works/WorksIndexClient.tsx`（标签过滤）
  - `app/components/works/WorkDetailClient.tsx`（详情渲染）
- 动态参数兼容：`Promise<{slug:string}> | {slug:string}` + `Promise.resolve(params)`

### docs 页面 `/docs` 与 `/docs/[slug]`
- 入口：`app/app/docs/page.tsx`、`app/app/docs/[slug]/page.tsx`
- 数据源：`app/lib/docs.ts` + `app/content/docs/*.md`

---

## 2) 内容系统（博客/作品）

### 博客（Markdown）
- 目录：`app/content/blog/*.md`
- 解析：`app/lib/blog.ts`
  - `getAllPosts()`：读 frontmatter 并返回 meta 列表
  - `getPostBySlug()`：返回 `{ meta, html }`
- frontmatter 约定字段：`title`、`date`、`summary`、`tags`

**新增博客步骤**
1. 在 `app/content/blog` 新建 `your-slug.md`
2. 写 frontmatter 与正文
3. `npm run dev` 验证 `/blog` 与 `/blog/your-slug`

### 作品（TypeScript 静态数据）
- 文件：`app/data/works.ts`
- 类型：`Work`、`WorkImage`、`WorkVideo` 等
- 页面消费：
  - 首页切片：`app/app/page.tsx`
  - 列表：`app/components/works/WorksIndexClient.tsx`
  - 详情：`app/components/works/WorkDetailClient.tsx`

**新增作品步骤**
1. 在 `works` 数组新增对象（必须含 `slug/title/year/tags/theme/body` 等）
2. 确认 `slug` 唯一
3. 本地验证 `/works` 与 `/works/[slug]`

---

## 3) 主题系统

### 组成
- 主题时间计算：`app/lib/timeTheme.ts`
- 主题 token 常量（早期）：`app/lib/theme.ts`
- 变量注入：`app/components/theme/ThemeController.tsx`
- 全局 CSS 变量消费：`app/app/globals.css`

### 机制
1. 客户端按本地时间计算主题分段（night/dawn/day/sunset）并插值。
2. ThemeController 将结果写入 `document.documentElement.style` 的 CSS variables。
3. 样式层通过变量统一控制背景、文本、边框、强调色、阴影等。

### 关键 CSS 变量（来自时间主题）
`--bg`、`--bg-elevated`、`--surface`、`--surface-2`、`--text`、`--text-muted`、`--border`、`--accent`、`--accent-2`、`--shadow-color`、`--glow-color`、`--ring` 等。

### 调参与扩展
- 调时间段：改 `DEFAULT_TIME_CONFIG`（`app/lib/timeTheme.ts`）
- 调每段配色：改 `ANCHORS`
- 调过渡强度：改插值函数与更新频率
- 调试时间：URL query（`debugThemeTime` / `themeTime`）与 `window.__setThemeTime`

---

## 4) 动效系统

### 组件职责
- `Reveal`：元素进入视口渐显（IntersectionObserver）
- `Stagger`：对一组子元素按延迟递进触发 Reveal
- `PointerGlow` / `ParallaxGlow`：指针跟随与光晕
- `MagneticButton`：按钮轻微磁吸跟随
- `Parallax`：滚动视差位移
- `EffectLayer`：Hero 背景材质层（光束/噪点）

### 性能策略
- 多处使用 `requestAnimationFrame` 节流（滚动/指针）。
- 视觉位移优先使用 `transform` 与 `opacity`。
- `useReducedMotion` + `getMotionConfig` 实现统一降级：
  - 减少位移/关闭复杂效果
  - 关闭滚动联动/故障效果等高成本动画

### 扩展建议
- 新动效先接入 `getMotionConfig`（`app/lib/motion.ts`）
- 必须支持 `prefers-reduced-motion`
- 避免布局抖动属性（top/left/width/height 高频改动）

---

## 5) 样式体系

### 全局结构
- 文件：`app/app/globals.css`
- 分层可理解为：
  1. `:root` 变量（颜色、字号、间距、圆角、motion token）
  2. 基础 reset 与 body 背景
  3. Layout（header/nav/footer）
  4. 页面块（hero、works/blog/detail）
  5. 动效 keyframes 与 reduced-motion 媒体查询

### 组织方式
- 当前主要采用“单文件全局样式 + 语义 class”。
- 组件样式命名按功能域前缀（如 `work*`, `blog*`, `hero*`）组织。

---

## 6) SEO

### robots
- 文件：`app/app/robots.ts`
- 规则：允许全部抓取，sitemap 指向 `https://ymslab.top/sitemap.xml`

### sitemap
- 文件：`app/app/sitemap.ts`
- 包含页面：`/`、`/works`、`/blog`、`/docs` + 所有作品详情 + 所有博客详情
- 扩展方法：
  - 新增路由时补到 `staticRoutes`
  - 新增内容源时追加对应映射

---

## 7) 安全与运维

### 日志查看
- 应用日志：`docker compose logs -f web`
- 反代日志：`docker compose logs -f caddy`（Caddyfile 已输出到 stdout）

### 常见扫描请求处理
- 现状：未做专门 WAF/限流，扫描请求会落到 Caddy+Next 常规 404。
- 建议：
  1. Caddy 增加访问日志留存与基本限速策略
  2. 按需增加路径级拒绝规则（如敏感后台路径）
  3. 保持依赖与 Node LTS 更新

### 基本防护建议（不做大改）
- 保持并审查安全头配置
- 生产环境最小开放端口（仅 80/443）
- 定期备份 `Caddyfile` 与内容目录 `app/content`

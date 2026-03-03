# YMSLab

一个以中文为主的个人站点，包含首页、作品页、博客。

## 项目文档导航

- [一页总览](docs/OVERVIEW.md)
- [本地开发与部署手册](docs/DEV_AND_DEPLOY.md)
- [功能模块详解](docs/ARCHITECTURE.md)
- [排障 Runbook](docs/RUNBOOK.md)
- [可接手的待办清单](docs/TODO_HANDOFF.md)
- [作品内容维护流程](docs/CONTENT_WORKFLOW.md)

## 时间驱动主题系统（浏览器本地时间）

站点主题由客户端本地时间驱动（不是服务端时区），并以 **Night → Dawn → Day → Sunset → Night** 分段插值方式平滑变化。

- 主题计算入口：`app/lib/timeTheme.ts`
- 变量注入入口：`app/components/theme/ThemeController.tsx`
- 全站 token 样式：`app/app/globals.css`

### 可配置时间段

在 `app/lib/timeTheme.ts` 的 `DEFAULT_TIME_CONFIG` 中修改：

- Dawn: `05:30` (`dawnStart`)
- Day: `08:00` (`dayStart`)
- Sunset: `17:00` (`sunsetStart`)
- Night: `20:00` (`nightStart`)

### 核心 tokens

主题计算器会实时写入以下 CSS 变量：

- `--bg`
- `--bg-elevated`
- `--surface`
- `--surface-2`
- `--text`
- `--text-muted`
- `--border`
- `--accent`
- `--accent-2`
- `--shadow-color`
- `--glow-color`
- `--ring`

并附带背景/hero 渐变变量，让背景、卡片、按钮、边框、文本、链接、高光与阴影一起变化。

### 手动主题模式

导航栏提供 `自动 / 日间 / 夜间` 三态切换：

- 自动：随本地时间平滑变化
- 日间：固定 12:00 的主题
- 夜间：固定 01:00 的主题

当前模式会保存到 `localStorage(ymslab_theme_mode)`。

### 调试时间（开发）

支持两种方式：

1. URL query：
   - `?debugThemeTime=07:30`
   - `?themeTime=19:10`
2. 控制台函数：
   - `window.__setThemeTime("07:30")`
   - `window.__setThemeTime()` 清除调试并恢复本地时间

> 调试时间会写入 `localStorage(yms-debug-theme-time)`，方便刷新后持续观察。

### Reduced Motion

当用户偏好 `prefers-reduced-motion: reduce` 时：

- 主题过渡时长降级为快速过渡（`--theme-transition-duration: 0.45s`）
- 既有动效规则继续遵循 reduced-motion 降级策略

## 本地开发

```bash
cd app
npm install
npm run dev
```

## 构建

```bash
cd app
npm run build
```

## Docker

```bash
docker compose up -d --build
```

## 主题验证建议

分别验证以下时间：

- 清晨：`?debugThemeTime=06:30`（暖金/蜜桃 + 天光蓝）
- 日间：`?debugThemeTime=12:00`（浅冷白/淡蓝灰）
- 夕阳：`?debugThemeTime=18:30`（金橙/玫瑰紫/暮色蓝）
- 夜间：`?debugThemeTime=22:30`（宇宙深蓝）

并检查页面：`/`、`/blog`、`/works` 的文本、卡片、按钮、边框、链接、阴影、高光是否同步变化。

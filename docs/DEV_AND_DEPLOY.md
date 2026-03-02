# 本地开发与部署手册

## 1) 本地开发

### 前置
- Node.js 20（与 `app/Dockerfile` 对齐）
- npm（仓库包含 `package-lock.json`）

### 启动命令
```bash
cd app
npm install
npm run dev
```
- 默认端口：`3000`（脚本 `next dev -p 3000`）
- 访问：`http://localhost:3000`

### 环境变量
当前仓库未提供 `.env.example`，代码中也未读取自定义业务 env；运行依赖最小化：
- `NODE_ENV`（生产由 compose 传入）
- `PORT`（生产由 compose 传入，web 容器为 3000）

> 结论依据：`app/package.json`、`docker-compose.yml`、`app/app/*` 与 `app/lib/*` 未出现业务 env 读取。

---

## 2) 构建说明（npm run build）
```bash
cd app
npm run build
```
关键点：
1. 使用 Next standalone 输出（`app/next.config.mjs` 的 `output: 'standalone'`）。
2. 动态页面会在构建阶段读取内容源：
   - 博客：`app/content/blog/*.md`
   - 文档：`app/content/docs/*.md`
   - 作品：`app/data/works.ts`
3. 如 Markdown frontmatter 缺失字段，页面可能不报错但信息为空（title/date/summary/tags 会降级）。

### 常见失败与处理
- **TS/路径别名报错**：检查 `app/tsconfig.json` 的 `baseUrl`、`paths`，并确认导入使用 `@/*`。
- **构建时找不到内容文件**：确认 `app/content/blog`、`app/content/docs` 是否存在对应 `.md`。
- **Node 版本不匹配**：建议对齐 Node 20。

---

## 3) Docker 说明

### Dockerfile 分阶段做了什么
文件：`app/Dockerfile`
1. `deps` 阶段：安装依赖（并切换到 npmmirror registry）。
2. `build` 阶段：复制源码并执行 `npm run build`。
3. `runner` 阶段：仅复制 standalone 产物 + static + public，用 `node server.js` 启动。

### docker compose 启动
```bash
docker compose up -d --build
```
- `web`：由 `./app` 构建，容器内监听 3000，通过 `expose` 给 caddy。
- `caddy`：监听宿主机 `80/443`，反代到 `web:3000`。

### 常用运维命令
```bash
docker compose ps
docker compose logs -f web
docker compose logs -f caddy
docker compose restart web caddy
```

---

## 4) Caddy 反代与证书策略
文件：`Caddyfile`

### 已配置规则
1. `www.ymslab.top` 永久重定向到 `https://ymslab.top{uri}`。
2. `ymslab.top` 开启 `zstd gzip`。
3. 配置基础安全头（`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Strict-Transport-Security`）。
4. `reverse_proxy web:3000`。

### 80/443 与证书
- Caddy 默认自动管理证书（Let's Encrypt/ZeroSSL），前提是域名 DNS 正确指向服务器、80/443 可达。
- 当前配置未禁用 HTTPS，也未配置 staging CA。

### 备案/临时访问策略（建议）
若备案或证书阶段需临时明文访问，可临时改为仅 `:80` 站点并移除 HSTS（改完记得回滚）。
> 仓库当前未内置此临时配置模板，需要手工改 `Caddyfile`。

---

## 5) 一键部署脚本说明
- 仓库根目录与 `app/` 下未发现 `site-deploy` / `deploy.sh` / 类似一键脚本。
- 推荐标准工作流：
  1. 本地分支通过 `npm run build`
  2. 推送到远端
  3. 服务器 `git pull`
  4. `docker compose up -d --build`
  5. `docker compose logs -f web caddy` 观察 5~10 分钟

### 风险点（人工流程同样适用）
- 服务器上有未提交改动会导致 `git pull` 冲突。
- `docker compose up -d --build` 会重建镜像，若依赖源不稳定可能变慢。
- Caddy 改错会导致整站不可达，建议改前先备份 `Caddyfile`。

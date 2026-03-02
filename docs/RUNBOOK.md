# 排障 Runbook

## 1) 502 Bad Gateway

### 现象
浏览器访问域名返回 502。

### 定位步骤（标准）
1. 查看 caddy 日志：
   ```bash
   docker compose logs -f caddy
   ```
2. 查看 web 日志：
   ```bash
   docker compose logs -f web
   ```
3. 查看容器状态：
   ```bash
   docker compose ps
   ```
4. 进入 web 容器确认端口监听：
   ```bash
   docker compose exec web sh -lc "ss -lntp | grep 3000 || netstat -lntp | grep 3000"
   ```
5. 容器内互通检查：
   ```bash
   docker compose exec caddy sh -lc "wget -qO- http://web:3000 | head"
   ```

### 常见根因
- web 容器未启动/崩溃。
- Next 构建失败导致镜像内无有效产物。
- Caddy 反代目标配置错误（应为 `web:3000`）。

### 处理步骤
1. `docker compose up -d --build`
2. 若 web 仍失败，优先修构建问题（看 web logs）
3. 若 caddy 配置错误，修 `Caddyfile` 后 `docker compose restart caddy`

---

## 2) Build 失败（TS/路径别名/缺文件）

### 定位命令
```bash
cd app
npm run build
```

### 常见问题与修复
1. **TS 类型错误**
   - 检查报错文件导入类型与路由 params 类型。
   - 动态路由建议保留兼容写法（`await params` / `Promise.resolve(params)`）。
2. **路径别名错误**
   - 查看 `app/tsconfig.json` 的 `@/* -> ./*`。
   - 导入路径大小写与真实文件一致（Linux 区分大小写）。
3. **缺内容文件**
   - 校验 `app/content/blog/*.md`、`app/content/docs/*.md`。
   - 若 slug 页面存在但内容丢失，访问会进入 `notFound()`。

---

## 3) Git pull 冲突（服务器热修复）

### 安全流程（推荐）
```bash
git status
git add -A && git commit -m "chore: hotfix backup"   # 若需要保留
# 或临时存档
git stash push -u -m "temp-before-pull"
git pull --rebase
```

### 冲突后处理
```bash
git status
# 手工解决冲突后
git add -A
git rebase --continue
```

### 放弃本地改动（危险）
```bash
git fetch origin
git reset --hard origin/<branch>
```
> 仅在确认无需保留服务器本地改动时使用。

---

## 4) 证书申请失败 / 备案期临时访问

### 检查点
1. 域名解析是否正确指向服务器公网 IP。
2. 服务器防火墙/云安全组是否放行 80/443。
3. `docker compose logs -f caddy` 中 ACME 报错信息。

### 临时策略（备案/证书阶段）
- 可临时使用 HTTP（`:80`）配置进行内测，避免 HSTS 锁定。
- 当前仓库无独立 staging 配置；需要手工修改 `Caddyfile`。
- 证书恢复后再切回 HTTPS 与 HSTS。

---

## 5) 性能问题排查清单

目标：判断是“动效问题”还是“渲染/数据问题”。

### Checklist
1. 打开浏览器 Performance 录制，观察长任务来源。
2. 临时开启系统 `prefers-reduced-motion`：
   - 若显著改善，优先检查 `PointerGlow/Magnetic/Parallax/Reveal`。
3. 禁用首页复杂区块（本地注释）对比帧率。
4. 检查是否有高频布局属性变更（应优先 transform/opacity）。
5. 看 React DevTools 是否存在不必要重渲染（尤其客户端列表组件）。
6. 检查图片体积与外链媒体加载策略。

### 快速缓解
- 降低 `getMotionConfig` 强度级别。
- 减少指针跟随半径/更新频率。
- 对非首屏媒体启用懒加载与占位。

# 可接手的待办清单

## 1) 当前技术债 / 风险点

1. **样式与主题 token 并存，存在双轨风险**
   - `globals.css` 内仍有部分固定色值与旧变量（如 `--muted/--line`）
   - 时间主题变量虽已注入，但未做到“全站完全 token 化”

2. **类型约束偏宽松**
   - `tsconfig` 为 `strict: false`
   - 内容 frontmatter 校验依赖运行时兜底，缺少构建期强校验

3. **作品数据集中在单文件**
   - `app/data/works.ts` 持续增长后可读性与冲突概率上升
   - 多人协作时容易产生大段 merge conflict

4. **部署可观测性仍基础**
   - 目前主要依赖 `docker compose logs`
   - 缺少明确的健康检查、错误分级与告警

5. **Caddy 配置无分环境模板**
   - 生产/备案临时策略需手工改文件，操作风险较高

---

## 2) 2~3 周迭代路线图

### 第 1 周（稳定性与回归防护）
- [ ] 补齐文档流程：内容发布 checklist、上线 checklist
- [ ] 清理显著硬编码色值，优先替换为主题变量
- [ ] 增加关键页面的 smoke 检查脚本（构建 + 关键路由可访问）
- [ ] 梳理 `works.ts` 字段最小必填约束（至少在文档中硬性规定）

### 第 2 周（内容工作流与动效治理）
- [ ] 为 blog/docs frontmatter 增加“约定模板”
- [ ] 统一动效组件的配置入口，明确 low/medium/high 的预算上限
- [ ] 针对低性能设备做一次 reduced-motion 全链路巡检

### 第 3 周（中长期可维护性）
- [ ] 评估将 `works` 数据拆分为多文件或内容目录化
- [ ] 规划基础监控（容器健康、响应码、证书有效期）
- [ ] 评估把部分全局 CSS 分层拆分（tokens/layout/module）

---

## 3) 接手第一小时 Checklist（可直接照做）

1. **拉代码并确认分支**
   ```bash
   git clone https://github.com/NNBNBYLKW/YMSLab.git
   cd YMSLab
   git branch -a
   ```

2. **本地跑起来**
   ```bash
   cd app
   npm install
   npm run dev
   ```
   打开 `/`、`/works`、`/blog`、`/docs` 快速巡检。

3. **做一次生产构建验证**
   ```bash
   npm run build
   ```

4. **看部署链路日志（本地或服务器）**
   ```bash
   cd ..
   docker compose up -d --build
   docker compose logs -f web
   docker compose logs -f caddy
   ```

5. **改一处小功能并验证**（建议）
   - 在 `app/data/works.ts` 新增/修改一个作品 tag 或摘要文案
   - 本地验证 `/works` 与对应详情页
   - 重新 `docker compose up -d --build` 验证发布链路

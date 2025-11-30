# GitHub Actions 配置指南

本指南说明如何配置 GitHub Actions 和代码审查机器人。

## 📋 目录

- [必需的 Secrets](#必需的-secrets)
- [AI 代码审查配置](#ai-代码审查配置)
- [工作流说明](#工作流说明)
- [故障排除](#故障排除)

---

## 🔐 必需的 Secrets

在 GitHub 仓库设置中添加以下 Secrets：

### 1. 基础 Secrets（已存在）

这些应该已经在你的 `.env.local` 中：

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
```

### 2. GitHub Actions Secrets 配置

1. 进入仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加以下 secrets：

#### 必需 Secrets

| Secret 名称 | 说明 | 来源 |
|------------|------|------|
| `OPENAI_API_KEY` | OpenAI API Key（用于 AI 代码审查） | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | Supabase Dashboard |

#### 可选 Secrets（用于 AI 代码审查）

| Secret 名称 | 说明 | 来源 |
|------------|------|------|
| `CODERABBIT_API_KEY` | CodeRabbit API Key（替代方案） | [CodeRabbit](https://coderabbit.ai) |

---

## 🤖 AI 代码审查配置

### 方案 1: OpenAI PR Reviewer（推荐）

使用 `coderabbitai/openai-pr-reviewer` Action，需要：

1. **添加 Secret**:
   ```
   OPENAI_API_KEY=sk-...
   ```

2. **配置说明**:
   - 工作流文件: `.github/workflows/code-review.yml`
   - 自动在 PR 创建时触发
   - 使用 OpenAI API 进行代码审查

3. **自定义配置**:
   编辑 `.github/workflows/code-review.yml` 中的 `system_message` 来定制审查规则。

### 方案 2: CodeRabbit（推荐）

CodeRabbit 提供更强大的 AI 代码审查功能，支持两种配置方式：

#### 方式 A: GitHub App（推荐，无需 API Key）

1. **安装 CodeRabbit GitHub App**:
   - 访问 [CodeRabbit](https://coderabbit.ai)
   - 点击 "Install GitHub App"
   - 选择你的仓库并安装
   - 授权必要的权限

2. **配置 Secrets**（如果需要自定义配置）:
   ```
   CODERABBIT_APP_ID=your-app-id
   CODERABBIT_APP_PRIVATE_KEY=your-private-key
   ```
   
   获取方式：
   - 在 CodeRabbit 设置中找到 App ID
   - 下载 Private Key 文件

3. **启用工作流**:
   - 工作流会自动检测 GitHub App
   - 或者通过 Secrets 配置 App ID 和 Private Key

#### 方式 B: API Key（简单但功能有限）

1. **注册 CodeRabbit**:
   - 访问 [CodeRabbit](https://coderabbit.ai)
   - 注册账户并获取 API Key

2. **添加 Secret**:
   ```
   CODERABBIT_API_KEY=your-api-key
   ```

3. **启用工作流**:
   工作流会自动检测 `CODERABBIT_API_KEY` 并使用 CodeRabbit。

#### CodeRabbit 配置文件

项目包含 `.coderabbit.yaml` 配置文件，可以自定义：
- 审查规则和提示
- 文件过滤规则
- 审查摘要设置
- 评论行为

编辑 `.coderabbit.yaml` 来调整 CodeRabbit 的行为。

---

## 🔄 工作流说明

### CI 工作流 (`.github/workflows/ci.yml`)

**触发时机**:
- Push 到 `main` 或 `develop` 分支
- 创建或更新 Pull Request

**执行任务**:
1. Lint 和类型检查（TypeScript）
2. 构建应用
3. Python 代码检查

### 代码审查工作流 (`.github/workflows/code-review.yml`)

**触发时机**:
- PR 创建、更新或重新打开
- 仅对非草稿 PR 执行

**执行任务**:
- AI 代码审查（使用 OpenAI 或 CodeRabbit）
- 自动评论代码问题
- 提供改进建议

### PR 检查工作流 (`.github/workflows/pr-checks.yml`)

**触发时机**:
- PR 创建、更新或标记为 ready for review

**执行任务**:
1. PR 大小检查（自动添加 size 标签）
2. PR 描述检查
3. Issue 链接检查

### 自动标签工作流 (`.github/workflows/label-pr.yml`)

**触发时机**:
- PR 创建或更新

**执行任务**:
- 根据 PR 标题自动添加类型标签（feature, bug, enhancement 等）
- 根据文件变更自动添加区域标签（frontend, backend, database 等）

### 自动合并工作流 (`.github/workflows/auto-merge.yml`)

**触发时机**:
- Dependabot 创建的 PR

**执行任务**:
- 自动合并 Dependabot 的依赖更新 PR（通过所有检查后）

---

## 🛠️ 故障排除

### 问题 1: CI 工作流失败

**可能原因**:
- 缺少必要的 Secrets
- 依赖安装失败
- 代码检查失败

**解决方案**:
1. 检查 Secrets 是否已配置
2. 查看工作流日志
3. 本地运行 `pnpm lint` 和 `pnpm build` 检查

### 问题 2: AI 代码审查不工作

**可能原因**:
- `OPENAI_API_KEY` 未设置或无效
- API 配额不足
- 工作流配置错误

**解决方案**:
1. 确认 `OPENAI_API_KEY` Secret 已正确设置
2. 检查 OpenAI API 账户余额
3. 查看工作流日志中的错误信息

### 问题 3: PR 标签未自动添加

**可能原因**:
- 工作流权限不足
- PR 标题格式不符合规范

**解决方案**:
1. 检查仓库设置 → Actions → General → Workflow permissions
   - 选择 "Read and write permissions"
2. 确保 PR 标题遵循 Conventional Commits 格式

### 问题 4: 自动合并不工作

**可能原因**:
- 仅适用于 Dependabot PR
- 需要分支保护规则允许自动合并

**解决方案**:
1. 确认是 Dependabot 创建的 PR
2. 检查分支保护规则设置

---

## 🔒 权限配置

### 工作流权限

1. 进入 **Settings** → **Actions** → **General**
2. 在 **Workflow permissions** 部分：
   - 选择 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"

### 分支保护规则（推荐）

1. 进入 **Settings** → **Branches**
2. 为 `main` 分支添加规则：
   - ✅ Require a pull request before merging
   - ✅ Require approvals (至少 1 个)
   - ✅ Require status checks to pass before merging
     - 选择 `lint-and-typecheck`
     - 选择 `build`
   - ✅ Require branches to be up to date before merging

---

## 📊 监控和维护

### 查看工作流状态

- 进入 **Actions** 标签页查看所有工作流运行状态
- 点击具体运行查看详细日志

### 工作流通知

- 默认会发送邮件通知（可在 GitHub 设置中配置）
- 可以在工作流中添加 Slack/Discord 通知（可选）

---

## 🔄 更新工作流

工作流文件位于 `.github/workflows/` 目录：

- `ci.yml` - CI/CD 流程
- `code-review.yml` - AI 代码审查
- `pr-checks.yml` - PR 质量检查
- `label-pr.yml` - 自动标签
- `auto-merge.yml` - 自动合并

修改后提交到仓库，GitHub 会自动使用新配置。

---

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [CodeRabbit 文档](https://docs.coderabbit.ai)

---

**最后更新**: 2025-11-25

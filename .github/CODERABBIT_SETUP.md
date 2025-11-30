# CodeRabbit 配置指南

CodeRabbit 是一个强大的 AI 代码审查工具，可以自动审查 Pull Request 并提供详细的反馈。

## 📋 目录

- [安装方式](#安装方式)
- [GitHub App 安装（推荐）](#github-app-安装推荐)
- [API Key 配置](#api-key-配置)
- [配置文件说明](#配置文件说明)
- [功能特性](#功能特性)
- [故障排除](#故障排除)

---

## 🚀 安装方式

CodeRabbit 支持两种安装方式：

1. **GitHub App**（推荐）- 功能更强大，无需 API Key
2. **API Key** - 简单快速，但功能有限

---

## 🔧 GitHub App 安装（推荐）

### 步骤 1: 安装 GitHub App

1. 访问 [CodeRabbit 官网](https://coderabbit.ai)
2. 点击 **"Install GitHub App"** 或 **"Get Started"**
3. 选择 **"Install on GitHub"**
4. 选择要安装的仓库：
   - **Only select repositories** - 选择 `InfoMatrix`
   - 或 **All repositories** - 安装到所有仓库
5. 点击 **"Install"**

### 步骤 2: 授权权限

CodeRabbit 需要以下权限：
- ✅ **Read access to code** - 读取代码
- ✅ **Read access to pull requests** - 读取 PR
- ✅ **Write access to pull requests** - 在 PR 上评论
- ✅ **Read access to metadata** - 读取元数据

### 步骤 3: 配置 Secrets（可选）

如果使用 GitHub App，通常不需要配置 Secrets。但如果需要自定义配置：

1. 在 CodeRabbit 设置中找到 **App ID**
2. 下载 **Private Key** 文件
3. 在 GitHub 仓库中添加 Secrets：
   ```
   Settings → Secrets and variables → Actions → New repository secret
   ```
   
   添加：
   - `CODERABBIT_APP_ID` - App ID（数字）
   - `CODERABBIT_APP_PRIVATE_KEY` - Private Key（完整内容，包括 `-----BEGIN RSA PRIVATE KEY-----` 等）

### 步骤 4: 验证安装

1. 创建一个测试 PR
2. CodeRabbit 应该自动在 PR 上添加评论
3. 查看 `.github/workflows/code-review.yml` 工作流是否运行成功

---

## 🔑 API Key 配置

### 步骤 1: 获取 API Key

1. 访问 [CodeRabbit](https://coderabbit.ai)
2. 注册账户（如果还没有）
3. 进入 **Settings** → **API Keys**
4. 创建新的 API Key
5. 复制 API Key（只显示一次，请保存好）

### 步骤 2: 添加 Secret

1. 进入 GitHub 仓库
2. **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加：
   - **Name**: `CODERABBIT_API_KEY`
   - **Value**: 你的 API Key
5. 点击 **Add secret**

### 步骤 3: 验证配置

创建一个测试 PR，CodeRabbit 应该会自动审查。

---

## ⚙️ 配置文件说明

项目包含 `.coderabbit.yaml` 配置文件，用于自定义 CodeRabbit 的行为。

### 主要配置项

```yaml
# 审查设置
review:
  simple_changes: false  # 不审查简单变更（如拼写错误）
  comment_lgtm: false    # 不在批准的 PR 上评论 "LGTM"
  status_comment: true   # 发布审查状态评论

# 审查摘要
review_summary:
  enabled: true          # 启用审查摘要
  include_score: true    # 包含评分
  include_metrics: true  # 包含指标

# 文件限制
limits:
  max_files_to_review: 50     # 最多审查 50 个文件
  max_files_to_summarize: 20  # 最多总结 20 个文件

# 路径过滤
path_filters:
  include:
    - "**/*.ts"
    - "**/*.tsx"
    - "**/*.py"
  exclude:
    - "**/*.test.ts"
    - "**/node_modules/**"
```

### 自定义审查提示

在 `.coderabbit.yaml` 中的 `review_prompt.extra` 可以添加项目特定的审查规则：

```yaml
review_prompt:
  extra: |
    Please review the code following InfoMatrix project conventions:
    - TypeScript/Type safety best practices
    - Next.js 14 App Router patterns
    - Proper error handling
    - Security considerations
```

---

## ✨ 功能特性

### 1. 自动代码审查

- 检查代码质量
- 发现潜在 bug
- 性能优化建议
- 安全漏洞检测

### 2. 审查摘要

CodeRabbit 会在 PR 上发布审查摘要，包括：
- 总体评分
- 关键问题
- 改进建议
- 代码指标

### 3. 行内评论

- 在具体代码行上添加评论
- 提供修复建议
- 解释问题原因

### 4. 智能过滤

- 自动忽略测试文件（可选）
- 过滤简单变更
- 只审查相关文件

---

## 🔍 故障排除

### 问题 1: CodeRabbit 没有运行

**检查清单**:
1. ✅ GitHub App 是否已安装？
2. ✅ 工作流权限是否正确？
3. ✅ Secrets 是否配置正确？
4. ✅ PR 是否为草稿？（草稿 PR 不会触发）

**解决方案**:
- 检查 `.github/workflows/code-review.yml` 是否存在于仓库
- 查看 Actions 标签页中的工作流运行状态
- 检查工作流日志中的错误信息

### 问题 2: CodeRabbit 没有评论

**可能原因**:
- 配置了 `review_simple_changes: false`，变更太简单
- 文件被路径过滤器排除
- API 配额不足

**解决方案**:
- 检查 `.coderabbit.yaml` 中的路径过滤规则
- 确认 PR 包含实际代码变更
- 检查 CodeRabbit 账户状态

### 问题 3: 审查质量不高

**改进方法**:
1. 更新 `.coderabbit.yaml` 中的 `review_prompt.extra`
2. 添加项目特定的审查规则
3. 调整文件过滤规则，确保审查相关文件

### 问题 4: 工作流失败

**常见错误**:
- `CODERABBIT_API_KEY not found` - 需要添加 Secret
- `Invalid API key` - API Key 无效或过期
- `Permission denied` - GitHub App 权限不足

**解决方案**:
- 检查 Secrets 配置
- 重新生成 API Key
- 检查 GitHub App 权限设置

---

## 📚 相关资源

- [CodeRabbit 官网](https://coderabbit.ai)
- [CodeRabbit 文档](https://docs.coderabbit.ai)
- [GitHub App 文档](https://docs.github.com/en/apps)
- [Actions 配置指南](SETUP_ACTIONS.md)

---

## 💡 最佳实践

1. **使用 GitHub App** - 功能更强大，无需管理 API Key
2. **配置路径过滤** - 避免审查不相关的文件
3. **自定义审查提示** - 添加项目特定的规则
4. **定期更新配置** - 根据项目需求调整设置
5. **查看审查摘要** - 了解代码质量趋势

---

**最后更新**: 2025-11-25

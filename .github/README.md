# GitHub 配置文档

本目录包含 InfoMatrix 项目的所有 GitHub 相关配置。

## 📁 目录结构

```
.github/
├── workflows/          # GitHub Actions 工作流
│   ├── ci.yml         # CI/CD 流程
│   ├── code-review.yml # AI 代码审查
│   ├── pr-checks.yml  # PR 质量检查
│   ├── label-pr.yml   # 自动标签
│   └── auto-merge.yml # 自动合并
├── ISSUE_TEMPLATE/     # Issue 模板
│   ├── bug.md         # Bug 报告模板
│   ├── feature.md     # 功能请求模板
│   └── enhancement.md # 功能增强模板
├── ISSUES.md          # Issue 规划列表
├── FOUNDATION_TASKS.md # 基础功能任务清单
├── ISSUE_GUIDE.md     # Issue 提交指南
├── SETUP_ACTIONS.md   # Actions 配置指南
├── QUICK_REFERENCE.md # 快速参考
├── CODEOWNERS         # 代码审查责任人
├── dependabot.yml     # Dependabot 配置
└── pull_request_template.md # PR 模板
```

## 🚀 快速开始

### 1. 配置 GitHub Actions

查看 [SETUP_ACTIONS.md](SETUP_ACTIONS.md) 了解如何配置：
- 必需的 Secrets
- AI 代码审查机器人
- 工作流权限

### 2. 提交 Issue

查看 [ISSUE_GUIDE.md](ISSUE_GUIDE.md) 了解：
- 如何提交 Issue
- Issue 类型和模板
- 最佳实践

### 3. 贡献代码

查看 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解：
- 开发流程
- 代码规范
- PR 流程

## 📋 工作流说明

### CI/CD 工作流

- **文件**: `workflows/ci.yml`
- **触发**: Push 或 PR 到 main/develop
- **功能**: Lint、类型检查、构建、Python 检查

### AI 代码审查

- **文件**: `workflows/code-review.yml`
- **触发**: PR 创建或更新
- **功能**: 使用 OpenAI 或 CodeRabbit 进行代码审查

### PR 质量检查

- **文件**: `workflows/pr-checks.yml`
- **触发**: PR 创建或更新
- **功能**: PR 大小检查、描述检查、Issue 链接检查

### 自动标签

- **文件**: `workflows/label-pr.yml`
- **触发**: PR 创建或更新
- **功能**: 根据 PR 标题和文件变更自动添加标签

### 自动合并

- **文件**: `workflows/auto-merge.yml`
- **触发**: Dependabot PR
- **功能**: 自动合并依赖更新（通过检查后）

## 🤖 AI 代码审查

项目集成了 AI 代码审查机器人，会在每个 PR 上自动进行代码审查。

### 支持的方案

1. **OpenAI PR Reviewer** (推荐)
   - 使用 OpenAI API
   - 需要 `OPENAI_API_KEY` Secret

2. **CodeRabbit** (替代)
   - 使用 CodeRabbit 服务
   - 需要 `CODERABBIT_API_KEY` Secret

### 配置步骤

1. 添加必要的 Secret（见 [SETUP_ACTIONS.md](SETUP_ACTIONS.md)）
2. 工作流会自动运行
3. 查看 PR 评论中的审查结果

## 📝 Issue 和 PR 模板

### Issue 模板

- `ISSUE_TEMPLATE/bug.md` - Bug 报告
- `ISSUE_TEMPLATE/feature.md` - 功能请求
- `ISSUE_TEMPLATE/enhancement.md` - 功能增强

### PR 模板

- `pull_request_template.md` - Pull Request 模板

创建 Issue 或 PR 时会自动使用这些模板。

## 🔄 Dependabot

自动更新依赖：

- **文件**: `dependabot.yml`
- **更新频率**: 每周一
- **支持**: npm、pip、GitHub Actions

## 👥 代码审查

### CODEOWNERS

- **文件**: `CODEOWNERS`
- **功能**: 定义代码审查责任人
- **使用**: GitHub 会自动请求 CODEOWNERS 审查

### 审查要求

- 至少 1 位维护者批准
- 所有 CI 检查通过
- 解决所有审查意见

## 📚 相关文档

- [贡献指南](../CONTRIBUTING.md) - 如何贡献代码
- [Issue 指南](ISSUE_GUIDE.md) - 如何提交 Issue
- [Actions 配置](SETUP_ACTIONS.md) - GitHub Actions 配置
- [基础功能任务](FOUNDATION_TASKS.md) - 当前开发任务
- [Issue 规划](ISSUES.md) - 功能规划列表

## 🔧 维护

### 更新工作流

1. 编辑 `.github/workflows/*.yml` 文件
2. 提交更改
3. GitHub 会自动使用新配置

### 添加新的检查

1. 在 `workflows/ci.yml` 中添加新 job
2. 或创建新的工作流文件
3. 测试工作流是否正常工作

## ❓ 常见问题

### Q: CI 工作流失败怎么办？

A: 查看工作流日志，检查：
- Secrets 是否配置正确
- 代码是否通过 lint 检查
- 依赖是否安装成功

### Q: AI 代码审查不工作？

A: 检查：
- `OPENAI_API_KEY` 或 `CODERABBIT_API_KEY` 是否设置
- API 配额是否充足
- 工作流日志中的错误信息

### Q: 如何添加新的 Issue 模板？

A: 在 `ISSUE_TEMPLATE/` 目录下创建新的 `.md` 文件，GitHub 会自动识别。

---

**最后更新**: 2025-11-25

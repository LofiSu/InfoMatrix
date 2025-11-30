# 贡献指南 (Contributing Guide)

感谢你对 InfoMatrix 项目的关注！本指南将帮助你了解如何为项目做出贡献。

## 📋 目录

- [行为准则](#行为准则)
- [开始之前](#开始之前)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [测试要求](#测试要求)
- [文档要求](#文档要求)

---

## 🤝 行为准则

我们致力于为所有贡献者提供一个友好、包容的环境。请：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

---

## 🚀 开始之前

### 1. Fork 和 Clone

```bash
# Fork 仓库到你的 GitHub 账户
# 然后 clone 你的 fork
git clone https://github.com/YOUR_USERNAME/InfoMatrix.git
cd InfoMatrix

# 添加上游仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/InfoMatrix.git
```

### 2. 安装依赖

```bash
# 使用 pnpm（必需，不要使用 npm 或 yarn）
pnpm install

# 安装 Python 依赖（如果需要）
pip install -r requirements.txt
```

### 3. 环境配置

复制 `.env.local.example` 到 `.env.local` 并填写必要的环境变量：

```bash
cp .env.local.example .env.local
```

### 4. 运行开发服务器

```bash
pnpm dev
```

---

## 🔄 开发流程

### 1. 创建分支

从最新的 `main` 分支创建你的功能分支：

```bash
# 确保你在 main 分支
git checkout main

# 拉取最新更改
git pull upstream main

# 创建新分支
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
# 或
git checkout -b enhance/your-enhancement
```

**分支命名规范**:
- `feature/` - 新功能
- `fix/` - Bug 修复
- `enhance/` - 功能增强
- `refactor/` - 代码重构
- `docs/` - 文档更新
- `test/` - 测试相关

### 2. 开发你的功能

- 遵循项目的代码规范（见下方）
- 编写清晰的代码和注释
- 确保代码通过 lint 检查
- 添加必要的测试

### 3. 提交更改

使用清晰的提交信息：

```bash
git add .
git commit -m "feat: add conversation history persistence"
```

**提交信息格式**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**:
- `feat`: 新功能
- `fix`: Bug 修复
- `enhance`: 功能增强
- `refactor`: 代码重构
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例**:
```bash
feat(chat): add conversation history persistence

- Add conversations and conversation_messages tables
- Implement save/load conversation API
- Add conversation list sidebar component

Closes #1
```

### 4. 推送分支

```bash
git push origin feature/your-feature-name
```

---

## 📝 代码规范

### TypeScript/React

1. **使用 TypeScript 严格模式**
   - 所有函数必须有类型注解
   - 避免使用 `any`，使用 `unknown` 或具体类型

2. **组件规范**
   ```typescript
   // ✅ 正确
   interface ComponentProps {
     title: string;
     onAction?: () => void;
   }
   
   export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
     // ...
   };
   ```

3. **命名规范**
   - 组件：PascalCase (`ChatMessage`)
   - 函数/变量：camelCase (`handleSubmit`)
   - 常量：UPPER_SNAKE_CASE (`MAX_RETRIES`)
   - 文件：kebab-case (`chat-message.tsx`)

4. **导入顺序**
   ```typescript
   // 1. React
   import * as React from "react";
   
   // 2. 第三方库
   import { useChat } from "@ai-sdk/react";
   
   // 3. 内部组件
   import { Button } from "@/components/ui/button";
   
   // 4. 工具函数
   import { cn } from "@/lib/utils";
   
   // 5. 类型
   import type { ChatMessage } from "@/types/api";
   ```

### Python

1. **遵循 PEP 8**
   - 使用 4 个空格缩进
   - 行长度不超过 100 字符
   - 使用类型提示

2. **函数文档字符串**
   ```python
   def calculate_semantic_distance(
       vector_a: List[float], 
       vector_b: List[float]
   ) -> float:
       """
       Calculates the cosine similarity distance between two embedding vectors.
       
       This function implements the core algorithm for Knowledge Gap Analysis.
       
       Args:
           vector_a: First embedding vector (1536 dimensions)
           vector_b: Second embedding vector (1536 dimensions)
       
       Returns:
           Cosine distance (0 = identical, 1 = orthogonal)
       """
       pass
   ```

3. **学术术语**
   - 使用学术术语而非通俗表达
   - 例如："Calculate Semantic Entropy" 而非 "Find trending topics"

### 样式规范

- 使用 Tailwind CSS 工具类
- 使用 `cn()` 工具函数合并类名
- 遵循移动优先的响应式设计

---

## 🔍 Pull Request 流程

### 1. 创建 Pull Request

1. 在 GitHub 上创建 PR
2. 使用 PR 模板（会自动填充）
3. 填写详细的描述

### 2. PR 描述模板

```markdown
## 📋 变更描述
简要描述这个 PR 做了什么

## 🎯 相关 Issue
Closes #123

## 🔄 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 功能增强
- [ ] 代码重构
- [ ] 文档更新

## ✅ 检查清单
- [ ] 代码通过 lint 检查
- [ ] 代码通过类型检查
- [ ] 已添加必要的测试
- [ ] 已更新相关文档
- [ ] 已测试功能正常工作

## 📸 截图（如适用）
[添加截图]

## 🧪 测试说明
描述如何测试这些更改
```

### 3. PR 审查

- 至少需要 1 位维护者批准
- 所有 CI 检查必须通过
- 解决所有审查意见
- 保持 PR 规模合理（建议 < 500 行）

### 4. 合并

- 维护者会审查并合并
- 使用 "Squash and merge" 或 "Rebase and merge"
- 删除功能分支（可选）

---

## 🧪 测试要求

### 运行测试

```bash
# TypeScript 类型检查
pnpm exec tsc --noEmit

# ESLint
pnpm lint

# Python lint
flake8 api/py/
black --check api/py/
```

### 测试覆盖

- 新功能应包含基本测试
- Bug 修复应包含回归测试
- 复杂算法必须有测试用例

---

## 📚 文档要求

### 代码注释

- 复杂函数必须有注释
- 算法实现必须有方法论说明
- 使用学术术语（用于论文/专利）

### 文档更新

- 新功能需要更新 README 或相关文档
- API 变更需要更新 API 文档
- 配置变更需要更新配置文档

---

## 🐛 报告 Bug

使用 [Bug 报告模板](.github/ISSUE_TEMPLATE/bug.md) 创建 Issue。

---

## 💡 提出新功能

使用 [功能请求模板](.github/ISSUE_TEMPLATE/feature.md) 创建 Issue。

---

## ❓ 需要帮助？

- 查看 [Issue 指南](.github/ISSUE_GUIDE.md)
- 查看 [快速开始指南](QUICK_START.md)
- 查看 [项目文档](README.md)

---

## 🙏 致谢

感谢所有为 InfoMatrix 做出贡献的开发者！

---

**最后更新**: 2025-11-25

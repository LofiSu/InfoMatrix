# 🚀 InfoMatrix 快速启动指南

## 当前配置状态

### ✅ 已完成

1. **项目结构**
   - ✅ Next.js 14 + TypeScript 配置完成
   - ✅ Tailwind CSS + Shadcn/UI 已配置
   - ✅ 组件化界面已实现（类似 Perplexity 风格）
   - ✅ 前端页面已创建

2. **后端架构**
   - ✅ Python API 路由结构已创建
   - ✅ 三个核心 Agent 框架已搭建
   - ✅ Vercel 配置已设置
   - ✅ Cron 任务配置完成

3. **数据库**
   - ✅ Supabase 客户端已配置（server & client）
   - ✅ 中间件已设置
   - ✅ 数据库 Schema SQL 已创建

4. **依赖管理**
   - ✅ Node.js 依赖已安装（pnpm）
   - ✅ Python 依赖已安装（部分版本警告可忽略）

### ⚠️ 需要配置

1. **环境变量**（必需）
   - 创建 `.env.local` 文件
   - 配置 Supabase 凭证
   - 配置 OpenAI API Key
   - 配置 Cron Secret

2. **数据库初始化**
   - 在 Supabase 中运行 `supabase/schema.sql`

## 快速启动步骤

### 1. 配置环境变量

```bash
# 复制模板文件
cp .env.local.example .env.local

# 编辑 .env.local，填入你的凭证
# 必需配置：
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - OPENAI_API_KEY
# - CRON_SECRET
```

### 2. 初始化数据库

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目（如果还没有）
3. 进入 SQL Editor
4. 复制 `supabase/schema.sql` 的全部内容
5. 粘贴并执行

### 3. 验证配置

```bash
# 运行配置检查
pnpm run check-config
```

应该看到所有必需变量都已配置。

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 配置检查清单

运行以下命令检查配置状态：

```bash
# 1. 检查环境变量
pnpm run check-config

# 2. 检查 Python 依赖
pip3 list | grep -E "fastapi|supabase|openai"

# 3. 检查 Node.js 依赖
pnpm list --depth=0

# 4. 检查服务器是否运行
lsof -ti:3000 && echo "✅ Server running" || echo "❌ Server not running"
```

## 项目结构说明

```
InfoMatrix/
├── app/                    # Next.js 页面
│   ├── page.tsx           # 首页
│   ├── discover/           # 发现页面
│   └── spaces/             # 空间页面
├── components/
│   ├── ui/                 # 基础 UI 组件
│   └── features/           # 功能组件
│       ├── sidebar.tsx     # 侧边栏
│       ├── search-bar.tsx  # 搜索框
│       ├── library.tsx     # 历史记录
│       └── main-layout.tsx # 主布局
├── api/
│   ├── py/                 # Python API（Vercel Serverless）
│   │   ├── radar/          # 雷达智能体
│   │   ├── brain/          # 大脑智能体
│   │   └── matrix/         # 矩阵智能体
│   └── cron/               # Cron 任务
├── lib/
│   └── supabase/           # Supabase 客户端
├── supabase/
│   └── schema.sql          # 数据库 Schema
└── scripts/
    ├── check-config.ts     # 配置检查脚本
    └── setup-guide.md      # 详细配置指南
```

## 功能说明

### 前端功能

- **首页** (`/`): 搜索界面 + 历史记录
- **发现** (`/discover`): 内容发现页面
- **空间** (`/spaces`): 内容空间管理

### 后端 API（Python）

- **Radar Agent** (`/api/py/radar`): 情报采集
- **Brain Agent** (`/api/py/brain`): 知识分析
- **Matrix Agent** (`/api/py/matrix`): 内容生成

### 定时任务

- **Ingestion Cron** (`/api/cron/ingest`): 每小时自动采集

## 常见问题

### Q: 环境变量配置后还是报错？

A: 确保 `.env.local` 文件在项目根目录，并且变量名正确。重启开发服务器。

### Q: Python API 路由不工作？

A: 本地开发时，Python 路由仅在 Vercel 部署时可用。使用 `vercel dev` 或部署到 Vercel。

### Q: Supabase 连接失败？

A: 
1. 检查 `.env.local` 中的 URL 和 Key
2. 确认 Supabase 项目状态为 Active
3. 检查网络连接

### Q: 数据库表不存在？

A: 确保已运行 `supabase/schema.sql` 在 Supabase SQL Editor 中。

## 下一步

配置完成后，可以：

1. **测试前端界面**
   - 访问 http://localhost:3000
   - 测试搜索功能
   - 查看历史记录

2. **连接 Supabase**
   - 测试数据库连接
   - 验证表结构

3. **开发 Agent 功能**
   - 实现 Radar Agent 采集逻辑
   - 实现 Brain Agent 分析算法
   - 实现 Matrix Agent 生成功能

## 获取帮助

- 📖 详细配置指南：`scripts/setup-guide.md`
- 📋 配置状态文档：`CONFIGURATION.md`
- 📚 项目 README：`README.md`


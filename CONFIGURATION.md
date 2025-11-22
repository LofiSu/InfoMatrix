# InfoMatrix 配置状态检查

## ✅ 已完成的配置

### 1. 项目结构
- ✅ Next.js 14 项目已初始化
- ✅ TypeScript 配置完成
- ✅ Tailwind CSS + Shadcn/UI 已配置
- ✅ 组件化架构已实现

### 2. 后端配置
- ✅ Python API 路由结构已创建
  - `/api/py/radar/route.py` - 雷达智能体
  - `/api/py/brain/route.py` - 大脑智能体
  - `/api/py/matrix/route.py` - 矩阵智能体
- ✅ Vercel 配置 (`vercel.json`) 已设置
- ✅ Cron 任务配置已设置

### 3. 数据库配置
- ✅ Supabase 客户端已配置
  - `lib/supabase/server.ts` - 服务端客户端
  - `lib/supabase/client.ts` - 客户端客户端
- ✅ 中间件已配置 (`middleware.ts`)
- ✅ 数据库 Schema (`supabase/schema.sql`) 已创建

### 4. 依赖管理
- ✅ Node.js 依赖已安装 (pnpm)
- ⚠️ Python 依赖需要安装（见下方）

## ⚠️ 需要配置的项目

### 1. 环境变量 (必需)

创建 `.env.local` 文件：

```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local`，填入以下必需配置：

#### Supabase 配置
1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目
3. 进入 Project Settings > API
4. 复制以下值：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### OpenAI API
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 创建 API Key
3. 复制到 `OPENAI_API_KEY`

#### Cron Secret
生成随机字符串：
```bash
openssl rand -hex 32
```

### 2. Python 依赖安装

```bash
# 安装 Python 依赖
pip3 install -r requirements.txt

# 或使用虚拟环境（推荐）
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### 3. 数据库初始化

1. 在 Supabase Dashboard 中打开 SQL Editor
2. 复制 `supabase/schema.sql` 的全部内容
3. 粘贴并执行

验证 pgvector 扩展：
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 4. 验证配置

运行配置检查：
```bash
pnpm run check-config
```

## 🚀 启动项目

### 开发模式

```bash
# 确保环境变量已配置
pnpm run check-config

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

### 生产构建

```bash
pnpm run build
pnpm start
```

## 📝 配置检查清单

- [ ] `.env.local` 文件已创建并配置
- [ ] Supabase 项目已创建
- [ ] 数据库 Schema 已运行
- [ ] Python 依赖已安装
- [ ] 配置检查通过 (`pnpm run check-config`)
- [ ] 开发服务器可以启动

## 🔧 故障排除

### Supabase 连接失败
- 检查 `.env.local` 中的 URL 和 Key
- 确认 Supabase 项目状态为 Active
- 检查网络连接

### Python API 不工作
- 本地开发时，Python 路由仅在 Vercel 部署时可用
- 使用 `vercel dev` 进行本地测试
- 或直接部署到 Vercel 预览环境

### 数据库错误
- 确认已运行 `supabase/schema.sql`
- 检查 Supabase Dashboard 中的 Tables
- 验证 pgvector 扩展已启用

## 📚 更多信息

- 详细配置指南：`scripts/setup-guide.md`
- 项目 README：`README.md`
- 数据库 Schema：`supabase/schema.sql`


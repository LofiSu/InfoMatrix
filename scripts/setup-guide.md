# InfoMatrix 配置指南

## 1. 环境变量配置

### 创建 .env.local 文件

```bash
cp .env.local.example .env.local
```

### 配置 Supabase

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 创建新项目（如果还没有）
3. 进入 Project Settings > API
4. 复制以下信息到 `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role key (⚠️ 保密)

### 配置 OpenAI API

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 创建新的 API Key
3. 复制到 `.env.local` 的 `OPENAI_API_KEY`

### 配置 Cron Secret

生成随机字符串：

```bash
openssl rand -hex 32
```

或使用在线工具生成，然后填入 `CRON_SECRET`

### 可选配置（用于 Radar Agent）

- **YouTube API Key**: 用于采集 YouTube 视频
- **Twitter Bearer Token**: 用于采集 Twitter/X 内容

## 2. 数据库设置

### 运行 Schema SQL

1. 在 Supabase Dashboard 中，进入 SQL Editor
2. 复制 `supabase/schema.sql` 的全部内容
3. 粘贴到 SQL Editor
4. 点击 Run 执行

### 验证 pgvector 扩展

在 SQL Editor 中运行：

```sql
SELECT * FROM pg_extension WHERE extname = 'vector';
```

如果返回空，运行：

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## 3. Python 依赖

确保已安装所有 Python 依赖：

```bash
pip3 install -r requirements.txt
```

或使用虚拟环境（推荐）：

```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# 或
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## 4. 验证配置

运行配置检查脚本：

```bash
pnpm run check-config
```

或手动检查：

```bash
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Supabase URL configured' : '❌ Missing Supabase URL')"
```

## 5. 启动项目

```bash
# 安装 Node.js 依赖（如果还没安装）
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

## 6. 常见问题

### Supabase 连接失败

- 检查 `.env.local` 中的 URL 和 Key 是否正确
- 确认 Supabase 项目状态为 Active
- 检查网络连接

### Python API 路由不工作

- 确认 `vercel.json` 配置正确
- 本地开发时，Python 路由仅在 Vercel 部署时可用
- 使用 `vercel dev` 进行本地测试

### 数据库表不存在

- 确认已运行 `supabase/schema.sql`
- 检查 Supabase Dashboard 中的 Tables 列表


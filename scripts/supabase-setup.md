# Supabase 配置步骤

## 项目信息
- 项目 ID: `jpgvzeqfoagsjmmokhge`
- Dashboard: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge

## 步骤 1: 获取 API 凭证

### 在 Supabase Dashboard 中：

1. **进入 Project Settings**
   - 点击左侧边栏的 "Settings" (齿轮图标)
   - 或直接访问：https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/settings/api

2. **复制以下信息**：

   - **Project URL**: 
     - 在 "Project URL" 部分
     - 格式类似：`https://jpgvzeqfoagsjmmokhge.supabase.co`
     - 复制到 `NEXT_PUBLIC_SUPABASE_URL`

   - **anon/public key**:
     - 在 "Project API keys" 部分
     - 找到 "anon" 或 "public" key
     - 点击 "Reveal" 显示完整 key
     - 复制到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   - **service_role key**:
     - 在同一个 "Project API keys" 部分
     - 找到 "service_role" key
     - ⚠️ **重要**: 这个 key 有完整权限，不要暴露在前端代码中
     - 点击 "Reveal" 显示完整 key
     - 复制到 `SUPABASE_SERVICE_ROLE_KEY`

## 步骤 2: 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件，填入以下内容：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jpgvzeqfoagsjmmokhge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key

# OpenAI API (需要从 https://platform.openai.com/api-keys 获取)
OPENAI_API_KEY=sk-你的openai_key

# Cron Secret (生成随机字符串)
CRON_SECRET=$(openssl rand -hex 32)

# 可选配置
YOUTUBE_API_KEY=
TWITTER_BEARER_TOKEN=
```

## 步骤 3: 初始化数据库

1. **进入 SQL Editor**
   - 在 Supabase Dashboard 左侧边栏点击 "SQL Editor"
   - 或访问：https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/sql/new

2. **运行 Schema SQL**
   - 打开项目中的 `supabase/schema.sql` 文件
   - 复制全部内容
   - 粘贴到 SQL Editor
   - 点击 "Run" 或按 Cmd/Ctrl + Enter

3. **验证表创建**
   - 在左侧边栏点击 "Table Editor"
   - 应该看到以下表：
     - `sources`
     - `intelligence`
     - `creations`
     - `user_preferences`

4. **验证 pgvector 扩展**
   - 在 SQL Editor 中运行：
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'vector';
   ```
   - 如果返回空，运行：
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

## 步骤 4: 验证配置

运行配置检查：

```bash
pnpm run check-config
```

应该看到所有必需变量都已配置。

## 快速链接

- **API Settings**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/settings/api
- **SQL Editor**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/editor


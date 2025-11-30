# 如何从 Supabase Dashboard 获取 API Keys

## 项目信息
- **项目 ID**: `jpgvzeqfoagsjmmokhge`
- **Dashboard 链接**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge

## 步骤详解

### 1. 打开 API Settings 页面

直接访问：
**https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/settings/api**

或者：
1. 在 Supabase Dashboard 中
2. 点击左侧边栏的 **Settings** (⚙️ 齿轮图标)
3. 点击 **API** 子菜单

### 2. 找到 Project URL

在页面顶部，你会看到：
- **Project URL**: `https://jpgvzeqfoagsjmmokhge.supabase.co`
- 这就是 `NEXT_PUBLIC_SUPABASE_URL` 的值

### 3. 获取 anon/public key

在 "Project API keys" 部分：

1. 找到 **"anon"** 或 **"public"** key
2. 默认情况下 key 是隐藏的（显示为 `••••••••`）
3. 点击右侧的 **"Reveal"** 按钮显示完整 key
4. 复制整个 key（通常以 `eyJ...` 开头）
5. 这就是 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 的值

### 4. 获取 service_role key

在同一个 "Project API keys" 部分：

1. 找到 **"service_role"** key
2. ⚠️ **重要警告**: 这个 key 有完整数据库权限，**永远不要**暴露在前端代码中
3. 点击 **"Reveal"** 按钮显示完整 key
4. 复制整个 key
5. 这就是 `SUPABASE_SERVICE_ROLE_KEY` 的值

### 5. 创建 .env.local 文件

在项目根目录运行：

```bash
# 复制模板
cp .env.local.template .env.local

# 编辑文件，填入你刚才复制的 keys
# 可以使用任何文本编辑器，或运行：
code .env.local  # VS Code
# 或
nano .env.local  # 命令行编辑器
```

### 6. 验证配置

运行配置检查：

```bash
pnpm run check-config
```

应该看到所有必需变量都已配置 ✅

## 快速链接

- **API Settings**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/settings/api
- **SQL Editor**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/editor

## 下一步

配置好环境变量后：

1. **初始化数据库**：在 SQL Editor 中运行 `supabase/schema.sql`
2. **验证配置**：运行 `pnpm run check-config`
3. **启动项目**：运行 `pnpm dev`


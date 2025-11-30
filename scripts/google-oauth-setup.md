# Google OAuth 配置指南

## 在 Supabase 中配置 Google OAuth

### 步骤 1: 在 Google Cloud Console 创建 OAuth 2.0 凭证

**💰 完全免费！** OAuth 2.0 凭证创建和使用都是免费的。

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目（免费）
3. **注意**：现代 OAuth 2.0 不需要启用 Google+ API（该 API 已弃用）
   - 可以直接创建 OAuth 凭证，无需启用额外 API
4. 创建 OAuth 2.0 凭证：
   - 进入 "APIs & Services" > "Credentials"
   - 点击 "Create Credentials" > "OAuth client ID"
   - 如果是第一次创建，需要先配置 OAuth 同意屏幕：
     - 选择 "External"（外部用户）
     - 填写应用名称：`InfoMatrix`
     - **应用描述**：请参考 `scripts/google-oauth-app-description.md` 中的详细描述
     - 添加你的邮箱作为支持邮箱和开发者联系邮箱
     - 配置应用主页 URL（如果有）
     - 保存并继续
     - **详细的应用描述模板**：查看 `scripts/google-oauth-app-description.md`
   - 选择 "Web application"
   - 配置授权重定向 URI：
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
     （将 `your-project-id` 替换为你的 Supabase 项目 ID）
   - 点击 "Create"
   - 复制 **Client ID** 和 **Client Secret**

### 步骤 2: 在 Supabase Dashboard 配置 Google Provider

**⚠️ 重要：这是解决 "provider is not enabled" 错误的关键步骤！**

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Authentication** > **Providers**
   - 左侧菜单：点击 "Authentication" > "Providers"
   - 或直接访问：`https://app.supabase.com/project/your-project-id/auth/providers`
4. 找到 **Google** provider
   - 在 Provider 列表中，找到 "Google" 选项
5. **启用 Google Provider**：
   - 点击 Google provider 右侧的 **Toggle Switch** 或 **Enable** 按钮
   - 确保开关是 **ON** 状态（绿色/蓝色）
6. 填入 OAuth 凭证：
   - **Client ID (for OAuth)**: 从 Google Cloud Console 复制的 Client ID
   - **Client Secret (for OAuth)**: 从 Google Cloud Console 复制的 Client Secret
7. 点击 **Save** 保存配置

**注意**：如果 Google provider 显示为禁用状态（灰色），即使填写了 Client ID 和 Secret，也会出现 "provider is not enabled" 错误。必须确保开关是启用状态！

### 步骤 3: 配置重定向 URL

在 Supabase Dashboard 中：
1. 进入 **Authentication** > **URL Configuration**
2. 在 **Redirect URLs** 中添加：
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```
   （替换 `your-domain.com` 为你的实际域名）

### 步骤 4: 测试登录

1. 启动开发服务器：`pnpm dev`
2. 点击侧边栏的登录按钮
3. 应该会重定向到 Google 登录页面
4. 登录后会自动重定向回应用

## 故障排除

### 常见问题

1. **"Unsupported provider: provider is not enabled" 错误** ⚠️
   - **原因**：在 Supabase Dashboard 中没有启用 Google provider
   - **解决方法**：
     1. 进入 Supabase Dashboard > Authentication > Providers
     2. 找到 Google provider
     3. **确保开关是启用状态（ON）**
     4. 填写 Client ID 和 Client Secret
     5. 点击 Save
   - **验证**：刷新页面后，Google provider 应该显示为启用状态

2. **"redirect_uri_mismatch" 错误**
   - 确保 Google Cloud Console 中的重定向 URI 与 Supabase 配置一致
   - 格式应为：`https://your-project-id.supabase.co/auth/v1/callback`
   - 在 Google Cloud Console 中添加此 URI 到 "Authorized redirect URIs"

3. **登录后没有重定向**
   - 检查 `/auth/callback` 路由是否正确配置
   - 检查 Supabase 的 Redirect URLs 配置
   - 在 Supabase Dashboard > Authentication > URL Configuration 中添加：
     - `http://localhost:3000/auth/callback` (开发环境)
     - `https://your-domain.com/auth/callback` (生产环境)

4. **用户信息不显示**
   - 检查 Supabase Auth 设置中的用户元数据配置
   - 确保 Google OAuth 返回了用户信息

## 费用说明

### Google Cloud Console 费用

**好消息：基本 OAuth 登录功能完全免费！**

1. **Google Cloud Console 账户**：免费
   - 创建 Google Cloud 项目：免费
   - 创建 OAuth 2.0 凭证：免费
   - 基本 OAuth 登录功能：免费

2. **免费配额**：
   - OAuth 2.0 登录请求：**无限制**（免费）
   - 用户认证：**无限制**（免费）
   - Google+ API（如果启用）：有免费配额，通常足够使用

3. **可能产生费用的情况**：
   - 如果启用了其他 Google API（如 Google Maps API、YouTube Data API 等）
   - 超出免费配额的使用量
   - 对于**仅用于用户登录的 OAuth**，通常不会产生费用

4. **建议**：
   - 只启用必要的 API（OAuth 2.0 不需要启用额外 API）
   - 在 Google Cloud Console 中设置预算提醒
   - 监控 API 使用情况

### Supabase 费用

- Supabase 免费版支持 OAuth 登录
- 用户认证功能在免费版中完全可用
- 无需升级即可使用 Google 登录

## 环境变量

无需额外的环境变量，所有配置都在 Supabase Dashboard 中完成。

# Google OAuth Application Description

## 用于 Google Cloud Console OAuth 同意屏幕配置

### Application Name (应用名称)
```
InfoMatrix
```

### Application Description (应用描述 - 英文版)

**InfoMatrix** is a serverless multi-agent content intelligence platform designed to help content creators efficiently acquire, analyze, and distribute information across multiple platforms.

**Core Functionality:**
- **Intelligent Content Ingestion**: Automatically collects and processes content from various sources (YouTube, Twitter, RSS feeds) to help users stay informed about topics of interest
- **Knowledge Gap Analysis**: Uses advanced vector space analysis and AI to identify knowledge gaps in users' personal knowledge base, providing personalized content recommendations
- **Adaptive Content Generation**: Generates platform-specific content with AI assistance, adapting writing styles for different social media platforms
- **Conversational AI Interface**: Provides an intelligent chat interface powered by OpenAI GPT models for real-time information queries and content assistance

**User Authentication:**
InfoMatrix uses Google OAuth to provide secure, seamless user authentication. When you sign in with your Google account, we only access your basic profile information (email address and name) to:
- Create and manage your user account
- Personalize your experience
- Save your content preferences and search history
- Enable secure access to your personal data

**Data Usage:**
- We store your email address and profile information to maintain your account
- Your search queries and conversation history are stored securely in our database
- Content you generate is saved to your personal library for future reference
- We do not share your personal information with third parties
- All data is encrypted and stored securely using Supabase (PostgreSQL)

**Privacy & Security:**
- All user data is stored securely in Supabase with encryption at rest
- We use industry-standard OAuth 2.0 for secure authentication
- Your data is only accessible to you and is never shared without your explicit consent
- You can delete your account and all associated data at any time

**Technical Architecture:**
- Built on Next.js 14 with Server Components for optimal performance
- Deployed on Vercel's edge network for global scalability
- Uses Supabase for secure data storage and authentication
- Integrates with OpenAI API for AI-powered features

---

### Application Description (应用描述 - 中文版)

**InfoMatrix** 是一个基于 Serverless 架构的多智能体内容情报平台，旨在帮助内容创作者高效地获取、分析和分发信息。

**核心功能：**
- **智能内容采集**：自动从多个来源（YouTube、Twitter、RSS 订阅）收集和处理内容，帮助用户及时了解感兴趣的话题
- **知识缺口分析**：使用先进的向量空间分析和 AI 技术，识别用户个人知识库中的盲区，提供个性化的内容推荐
- **自适应内容生成**：通过 AI 辅助生成平台特定的内容，针对不同社交媒体平台调整写作风格
- **对话式 AI 界面**：提供由 OpenAI GPT 模型驱动的智能对话界面，支持实时信息查询和内容辅助

**用户认证：**
InfoMatrix 使用 Google OAuth 提供安全、无缝的用户认证。当您使用 Google 账号登录时，我们仅访问您的基本资料信息（电子邮件地址和姓名），用于：
- 创建和管理您的用户账户
- 个性化您的使用体验
- 保存您的内容偏好和搜索历史
- 确保您个人数据的安全访问

**数据使用：**
- 我们存储您的电子邮件地址和资料信息以维护您的账户
- 您的搜索查询和对话历史安全地存储在数据库中
- 您生成的内容会保存到您的个人库中，供将来参考
- 我们不会与第三方共享您的个人信息
- 所有数据均经过加密，并使用 Supabase (PostgreSQL) 安全存储

**隐私与安全：**
- 所有用户数据均使用 Supabase 加密存储
- 我们使用行业标准的 OAuth 2.0 进行安全认证
- 您的数据仅对您可见，未经您明确同意不会共享
- 您可以随时删除您的账户和所有相关数据

**技术架构：**
- 基于 Next.js 14 构建，使用 Server Components 实现最优性能
- 部署在 Vercel 边缘网络上，实现全球可扩展性
- 使用 Supabase 进行安全的数据存储和认证
- 集成 OpenAI API 提供 AI 驱动的功能

---

## OAuth 同意屏幕配置字段

### App name (应用名称)
```
InfoMatrix
```

### User support email (用户支持邮箱)
```
你的邮箱地址（例如：your-email@example.com）
```

### Developer contact information (开发者联系信息)
```
你的邮箱地址（例如：your-email@example.com）
```

### App logo (应用图标)
```
可选：上传 InfoMatrix 的 logo（如果有）
```

### Application home page (应用主页)
```
https://your-domain.com
或
http://localhost:3000（开发环境）
```

### Application privacy policy link (隐私政策链接)
```
https://your-domain.com/privacy
或
http://localhost:3000/privacy（开发环境）
```

### Application terms of service link (服务条款链接)
```
https://your-domain.com/terms
或
http://localhost:3000/terms（开发环境）
```

### Authorized domains (授权域名)
```
your-domain.com
localhost（开发环境）
```

### Scopes (权限范围)
选择以下权限：
- ✅ **email**: 访问用户的电子邮件地址
- ✅ **profile**: 访问用户的基本资料信息（姓名、头像等）
- ❌ **openid**: 通常会自动包含，无需单独选择

**注意**：只请求必要的权限。对于基本的用户登录，只需要 `email` 和 `profile` 权限即可。

---

## 快速配置清单

- [ ] 填写应用名称：InfoMatrix
- [ ] 填写应用描述（使用上面的英文或中文版本）
- [ ] 设置用户支持邮箱
- [ ] 设置开发者联系邮箱
- [ ] 配置应用主页 URL
- [ ] 配置隐私政策链接（可选，但推荐）
- [ ] 配置服务条款链接（可选）
- [ ] 添加授权域名
- [ ] 选择权限范围（email, profile）
- [ ] 保存配置

---

## 注意事项

1. **隐私政策和服务条款**：如果应用需要发布到生产环境，建议创建隐私政策和服务条款页面
2. **测试用户**：在开发阶段，可以添加测试用户邮箱，无需通过 Google 审核
3. **应用状态**：开发阶段选择 "Testing"，生产环境需要提交审核
4. **权限最小化**：只请求必要的权限，避免请求过多权限导致审核被拒

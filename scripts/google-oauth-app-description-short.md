# Google OAuth 应用描述 - 简化版（直接复制使用）

## 英文版（推荐用于 Google Cloud Console）

```
InfoMatrix is a serverless multi-agent content intelligence platform designed to help content creators efficiently acquire, analyze, and distribute information across multiple platforms.

Core Features:
- Intelligent Content Ingestion: Automatically collects and processes content from various sources (YouTube, Twitter, RSS feeds)
- Knowledge Gap Analysis: Uses AI-powered vector space analysis to identify knowledge gaps and provide personalized recommendations
- Adaptive Content Generation: Generates platform-specific content with AI assistance
- Conversational AI Interface: Provides real-time AI-powered chat for information queries and content assistance

User Authentication:
InfoMatrix uses Google OAuth for secure authentication. We only access your basic profile information (email and name) to create and manage your account, personalize your experience, and securely store your preferences and content.

Privacy & Security:
- All user data is encrypted and stored securely
- We use industry-standard OAuth 2.0 for authentication
- Your data is only accessible to you
- You can delete your account and data at any time
```

## 中文版（备选）

```
InfoMatrix 是一个基于 Serverless 架构的多智能体内容情报平台，旨在帮助内容创作者高效地获取、分析和分发信息。

核心功能：
- 智能内容采集：自动从多个来源（YouTube、Twitter、RSS）收集和处理内容
- 知识缺口分析：使用 AI 驱动的向量空间分析识别知识盲区，提供个性化推荐
- 自适应内容生成：通过 AI 辅助生成平台特定的内容
- 对话式 AI 界面：提供实时 AI 对话功能，支持信息查询和内容辅助

用户认证：
InfoMatrix 使用 Google OAuth 进行安全认证。我们仅访问您的基本资料信息（电子邮件和姓名），用于创建和管理账户、个性化体验以及安全存储您的偏好和内容。

隐私与安全：
- 所有用户数据均经过加密并安全存储
- 我们使用行业标准的 OAuth 2.0 进行认证
- 您的数据仅对您可见
- 您可以随时删除账户和数据
```

## 使用说明

1. **复制上面的英文版或中文版描述**
2. **粘贴到 Google Cloud Console 的 OAuth 同意屏幕配置中**
3. **位置**：APIs & Services > OAuth consent screen > App information > App description

## 其他必填字段

### App name (应用名称)
```
InfoMatrix
```

### User support email (用户支持邮箱)
```
填写你的邮箱地址
```

### Developer contact information (开发者联系信息)
```
填写你的邮箱地址
```

### Scopes (权限范围)
只选择以下必要权限：
- ✅ **email** - 访问用户的电子邮件地址
- ✅ **profile** - 访问用户的基本资料信息

**注意**：不要选择其他不必要的权限，这可能导致审核被拒。

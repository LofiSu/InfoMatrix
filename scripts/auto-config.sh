#!/bin/bash

# InfoMatrix Auto Configuration Script
# 自动配置 Supabase 环境变量

echo "🔧 InfoMatrix 自动配置脚本"
echo "================================"
echo ""

# 检查 .env.local 是否已存在
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local 文件已存在"
    read -p "是否覆盖? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "❌ 已取消"
        exit 0
    fi
fi

# 项目 ID
PROJECT_ID="jpgvzeqfoagsjmmokhge"
SUPABASE_URL="https://${PROJECT_ID}.supabase.co"

echo "📋 请从 Supabase Dashboard 获取以下信息："
echo "   项目 URL: $SUPABASE_URL"
echo "   Dashboard: https://supabase.com/dashboard/project/${PROJECT_ID}/settings/api"
echo ""

# 获取 Supabase Keys
read -p "请输入 NEXT_PUBLIC_SUPABASE_ANON_KEY: " ANON_KEY
read -p "请输入 SUPABASE_SERVICE_ROLE_KEY: " SERVICE_ROLE_KEY

# 获取 OpenAI API Key
read -p "请输入 OPENAI_API_KEY (可选，按 Enter 跳过): " OPENAI_KEY

# 生成 Cron Secret
CRON_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "change-this-secret-$(date +%s)")

# 创建 .env.local 文件
cat > .env.local << EOF
# Supabase Configuration
# Project: $PROJECT_ID
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY

# OpenAI API
OPENAI_API_KEY=${OPENAI_KEY:-sk-your-openai-api-key-here}

# Vercel Cron Secret
CRON_SECRET=$CRON_SECRET

# Optional: External APIs
YOUTUBE_API_KEY=
TWITTER_BEARER_TOKEN=
EOF

echo ""
echo "✅ .env.local 文件已创建！"
echo ""
echo "📝 下一步："
echo "   1. 在 Supabase Dashboard 中运行 supabase/schema.sql"
echo "   2. 运行: pnpm run check-config 验证配置"
echo "   3. 运行: pnpm dev 启动开发服务器"
echo ""


-- InfoMatrix Database Initialization Script
-- 在 Supabase SQL Editor 中运行此脚本
-- 链接: https://supabase.com/dashboard/project/jpgvzeqfoagsjmmokhge/sql/new

-- 首先启用 pgvector 扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 然后运行完整的 schema
-- (复制 supabase/schema.sql 的内容到这里，或直接运行 schema.sql)

-- 验证扩展是否启用
SELECT * FROM pg_extension WHERE extname = 'vector';

-- 验证表是否创建成功
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('sources', 'intelligence', 'creations', 'user_preferences');


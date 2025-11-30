-- InfoMatrix Database Schema
-- PostgreSQL with pgvector extension for vector similarity search

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Sources Table: Subscribed content sources
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('youtube', 'twitter', 'rss')),
    identifier VARCHAR(255) NOT NULL, -- Channel ID, Handle, or RSS URL
    display_name VARCHAR(255),
    last_scanned_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, platform, identifier)
);

-- 2. Intelligence Table: Raw and intermediate metadata representation
CREATE TABLE IF NOT EXISTS intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    external_id VARCHAR(255), -- YouTube video ID, Tweet ID, etc.
    
    -- Intermediate Metadata Representation (IMR) - JSONB for flexibility
    imr_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    /*
    IMR Structure:
    {
        "source_type": "video",
        "core_concepts": ["Agentic Workflow", "RAG Optimization"],
        "sentiment_score": 0.85,
        "key_quotes": [
            {"timestamp": "04:20", "text": "..."}
        ],
        "complexity_level": "high",
        "title": "...",
        "description": "..."
    }
    */
    
    -- Vector embedding for RAG (1536 dimensions - OpenAI standard)
    embedding VECTOR(1536),
    
    -- Metadata
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(source_id, external_id)
);

-- 3. Creations Table: Generated content for different platforms
CREATE TABLE IF NOT EXISTS creations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intelligence_id UUID REFERENCES intelligence(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    target_platform VARCHAR(20) NOT NULL CHECK (target_platform IN ('xiaohongshu', 'twitter', 'linkedin', 'weibo')),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'reviewing', 'published', 'archived')),
    
    -- Generated content
    content_body TEXT NOT NULL,
    visual_keywords TEXT[], -- For cover image generation
    temporal_anchors JSONB, -- Preserved timestamp anchors for fact-checking
    
    -- User feedback for RLHF optimization
    user_feedback_rating INT CHECK (user_feedback_rating >= 1 AND user_feedback_rating <= 5),
    user_feedback_notes TEXT,
    
    -- Metadata
    published_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- 4. User Preferences Table: SOP prompts and style preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    
    -- Platform-specific SOP prompts (JSONB)
    platform_prompts JSONB DEFAULT '{}'::jsonb,
    /*
    Structure:
    {
        "xiaohongshu": "Custom prompt for Xiaohongshu...",
        "twitter": "Custom prompt for Twitter..."
    }
    */
    
    -- Knowledge gap analysis thresholds
    knowledge_gap_alpha FLOAT DEFAULT 0.3, -- Threshold for "known" content
    knowledge_gap_beta FLOAT DEFAULT 0.7, -- Threshold for "relevant" content
    
    -- Other preferences
    preferred_language VARCHAR(10) DEFAULT 'zh-CN',
    auto_generate BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance optimization

-- Sources indexes
CREATE INDEX IF NOT EXISTS idx_sources_user_id ON sources(user_id);
CREATE INDEX IF NOT EXISTS idx_sources_platform ON sources(platform);
CREATE INDEX IF NOT EXISTS idx_sources_active ON sources(is_active) WHERE is_active = true;

-- Intelligence indexes
CREATE INDEX IF NOT EXISTS idx_intelligence_source_id ON intelligence(source_id);
CREATE INDEX IF NOT EXISTS idx_intelligence_external_id ON intelligence(external_id);
CREATE INDEX IF NOT EXISTS idx_intelligence_created_at ON intelligence(created_at DESC);

-- Vector similarity search index (HNSW for fast approximate nearest neighbor)
CREATE INDEX IF NOT EXISTS idx_intelligence_embedding ON intelligence 
    USING hnsw (embedding vector_cosine_ops);

-- Creations indexes
CREATE INDEX IF NOT EXISTS idx_creations_intelligence_id ON creations(intelligence_id);
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);
CREATE INDEX IF NOT EXISTS idx_creations_status ON creations(status);
CREATE INDEX IF NOT EXISTS idx_creations_platform ON creations(target_platform);

-- User preferences index
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Function: Vector similarity search (RPC for client-side calls)
CREATE OR REPLACE FUNCTION match_intelligence(
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10,
    user_id_filter UUID DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    source_id UUID,
    original_url TEXT,
    imr_data JSONB,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        i.id,
        i.source_id,
        i.original_url,
        i.imr_data,
        1 - (i.embedding <=> query_embedding) AS similarity
    FROM intelligence i
    JOIN sources s ON i.source_id = s.id
    WHERE 
        i.embedding IS NOT NULL
        AND (user_id_filter IS NULL OR s.user_id = user_id_filter)
        AND (1 - (i.embedding <=> query_embedding)) >= match_threshold
    ORDER BY i.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intelligence_updated_at BEFORE UPDATE ON intelligence
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creations_updated_at BEFORE UPDATE ON creations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Conversations Table: Chat conversation sessions
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255), -- Auto-generated or user-defined
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Conversation Messages Table: Individual messages in conversations
CREATE TABLE IF NOT EXISTS conversation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- Store additional info (sources, tokens, etc.)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conversation_id ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_messages_created_at ON conversation_messages(created_at);

-- Trigger for conversations updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


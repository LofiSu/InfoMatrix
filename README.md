# InfoMatrix

<div align="center">

**Serverless Multi-Agent Content Intelligence Platform**

一个基于 Serverless 架构与多智能体协作的自适应内容情报系统

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue)](https://www.python.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Academic-orange)](LICENSE)

</div>

---

## 📑 Table of Contents / 目录

- [English](#english)
- [中文](#中文)

---

# English

## 🎯 Project Overview

**InfoMatrix** is a cloud-native, serverless multi-agent content intelligence platform designed to solve content creators' efficiency bottlenecks in heterogeneous information acquisition, knowledge internalization, and multi-platform distribution.

Unlike simple automation scripts, InfoMatrix is an intelligent system with **Perception, Cognition, and Action** capabilities, forming a complete intelligent closed-loop.

### Core Value Proposition

- **Intelligent Information Ingestion**: Automatically collect and process content from multiple sources (YouTube, Twitter, RSS)
- **Knowledge Gap Analysis**: Identify content gaps in your knowledge base using vector space analysis
- **Adaptive Content Generation**: Generate platform-specific content with style transfer and fact-checking
- **Serverless Architecture**: Zero infrastructure management, auto-scaling, edge-deployed

### Engineering Complexity (D1)

The system addresses complex engineering problems:
- **Heterogeneous Data Mapping**: Converting unstructured streaming media (YouTube video streams) to structured knowledge graphs
- **Multi-Model Orchestration**: Coordinating multiple LLMs under high concurrency
- **Cross-Platform Adaptation**: Transforming content across different platform topologies

### Technical Innovation (D4)

- **Serverless Computing**: Leveraging Vercel's edge network for global deployment
- **RAG Technology**: Retrieval-Augmented Generation with vector database integration
- **Hybrid Runtime**: Simultaneous Python and Node.js execution in a single project

---

## 🏗️ System Architecture

### Logical Architecture

The system adopts an **Event-Driven** microservices architecture deployed on Vercel's edge network:

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction Layer                    │
│              (Next.js Client App - React 18+)                │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              Gateway & Routing Layer                        │
│              (Vercel Edge Network)                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│         Agent Orchestration Layer (Hybrid Runtime)         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Radar Agent  │  │ Brain Agent  │  │ Matrix Agent│   │
│  │   (Python)   │  │  (Python)    │  │   (Node.js)   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                  │                  │           │
│         └──────────────────┴──────────────────┘           │
│                    │              │                        │
│         ┌──────────▼──┐  ┌───────▼────────┐              │
│         │ Transcriber │  │ LLM Inference │              │
│         │   Service   │  │    Engine      │              │
│         └─────────────┘  └────────────────┘              │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│         Persistence Layer (Supabase PostgreSQL)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Raw Metadata│  │  pgvector    │  │  JSON Store  │     │
│  │  (PostgreSQL)│  │ (Embeddings) │  │ (SOP Prompts)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    External Ecosystems                      │
│         YouTube API │ Twitter API │ RSS Feeds               │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Layer
- **Framework**: Next.js 14 (App Router) with Server Components for optimal performance
- **UI System**: Shadcn/UI + Tailwind CSS for modern SaaS aesthetics
- **State Management**: 
  - Zustand (client-side state)
  - TanStack Query (server state synchronization)
- **Streaming**: Vercel AI SDK (RSC) for real-time LLM response streaming

#### Backend Layer (Serverless)
- **Hybrid Runtime**: 
  - Python 3.9+ (FastAPI) for AI-intensive tasks
  - Node.js (Edge) for high-frequency IO and authentication
- **AI Frameworks**: 
  - LangChain / LangGraph for agent reasoning loops
  - OpenAI API for embeddings and generation
- **Data Processing**: 
  - youtube-transcript-api for video subtitle extraction
  - Pydantic for strict data validation

#### Data Layer
- **Primary Database**: Supabase (PostgreSQL)
- **Vector Engine**: pgvector extension (no external vector DB needed)
- **Authentication**: Supabase Auth (JWT-based)
- **Vector Dimensions**: 1536 (OpenAI text-embedding-3-small standard)

---

## 🤖 Core Agents

### 1. Radar Agent: Intelligence Collection & Cleaning

**Location**: `/api/py/radar/route.py`

**Function**: Transforms heterogeneous external information streams into standardized intermediate-state data.

#### Workflow

1. **Cron Trigger**: Vercel Cron triggers `/api/cron/ingest` hourly
2. **Diff Check**: Detects new content IDs from subscribed sources
3. **De-noising Process**:
   - Fetches transcript/text content
   - Removes filler words ("um", "you know")
   - Filters advertisement segments
   - Preprocesses using LLM-based filtering
4. **Schema Mapping** (Core Patent Point):
   - Maps content to **IMR (Intermediate Metadata Representation)** structure:

```json
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
```

#### Technical Highlights

- **Intermediate Semantic Tree Mapping**: Not simple translation, but dimension reduction to structured semantic tree (IMR), then dimension elevation for platform-specific rendering
- **Event-Driven Ingestion**: Asynchronous processing with queue management
- **Multi-Source Support**: YouTube, Twitter/X, RSS feeds

---

### 2. Brain Agent: Knowledge Vectorization & Gap Analysis

**Location**: `/api/py/brain/route.py`

**Function**: "Inspiration Collision" mechanism based on vector space distance.

#### Algorithm Logic

1. **Embedding Generation**: 
   - Uses `text-embedding-3-small` model
   - Converts IMR data to 1536-dimensional vectors

2. **Knowledge Gap Analysis** (Core Patent Point):
   - Define user's historical knowledge vector set: $U = \{v_1, v_2, ...\}$
   - Define new intelligence vector: $n$
   - Calculate minimum distance: $d_{min} = \min_{v \in U} \text{distance}(n, v)$
   - **Classification Logic**:
     - If $d_{min} < \alpha$ (threshold ≈ 0.3): **Known/Repeated Content** → Ignore
     - If $\alpha < d_{min} < \beta$ (threshold ≈ 0.7): **Relevant but Unexplored** → Generate recommendation
     - If $d_{min} > \beta$: **Irrelevant Domain** → Ignore

#### Vector Space Envelope Analysis

This implements the "Vector Space Envelope Analysis" method:
- Not based on popularity/trending
- Based on personal knowledge base "blind spots" (Gap Detection)
- Personalized and intelligent recommendation system

#### Cosine Similarity Calculation

```python
def calculate_semantic_distance(vector_a: List[float], vector_b: List[float]) -> float:
    """
    Calculates cosine similarity distance between two embedding vectors.
    Returns: 0 = identical, 1 = orthogonal
    """
    # Implementation uses numpy dot product and norm calculation
    return 1 - dot(vector_a, vector_b) / (norm(vector_a) * norm(vector_b))
```

---

### 3. Matrix Agent: Multi-Modal Style Transfer

**Location**: `/api/py/matrix/route.py`

**Function**: Adaptive content generation based on Prompt Chain.

#### Implementation

1. **Context Injection**: Injects IMR data as context into LLM
2. **Style Routing**: Loads platform-specific System Prompts:
   - **Xiaohongshu Strategy**: 
     - Emoji-rich content
     - Short paragraphs
     - Visual keywords for cover image generation
   - **Twitter Strategy**: 
     - Thread structure
     - Hook sentences
     - Concise format
3. **Fact Checking (Source Tracing)**: 
   - Preserves temporal anchors (e.g., `[04:20]`) in generated content
   - Clickable timestamps linking to original video
   - Ensures content accuracy and traceability

#### Adaptive Style Transfer Method

- **Prompt Chain Architecture**: Multi-step generation process
- **Platform Topology Mapping**: Different rendering strategies per platform
- **Temporal Anchor Preservation**: Maintains source traceability

---

## 📊 Database Schema

### Tables Overview

#### 1. `sources` - Subscribed Content Sources

```sql
CREATE TABLE sources (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    platform VARCHAR(20) CHECK (platform IN ('youtube', 'twitter', 'rss')),
    identifier VARCHAR(255) NOT NULL,  -- Channel ID, Handle, or RSS URL
    display_name VARCHAR(255),
    last_scanned_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);
```

#### 2. `intelligence` - Raw & Intermediate Metadata

```sql
CREATE TABLE intelligence (
    id UUID PRIMARY KEY,
    source_id UUID REFERENCES sources(id),
    original_url TEXT NOT NULL,
    external_id VARCHAR(255),  -- YouTube video ID, Tweet ID, etc.
    
    -- Intermediate Metadata Representation (IMR) - JSONB
    imr_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Vector embedding for RAG (1536 dimensions)
    embedding VECTOR(1536),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `creations` - Generated Content

```sql
CREATE TABLE creations (
    id UUID PRIMARY KEY,
    intelligence_id UUID REFERENCES intelligence(id),
    user_id UUID REFERENCES auth.users(id),
    target_platform VARCHAR(20),  -- 'xiaohongshu', 'twitter', etc.
    status VARCHAR(20) DEFAULT 'draft',
    
    content_body TEXT NOT NULL,
    visual_keywords TEXT[],
    temporal_anchors JSONB,  -- Preserved timestamp anchors
    
    user_feedback_rating INT,  -- For RLHF optimization
    published_url TEXT
);
```

#### 4. `user_preferences` - User SOP & Settings

```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    
    -- Platform-specific SOP prompts (JSONB)
    platform_prompts JSONB DEFAULT '{}'::jsonb,
    
    -- Knowledge gap analysis thresholds
    knowledge_gap_alpha FLOAT DEFAULT 0.3,
    knowledge_gap_beta FLOAT DEFAULT 0.7,
    
    preferred_language VARCHAR(10) DEFAULT 'zh-CN',
    auto_generate BOOLEAN DEFAULT false
);
```

### Vector Search Function

```sql
CREATE FUNCTION match_intelligence(
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
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (package manager - required)
- **Python** 3.9+
- **Supabase** account (free tier available)
- **OpenAI API** key

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/LofiSu/InfoMatrix.git
cd InfoMatrix
```

#### 2. Install Dependencies

```bash
# Install Node.js dependencies
pnpm install

# Install Python dependencies
pip install -r requirements.txt
```

#### 3. Environment Configuration

Create `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key-here

# Vercel Cron Secret (generate a random string)
CRON_SECRET=your-random-secret-here

# Optional: External APIs
YOUTUBE_API_KEY=your-youtube-api-key-here
TWITTER_BEARER_TOKEN=your-twitter-bearer-token-here
```

#### 4. Database Setup

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Go to SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script
5. Verify `pgvector` extension is enabled

#### 5. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
InfoMatrix/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   └── api/                      # API routes (Node.js)
│
├── api/                          # Serverless API routes
│   ├── py/                       # Python runtime agents
│   │   ├── radar/                # Radar Agent
│   │   │   └── route.py          # Intelligence collection
│   │   ├── brain/                # Brain Agent
│   │   │   └── route.py          # Knowledge gap analysis
│   │   └── matrix/               # Matrix Agent
│   │       └── route.py          # Content generation
│   └── cron/                     # Cron job triggers
│       └── ingest/               # Hourly ingestion trigger
│           └── route.ts
│
├── components/                   # React components
│   ├── ui/                       # Shadcn base components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── features/                 # Feature-specific components
│
├── lib/                          # Utility functions
│   ├── supabase/                 # Supabase clients
│   │   ├── server.ts             # Server-side client
│   │   └── client.ts             # Client-side client
│   ├── utils.ts                  # General utilities
│   └── constants.ts              # App constants
│
├── types/                        # TypeScript type definitions
│   ├── database.ts               # Database types
│   └── api.ts                    # API request/response types
│
├── supabase/                     # Database related
│   └── schema.sql                # Complete database schema
│
├── middleware.ts                 # Next.js middleware (auth)
├── vercel.json                   # Vercel configuration
├── package.json                  # Node.js dependencies
├── requirements.txt              # Python dependencies
└── README.md                     # This file
```

---

## 🔧 Development Guidelines

### Code Standards

- **Type Safety**: Strict TypeScript mode, Python type hints required
- **Modularity**: Separate algorithm logic from API handlers
- **Documentation**: Complex algorithms must include methodology docstrings
- **Academic Terminology**: Use academic terms in comments

### Key Principles

1. **Event-Driven Architecture**: All agents communicate via events
2. **Serverless First**: Design for stateless, scalable functions
3. **Type Safety**: Full type coverage in TypeScript and Python
4. **Error Handling**: Graceful error handling with specific HTTP status codes

### Running Tests

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build verification
pnpm run build
```

---

## 🎓 Academic & Patent Applications

This system implements two core methodologies suitable for academic thesis and patent documentation:

### 1. Intermediate Semantic Tree (IMR) Mapping Method

**Patent Core Point**: Cross-platform content reconstruction method

- **Not simple translation**: System reduces unstructured data to structured semantic tree (IMR), then elevates dimensions for platform-specific rendering
- **Topology-aware**: Different platform structures require different rendering strategies
- **Traceability**: Maintains source links and temporal anchors

### 2. Vector Space Envelope Analysis Method

**Patent Core Point**: Knowledge gap discovery mechanism

- **Not popularity-based**: Recommendations based on personal knowledge base "blind spots"
- **Personalized**: Each user has unique knowledge vector space
- **Intelligent**: Automatic threshold adjustment based on user feedback (RLHF)

### Documentation Standards

All complex algorithms (especially in Python Agents) include:
- **Methodology Docstrings**: Explaining the "why" and "how"
- **Academic Terminology**: 
  - "Calculate Semantic Entropy" instead of "Find trending topics"
  - "Map to Intermediate Metadata Structure" instead of "Convert format"
- **Modular Design**: Algorithm logic separated from API handlers for easy patent extraction

---

## 📈 Roadmap

### Phase 1: Foundation (✅ Completed)
- [x] Next.js 14 + Supabase environment setup
- [x] Python script integration with OpenAI API
- [x] pgvector database schema

### Phase 2: Data Collection (🚧 In Progress)
- [ ] YouTube/Twitter Serverless crawler
- [ ] De-noising module (Radar Agent)
- [ ] IMR mapping implementation

### Phase 3: Core Algorithms (📋 Planned)
- [ ] RAG retrieval implementation
- [ ] Knowledge gap recommendation (Brain Agent)
- [ ] Vector similarity search optimization

### Phase 4: Productization (📋 Planned)
- [ ] Web interface development
- [ ] Vercel AI SDK streaming integration
- [ ] Matrix Agent content generation
- [ ] User feedback system (RLHF)

### Phase 5: Documentation (📋 Planned)
- [ ] Patent disclosure document
- [ ] Academic thesis (Chapter 3: System Design)
- [ ] API documentation

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Issue Guide](.github/ISSUE_GUIDE.md) before submitting PRs or issues.

Quick start:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed guidelines, see:
- [Contributing Guide](CONTRIBUTING.md) - How to contribute code
- [Issue Guide](.github/ISSUE_GUIDE.md) - How to submit issues
- [Foundation Tasks](.github/FOUNDATION_TASKS.md) - Current development tasks

---

## 📄 License

This project is for academic and research purposes.

---

## 👤 Author

**LofiSu**

- GitHub: [@LofiSu](https://github.com/LofiSu)
- Email: 3577995715@qq.com

---

# 中文

## 🎯 项目概述

**InfoMatrix** 是一个云原生、无服务器的多智能体内容情报平台，旨在解决内容创作者在异构信息获取、知识内化与多平台分发过程中的效率瓶颈。

与简单的自动化脚本不同，InfoMatrix 是一个具备**感知（Perception）、认知（Cognition）、行动（Action）**能力的智能系统，形成完整的智能闭环。

### 核心价值主张

- **智能信息采集**：自动从多个来源（YouTube、Twitter、RSS）收集和处理内容
- **知识缺口分析**：使用向量空间分析识别知识库中的内容盲区
- **自适应内容生成**：通过风格迁移和事实检查生成平台特定内容
- **Serverless 架构**：零基础设施管理，自动扩展，边缘部署

### 工程复杂性 (D1)

系统解决复杂的工程问题：
- **异构数据映射**：将非结构化流媒体（YouTube 视频流）转换为结构化知识图谱
- **多模型编排**：在高并发下协调多个 LLM
- **跨平台适配**：在不同平台拓扑结构间转换内容

### 技术创新 (D4)

- **Serverless 计算**：利用 Vercel 边缘网络实现全球部署
- **RAG 技术**：检索增强生成与向量数据库深度融合
- **混合运行时**：在同一项目中同时执行 Python 和 Node.js

---

## 🏗️ 系统架构

### 逻辑架构

系统采用**事件驱动（Event-Driven）**的微服务架构，部署于 Vercel 边缘网络：

```
┌─────────────────────────────────────────────────────────────┐
│                    用户交互层                                 │
│              (Next.js 客户端应用 - React 18+)                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              网关与路由层                                      │
│              (Vercel 边缘网络)                                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│         智能体编排层（混合运行时）                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ 雷达智能体   │  │ 大脑智能体   │  │ 矩阵智能体   │       │
│  │   (Python)   │  │  (Python)   │  │  (Node.js)   │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                    │              │                           │
│         ┌──────────▼──┐  ┌───────▼────────┐                  │
│         │ 转录服务    │  │ LLM 推理引擎   │                  │
│         └─────────────┘  └────────────────┘                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│         持久化层（Supabase PostgreSQL）                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ 原始元数据   │  │  pgvector     │  │  JSON 存储    │     │
│  │ (PostgreSQL) │  │  (向量嵌入)   │  │ (SOP 提示词)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    外部生态系统                               │
│         YouTube API │ Twitter API │ RSS 订阅源              │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈

#### 前端层
- **框架**：Next.js 14 (App Router)，使用 Server Components 实现最优性能
- **UI 系统**：Shadcn/UI + Tailwind CSS，符合现代 SaaS 审美
- **状态管理**：
  - Zustand（客户端状态）
  - TanStack Query（服务端状态同步）
- **流式输出**：Vercel AI SDK (RSC) 实现实时 LLM 响应流

#### 后端层（Serverless）
- **混合运行时**：
  - Python 3.9+ (FastAPI) 处理 AI 密集型任务
  - Node.js (Edge) 处理高频 IO 和认证
- **AI 框架**：
  - LangChain / LangGraph 构建智能体推理循环
  - OpenAI API 用于嵌入和生成
- **数据处理**：
  - youtube-transcript-api 提取视频字幕
  - Pydantic 进行严格数据验证

#### 数据层
- **主数据库**：Supabase (PostgreSQL)
- **向量引擎**：pgvector 扩展（无需外部向量数据库）
- **认证**：Supabase Auth（基于 JWT）
- **向量维度**：1536（OpenAI text-embedding-3-small 标准）

---

## 🤖 核心智能体

### 1. 雷达智能体：情报采集与清洗

**位置**：`/api/py/radar/route.py`

**功能**：将异构的外部信息流转化为标准化的中间态数据。

#### 工作流程

1. **定时触发**：Vercel Cron 每小时触发 `/api/cron/ingest`
2. **差异检查**：检测订阅源中的新内容 ID
3. **去噪处理**：
   - 获取字幕/文本内容
   - 去除填充词（"um"、"you know" 等）
   - 过滤广告片段
   - 使用基于 LLM 的过滤进行预处理
4. **模式映射**（专利核心点）：
   - 将内容映射为 **IMR（中间元数据表示）**结构：

```json
{
  "source_type": "video",
  "core_concepts": ["智能体工作流", "RAG 优化"],
  "sentiment_score": 0.85,
  "key_quotes": [
    {"timestamp": "04:20", "text": "..."}
  ],
  "complexity_level": "high",
  "title": "...",
  "description": "..."
}
```

#### 技术亮点

- **中间语义树映射**：不是简单翻译，而是降维到结构化语义树（IMR），再根据平台特性升维渲染
- **事件驱动采集**：异步处理，队列管理
- **多源支持**：YouTube、Twitter/X、RSS 订阅源

---

### 2. 大脑智能体：知识向量化与缺口分析

**位置**：`/api/py/brain/route.py`

**功能**：基于向量空间距离的"灵感碰撞"机制。

#### 算法逻辑

1. **嵌入生成**：
   - 使用 `text-embedding-3-small` 模型
   - 将 IMR 数据转换为 1536 维向量

2. **知识缺口分析**（专利核心点）：
   - 定义用户历史知识向量集合：$U = \{v_1, v_2, ...\}$
   - 定义新情报向量：$n$
   - 计算最小距离：$d_{min} = \min_{v \in U} \text{distance}(n, v)$
   - **判定逻辑**：
     - 若 $d_{min} < \alpha$（阈值 ≈ 0.3）：**已知/重复内容** → 忽略
     - 若 $\alpha < d_{min} < \beta$（阈值 ≈ 0.7）：**相关但未涉足** → 生成推荐
     - 若 $d_{min} > \beta$：**完全无关领域** → 忽略

#### 向量空间包络面分析

这实现了"向量空间包络面分析"方法：
- **非热度驱动**：不基于流行度/趋势
- **盲区探测**：基于个人知识库的"盲区"（Gap Detection）
- **个性化智能**：个性化智能推荐系统

#### 余弦相似度计算

```python
def calculate_semantic_distance(vector_a: List[float], vector_b: List[float]) -> float:
    """
    计算两个嵌入向量之间的余弦相似度距离。
    返回：0 = 完全相同，1 = 正交
    """
    # 实现使用 numpy 点积和范数计算
    return 1 - dot(vector_a, vector_b) / (norm(vector_a) * norm(vector_b))
```

---

### 3. 矩阵智能体：多模态风格迁移

**位置**：`/api/py/matrix/route.py`

**功能**：基于提示链的自适应内容生成。

#### 实现方案

1. **上下文注入**：将 IMR 数据作为上下文注入 LLM
2. **风格路由**：根据目标平台加载系统提示词：
   - **小红书策略**：
     - 包含 Emoji
     - 短段落
     - 提取视觉关键词用于生成封面图
   - **推特策略**：
     - Thread 结构
     - Hook 句式
     - 简洁格式
3. **事实检查（溯源）**：
   - 在生成内容中保留时间轴锚点（如 `[04:20]`）
   - 可点击时间戳链接到原视频
   - 确保内容准确性和可追溯性

#### 自适应风格迁移方法

- **提示链架构**：多步骤生成过程
- **平台拓扑映射**：每个平台不同的渲染策略
- **时间锚点保留**：保持源可追溯性

---

## 📊 数据库设计

### 表结构概览

#### 1. `sources` - 订阅源表

```sql
CREATE TABLE sources (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    platform VARCHAR(20) CHECK (platform IN ('youtube', 'twitter', 'rss')),
    identifier VARCHAR(255) NOT NULL,  -- 频道 ID、Handle 或 RSS URL
    display_name VARCHAR(255),
    last_scanned_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);
```

#### 2. `intelligence` - 原始与中间态数据表

```sql
CREATE TABLE intelligence (
    id UUID PRIMARY KEY,
    source_id UUID REFERENCES sources(id),
    original_url TEXT NOT NULL,
    external_id VARCHAR(255),  -- YouTube 视频 ID、推文 ID 等
    
    -- 中间元数据表示（IMR）- JSONB
    imr_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- RAG 向量嵌入（1536 维）
    embedding VECTOR(1536),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `creations` - 生成内容表

```sql
CREATE TABLE creations (
    id UUID PRIMARY KEY,
    intelligence_id UUID REFERENCES intelligence(id),
    user_id UUID REFERENCES auth.users(id),
    target_platform VARCHAR(20),  -- 'xiaohongshu', 'twitter' 等
    status VARCHAR(20) DEFAULT 'draft',
    
    content_body TEXT NOT NULL,
    visual_keywords TEXT[],
    temporal_anchors JSONB,  -- 保留的时间戳锚点
    
    user_feedback_rating INT,  -- 用于 RLHF 优化
    published_url TEXT
);
```

#### 4. `user_preferences` - 用户偏好表

```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    
    -- 平台特定的 SOP 提示词（JSONB）
    platform_prompts JSONB DEFAULT '{}'::jsonb,
    
    -- 知识缺口分析阈值
    knowledge_gap_alpha FLOAT DEFAULT 0.3,
    knowledge_gap_beta FLOAT DEFAULT 0.7,
    
    preferred_language VARCHAR(10) DEFAULT 'zh-CN',
    auto_generate BOOLEAN DEFAULT false
);
```

### 向量搜索函数

```sql
CREATE FUNCTION match_intelligence(
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
```

---

## 🚀 快速开始

### 前置要求

- **Node.js** 18+
- **pnpm**（包管理器 - 必需）
- **Python** 3.9+
- **Supabase** 账号（免费版可用）
- **OpenAI API** 密钥

### 安装步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/LofiSu/InfoMatrix.git
cd InfoMatrix
```

#### 2. 安装依赖

```bash
# 安装 Node.js 依赖
pnpm install

# 安装 Python 依赖
pip install -r requirements.txt
```

#### 3. 环境配置

在项目根目录创建 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key-here

# Vercel Cron 密钥（生成随机字符串）
CRON_SECRET=your-random-secret-here

# 可选：外部 API
YOUTUBE_API_KEY=your-youtube-api-key-here
TWITTER_BEARER_TOKEN=your-twitter-bearer-token-here
```

#### 4. 数据库设置

1. 在 [Supabase Dashboard](https://app.supabase.com) 创建新项目
2. 进入 SQL Editor
3. 复制 `supabase/schema.sql` 的内容
4. 运行 SQL 脚本
5. 验证 `pgvector` 扩展已启用

#### 5. 运行开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

---

## 📁 项目结构

```
InfoMatrix/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── globals.css               # 全局样式
│   └── api/                      # API 路由（Node.js）
│
├── api/                          # Serverless API 路由
│   ├── py/                       # Python 运行时智能体
│   │   ├── radar/                # 雷达智能体
│   │   │   └── route.py          # 情报采集
│   │   ├── brain/                # 大脑智能体
│   │   │   └── route.py          # 知识缺口分析
│   │   └── matrix/               # 矩阵智能体
│   │       └── route.py          # 内容生成
│   └── cron/                     # Cron 任务触发器
│       └── ingest/               # 每小时采集触发器
│           └── route.ts
│
├── components/                   # React 组件
│   ├── ui/                       # Shadcn 基础组件
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── features/                 # 功能特定组件
│
├── lib/                          # 工具函数
│   ├── supabase/                 # Supabase 客户端
│   │   ├── server.ts             # 服务端客户端
│   │   └── client.ts             # 客户端客户端
│   ├── utils.ts                  # 通用工具
│   └── constants.ts              # 应用常量
│
├── types/                        # TypeScript 类型定义
│   ├── database.ts               # 数据库类型
│   └── api.ts                    # API 请求/响应类型
│
├── supabase/                     # 数据库相关
│   └── schema.sql                # 完整数据库架构
│
├── middleware.ts                 # Next.js 中间件（认证）
├── vercel.json                   # Vercel 配置
├── package.json                  # Node.js 依赖
├── requirements.txt              # Python 依赖
└── README.md                     # 本文件
```

---

## 🔧 开发指南

### 代码规范

- **类型安全**：严格 TypeScript 模式，Python 需要类型提示
- **模块化**：算法逻辑与 API 处理程序分离
- **文档**：复杂算法必须包含方法论文档字符串
- **学术术语**：注释中使用学术术语

### 核心原则

1. **事件驱动架构**：所有智能体通过事件通信
2. **Serverless 优先**：设计为无状态、可扩展的函数
3. **类型安全**：TypeScript 和 Python 中完整的类型覆盖
4. **错误处理**：优雅的错误处理，使用特定的 HTTP 状态码

### 运行测试

```bash
# 类型检查
pnpm run type-check

# 代码检查
pnpm run lint

# 构建验证
pnpm run build
```

---

## 🎓 学术与专利申请

本系统实现了两个核心方法论，适用于学术论文和专利文档：

### 1. 中间语义树（IMR）映射方法

**专利核心点**：跨平台内容重构方法

- **非简单翻译**：系统将非结构化数据降维为结构化语义树（IMR），然后根据平台特性升维渲染
- **拓扑感知**：不同平台结构需要不同的渲染策略
- **可追溯性**：保持源链接和时间锚点

### 2. 向量空间包络面分析方法

**专利核心点**：知识缺口发现机制

- **非热度驱动**：推荐基于个人知识库的"盲区"
- **个性化**：每个用户拥有独特的知识向量空间
- **智能化**：基于用户反馈（RLHF）自动调整阈值

### 文档标准

所有复杂算法（特别是 Python 智能体）包括：
- **方法论文档字符串**：解释"为什么"和"如何"
- **学术术语**：
  - "计算语义熵"而非"查找热门话题"
  - "映射到中间元数据结构"而非"转换格式"
- **模块化设计**：算法逻辑与 API 处理程序分离，便于专利提取

---

## 📈 路线图

### 第一阶段：基础架构（✅ 已完成）
- [x] Next.js 14 + Supabase 环境搭建
- [x] Python 脚本与 OpenAI API 集成
- [x] pgvector 数据库架构

### 第二阶段：数据采集（🚧 进行中）
- [ ] YouTube/Twitter Serverless 爬虫
- [ ] 去噪模块（雷达智能体）
- [ ] IMR 映射实现

### 第三阶段：核心算法（📋 计划中）
- [ ] RAG 检索实现
- [ ] 知识缺口推荐算法（大脑智能体）
- [ ] 向量相似度搜索优化

### 第四阶段：产品化（📋 计划中）
- [ ] Web 界面开发
- [ ] Vercel AI SDK 流式集成
- [ ] 矩阵智能体内容生成
- [ ] 用户反馈系统（RLHF）

### 第五阶段：文档（📋 计划中）
- [ ] 专利交底书
- [ ] 学术论文（第三章：系统设计）
- [ ] API 文档

---

## 🤝 贡献

我们欢迎贡献！在提交 PR 或 Issue 之前，请阅读我们的[贡献指南](CONTRIBUTING.md)和[Issue 指南](.github/ISSUE_GUIDE.md)。

快速开始：
1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'feat: add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开 Pull Request

详细指南：
- [贡献指南](CONTRIBUTING.md) - 如何贡献代码
- [Issue 指南](.github/ISSUE_GUIDE.md) - 如何提交 Issue
- [基础功能任务](.github/FOUNDATION_TASKS.md) - 当前开发任务

---

## 📄 许可证

本项目用于学术和研究目的。

---

## 👤 作者

**LofiSu**

- GitHub: [@LofiSu](https://github.com/LofiSu)
- Email: 3577995715@qq.com

---

<div align="center">

**Built with ❤️ for Content Creators**

为内容创作者而建 ❤️

</div>

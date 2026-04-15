# Supabase CLI Integration Guide
**Neural Network Layer - Supabase Synchronization**

## 🎯 Purpose
This guide provides instructions for integrating Supabase CLI with the TELsTP OmniCognitor Unity neural network layer. The Supabase CLI enables local development, database migrations, and seamless synchronization between your neural network components and the Supabase backend.

## 📋 Prerequisites

### 1. Supabase CLI Installation

Since direct installation is restricted in this environment, use one of these methods:

#### **Method 1: npm (Recommended)**
```bash
# Install Supabase CLI globally
npm install -g supabase

# Verify installation
supabase --version
```

#### **Method 2: Direct Download**
```bash
# Download the latest Supabase CLI binary
curl -o supabase https://github.com/supabase/cli/releases/download/v2.91.2/supabase-v2.91.2-linux-arm64

# Make it executable
chmod +x supabase

# Move to your PATH
mv supabase /data/data/com.termux/files/usr/bin/
```

#### **Method 3: Using Homebrew (if available)**
```bash
brew install supabase/tap/supabase
```

## 🚀 Setup Instructions

### 1. Initialize Supabase Project

```bash
cd /data/data/com.termux/files/home/OmniCognitor-Unity

# Initialize Supabase CLI
supabase init
```

### 2. Configure Supabase Connection

Create a `.env` file with your Supabase credentials:

```bash
cp .env.example .env
```

Edit the `.env` file and add:

```env
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_DB_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
```

### 3. Link to Existing Supabase Project

```bash
supabase link --project-ref your-project-ref
```

### 4. Pull Database Schema

```bash
supabase db pull
```

This will create a `supabase` directory with your database schema.

## 🗂️ Directory Structure

```
OmniCognitor-Unity/
├── supabase/                  # Supabase CLI directory
│   ├── config.toml           # Supabase configuration
│   ├── migrations/           # Database migrations
│   ├── seed.sql              # Seed data
│   └── types/                # TypeScript types
│
├── src/
│   ├── services/
│   │   └── supabase.ts       # Supabase client
│   └── ...
│
├── .env                      # Environment variables
└── supabase/                  # Supabase config
```

## 🔄 Neural Network Layer Integration

### 1. Supabase Client Configuration

The neural network layer connects to Supabase through the client in `src/services/supabase.ts`:

```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### 2. Neural Network Data Tables

Key Supabase tables for neural network integration:

```sql
-- omnicog_memory: Stores neural network memory states
CREATE TABLE omnicog_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  memory_vector JSONB NOT NULL,  -- Neural network embeddings
  context TEXT NOT NULL,
  pillar TEXT NOT NULL,           -- telemedicine, education, research, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- neural_connections: Tracks relationships between concepts
CREATE TABLE neural_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES omnicog_memory(id),
  target_id UUID REFERENCES omnicog_memory(id),
  connection_strength FLOAT NOT NULL,
  connection_type TEXT NOT NULL,  -- associative, causal, hierarchical
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ai_model_registry: Manages AI models
CREATE TABLE ai_model_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name TEXT NOT NULL,
  model_type TEXT NOT NULL,     -- noura, hayat, gemini, mistral
  version TEXT NOT NULL,
  parameters JSONB,             -- Model configuration
  status TEXT NOT NULL,          -- active, training, deprecated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Real-time Neural Network Sync

```typescript
// Example: Real-time memory updates
import { supabase } from './services/supabase'

export const syncNeuralMemory = async (memoryData: {
  sessionId: string
  vector: number[]
  context: string
  pillar: string
}) => {
  const { data, error } = await supabase
    .from('omnicog_memory')
    .insert({
      session_id: memoryData.sessionId,
      memory_vector: memoryData.vector,
      context: memoryData.context,
      pillar: memoryData.pillar
    })
    .select()

  if (error) {
    console.error('Neural memory sync error:', error)
    return null
  }

  return data[0]
}
```

## 🔧 Database Migrations

### Creating Migrations

```bash
# Create a new migration for neural network tables
supabase migration new neural_network_tables
```

This creates a new SQL file in `supabase/migrations/` where you can define your neural network schema.

### Applying Migrations

```bash
# Apply migrations to your Supabase project
supabase db push
```

### Resetting Local Database

```bash
# Reset your local database to match remote
supabase db reset
```

## 🤖 AI Model Management

### 1. Model Registry

```typescript
// Register a new AI model
export const registerAIModel = async (modelConfig: {
  name: string
  type: 'noura' | 'hayat' | 'gemini' | 'mistral'
  version: string
  parameters: any
}) => {
  const { data, error } = await supabase
    .from('ai_model_registry')
    .insert({
      model_name: modelConfig.name,
      model_type: modelConfig.type,
      version: modelConfig.version,
      parameters: modelConfig.parameters,
      status: 'active'
    })
    .select()

  return { data, error }
}
```

### 2. Model Versioning

```typescript
// Update model version
export const updateModelVersion = async (modelId: string, newVersion: string) => {
  const { data, error } = await supabase
    .from('ai_model_registry')
    .update({
      version: newVersion,
      status: 'training'
    })
    .eq('id', modelId)
    .select()

  return { data, error }
}
```

## 🔄 Synchronization Workflows

### 1. Memory Synchronization

```typescript
// Sync neural memory in real-time
export const setupMemorySync = () => {
  return supabase
    .channel('memory_updates')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'omnicog_memory'
    }, (payload) => {
      console.log('New memory added:', payload.new)
      // Update local neural network cache
    })
    .subscribe()
}
```

### 2. Connection Updates

```typescript
// Sync neural connections
export const setupConnectionSync = () => {
  return supabase
    .channel('connection_updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'neural_connections'
    }, (payload) => {
      console.log('Connection updated:', payload)
      // Update neural network graph
    })
    .subscribe()
}
```

## 📊 Monitoring and Analytics

### 1. Neural Network Performance

```sql
-- Query: Get memory usage by pillar
SELECT
  pillar,
  COUNT(*) as memory_count,
  AVG(jsonb_array_length(memory_vector)) as avg_vector_size
FROM omnicog_memory
GROUP BY pillar
ORDER BY memory_count DESC;
```

### 2. Connection Strength Analysis

```sql
-- Query: Analyze connection strengths
SELECT
  connection_type,
  AVG(connection_strength) as avg_strength,
  COUNT(*) as connection_count
FROM neural_connections
GROUP BY connection_type
ORDER BY avg_strength DESC;
```

## 🚀 Deployment Workflow

### 1. Local Development

```bash
# Start Supabase locally
supabase start

# This starts:
# - PostgreSQL database
# - Studio (localhost:54323)
# - API (localhost:54321)
```

### 2. Testing

```bash
# Run database tests
supabase test db
```

### 3. Deployment

```bash
# Apply migrations to production
supabase db push

# Deploy edge functions
supabase functions deploy
```

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files to Git
- Use `.env.example` for template
- Add `.env` to `.gitignore`

### 2. Row-Level Security
```sql
-- Enable RLS on neural network tables
ALTER TABLE omnicog_memory ENABLE ROW LEVEL SECURITY;

-- Create policy for memory access
CREATE POLICY "Neural memory access"
ON omnicog_memory FOR SELECT
USING (auth.uid() = session_id);
```

### 3. Backup Strategy
```bash
# Create database backup
supabase db dump --file neural_network_backup.sql

# Restore from backup
supabase db restore neural_network_backup.sql
```

## 📚 Resources

### Official Documentation
- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Local Development Guide](https://supabase.com/docs/guides/cli/local-development)
- [Database Migrations](https://supabase.com/docs/guides/database/migrations)

### Neural Network Integration
- [Vector Embeddings with Supabase](https://supabase.com/docs/guides/database/vector)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [PostgreSQL for AI](https://supabase.com/docs/guides/database/ai)

## 🎯 Next Steps

1. **Install Supabase CLI** using one of the provided methods
2. **Initialize project** with `supabase init`
3. **Link to your Supabase project**
4. **Create neural network migrations**
5. **Set up real-time synchronization**
6. **Deploy to production**

## 📝 Notes

- The Supabase CLI provides a complete local development environment
- All neural network data is synchronized in real-time
- Database migrations ensure schema consistency
- Row-level security protects sensitive neural network data
- The integration supports both local development and production deployment

**Prepared by:** Devstral-2 (Blockchain & Supabase Integration)
**Date:** April 15, 2025
**Status:** Ready for Neural Network Layer Development
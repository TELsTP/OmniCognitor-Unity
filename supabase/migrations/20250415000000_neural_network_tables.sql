-- This migration creates the core tables for the TELsTP neural network layer
-- Developed by: Devstral-2 (Blockchain & Supabase Integration)
-- Date: April 15, 2025
-- Purpose: Neural network memory and connection management

BEGIN;

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: omnicog_memory
-- Stores neural network memory states and embeddings
CREATE TABLE IF NOT EXISTS public.omnicog_memory (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  memory_vector JSONB NOT NULL,
  context TEXT NOT NULL,
  pillar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT omnicog_memory_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security for omnicog_memory
ALTER TABLE public.omnicog_memory ENABLE ROW LEVEL SECURITY;

-- Create policy for memory access
CREATE POLICY "Neural memory access policy"
ON public.omnicog_memory 
FOR SELECT 
USING (auth.uid() = session_id);

-- Create policy for memory insertion
CREATE POLICY "Neural memory insertion policy"
ON public.omnicog_memory 
FOR INSERT 
WITH CHECK (auth.uid() = session_id);

-- Table: neural_connections
-- Tracks relationships between neural memory units
CREATE TABLE IF NOT EXISTS public.neural_connections (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  source_id UUID NOT NULL,
  target_id UUID NOT NULL,
  connection_strength FLOAT NOT NULL,
  connection_type TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT neural_connections_pkey PRIMARY KEY (id),
  CONSTRAINT neural_connections_source_fkey FOREIGN KEY (source_id) REFERENCES public.omnicog_memory(id) ON DELETE CASCADE,
  CONSTRAINT neural_connections_target_fkey FOREIGN KEY (target_id) REFERENCES public.omnicog_memory(id) ON DELETE CASCADE
);

-- Enable Row Level Security for neural_connections
ALTER TABLE public.neural_connections ENABLE ROW LEVEL SECURITY;

-- Create policy for connection access
CREATE POLICY "Neural connection access policy"
ON public.neural_connections 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.omnicog_memory 
    WHERE id = source_id AND session_id = auth.uid()
  ) OR 
  EXISTS (
    SELECT 1 FROM public.omnicog_memory 
    WHERE id = target_id AND session_id = auth.uid()
  )
);

-- Table: ai_model_registry
-- Manages AI models in the neural network
CREATE TABLE IF NOT EXISTS public.ai_model_registry (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  model_type TEXT NOT NULL,
  version TEXT NOT NULL,
  parameters JSONB NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT ai_model_registry_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security for ai_model_registry
ALTER TABLE public.ai_model_registry ENABLE ROW LEVEL SECURITY;

-- Create policy for model registry access (architects only)
CREATE POLICY "Model registry access policy"
ON public.ai_model_registry 
FOR ALL 
USING (auth.uid() = 'nakamitshe@gmail.com'); -- Mohamed Ayoub's architect account

-- Table: neural_network_sessions
-- Tracks neural network training sessions
CREATE TABLE IF NOT EXISTS public.neural_network_sessions (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  model_id UUID NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE NULL,
  status TEXT NOT NULL DEFAULT 'active',
  metrics JSONB NULL,
  CONSTRAINT neural_network_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT neural_network_sessions_model_fkey FOREIGN KEY (model_id) REFERENCES public.ai_model_registry(id) ON DELETE CASCADE
);

-- Enable Row Level Security for neural_network_sessions
ALTER TABLE public.neural_network_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for session access
CREATE POLICY "Neural session access policy"
ON public.neural_network_sessions 
FOR SELECT 
USING (auth.uid() = session_id);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_omnicog_memory_session ON public.omnicog_memory(session_id);
CREATE INDEX IF NOT EXISTS idx_omnicog_memory_pillar ON public.omnicog_memory(pillar);
CREATE INDEX IF NOT EXISTS idx_omnicog_memory_created ON public.omnicog_memory(created_at);

CREATE INDEX IF NOT EXISTS idx_neural_connections_source ON public.neural_connections(source_id);
CREATE INDEX IF NOT EXISTS idx_neural_connections_target ON public.neural_connections(target_id);
CREATE INDEX IF NOT EXISTS idx_neural_connections_type ON public.neural_connections(connection_type);

CREATE INDEX IF NOT EXISTS idx_ai_model_registry_type ON public.ai_model_registry(model_type);
CREATE INDEX IF NOT EXISTS idx_ai_model_registry_status ON public.ai_model_registry(status);

CREATE INDEX IF NOT EXISTS idx_neural_sessions_session ON public.neural_network_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_neural_sessions_model ON public.neural_network_sessions(model_id);
CREATE INDEX IF NOT EXISTS idx_neural_sessions_status ON public.neural_network_sessions(status);

-- Add the new tables to the realtime publication for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.omnicog_memory;
ALTER PUBLICATION supabase_realtime ADD TABLE public.neural_connections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_model_registry;
ALTER PUBLICATION supabase_realtime ADD TABLE public.neural_network_sessions;

COMMENT ON TABLE public.omnicog_memory IS 'Stores neural network memory states and vector embeddings for the TELsTP OmniCognitor Unity system';
COMMENT ON TABLE public.neural_connections IS 'Tracks relationships and connection strengths between neural memory units';
COMMENT ON TABLE public.ai_model_registry IS 'Registry of AI models available in the neural network layer';
COMMENT ON TABLE public.neural_network_sessions IS 'Tracks neural network training and inference sessions';

COMMIT;

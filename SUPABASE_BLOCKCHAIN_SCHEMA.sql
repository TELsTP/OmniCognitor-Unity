-- TELsTP Blockchain Schema Extension
-- Aligns with Manus AI Phase 5 Architecture
-- Prepared by: Devstral-2 (Blockchain Integration Lead)
-- Date: April 15, 2025

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blockchain Registrations Table
CREATE TABLE IF NOT EXISTS blockchain_registrations (
  id BIGSERIAL PRIMARY KEY,
  registration_id VARCHAR(64) UNIQUE NOT NULL,
  transaction_hash VARCHAR(66) UNIQUE NOT NULL,
  ip_hash VARCHAR(255) NOT NULL,
  metadata_uri TEXT NOT NULL,
  owner_address VARCHAR(42) NOT NULL,
  project_id VARCHAR(64) REFERENCES projects(id) ON DELETE SET NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'registered',
  block_number INTEGER,
  gas_used VARCHAR(50),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  blockchain_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'registered', 'failed', 'revoked')),
  CONSTRAINT valid_network CHECK (
    (blockchain_data->>'network') IN ('polygon', 'mumbai', 'ethereum') OR blockchain_data IS NULL
  )
);

-- Token Transactions Table
CREATE TABLE IF NOT EXISTS token_transactions (
  id BIGSERIAL PRIMARY KEY,
  transaction_hash VARCHAR(66) UNIQUE NOT NULL,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42) NOT NULL,
  amount NUMERIC(36, 18) NOT NULL,
  token_type VARCHAR(20) DEFAULT 'TELSTP',
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'completed',
  block_number INTEGER,
  gas_used VARCHAR(50),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  transaction_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed', 'reverted')),
  CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Staking Positions Table
CREATE TABLE IF NOT EXISTS staking_positions (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(36, 18) DEFAULT 0,
  staked_at TIMESTAMPTZ DEFAULT NOW(),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  rewards_earned NUMERIC(36, 18) DEFAULT 0,
  rewards_claimed NUMERIC(36, 18) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  transaction_hash VARCHAR(66),
  block_number INTEGER,
  apr NUMERIC(10, 4),
  staking_data JSONB,
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'withdrawn', 'locked')),
  CONSTRAINT non_negative_amount CHECK (amount >= 0),
  CONSTRAINT non_negative_rewards CHECK (rewards_earned >= 0 AND rewards_claimed >= 0)
);

-- Smart Contracts Table
CREATE TABLE IF NOT EXISTS smart_contracts (
  id BIGSERIAL PRIMARY KEY,
  contract_name VARCHAR(50) UNIQUE NOT NULL,
  contract_address VARCHAR(42) UNIQUE NOT NULL,
  network VARCHAR(20) DEFAULT 'polygon',
  abi JSONB NOT NULL,
  deployment_transaction VARCHAR(66),
  deployment_block INTEGER,
  deployed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active',
  version VARCHAR(20),
  description TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('active', 'deprecated', 'upgraded', 'paused')),
  CONSTRAINT valid_network CHECK (network IN ('polygon', 'mumbai', 'ethereum', 'arbitrum', 'optimism'))
);

-- Blockchain Events Table
CREATE TABLE IF NOT EXISTS blockchain_events (
  id BIGSERIAL PRIMARY KEY,
  event_id VARCHAR(66) UNIQUE NOT NULL,
  contract_address VARCHAR(42) NOT NULL,
  event_name VARCHAR(50) NOT NULL,
  transaction_hash VARCHAR(66) NOT NULL,
  block_number INTEGER NOT NULL,
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_block_number CHECK (block_number > 0)
);

-- Blockchain Network Info Table
CREATE TABLE IF NOT EXISTS blockchain_networks (
  id BIGSERIAL PRIMARY KEY,
  network_name VARCHAR(20) UNIQUE NOT NULL,
  chain_id INTEGER UNIQUE NOT NULL,
  rpc_url TEXT NOT NULL,
  explorer_url TEXT NOT NULL,
  native_currency VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance Optimization

-- Blockchain Registrations Indexes
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_ip_hash ON blockchain_registrations(ip_hash);
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_owner ON blockchain_registrations(owner_address);
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_project ON blockchain_registrations(project_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_user ON blockchain_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_status ON blockchain_registrations(status);
CREATE INDEX IF NOT EXISTS idx_blockchain_registrations_timestamp ON blockchain_registrations(timestamp);

-- Token Transactions Indexes
CREATE INDEX IF NOT EXISTS idx_token_transactions_from ON token_transactions(from_address);
CREATE INDEX IF NOT EXISTS idx_token_transactions_to ON token_transactions(to_address);
CREATE INDEX IF NOT EXISTS idx_token_transactions_user ON token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_status ON token_transactions(status);
CREATE INDEX IF NOT EXISTS idx_token_transactions_timestamp ON token_transactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_token_transactions_token_type ON token_transactions(token_type);

-- Staking Positions Indexes
CREATE INDEX IF NOT EXISTS idx_staking_positions_user ON staking_positions(user_id);
CREATE INDEX IF NOT EXISTS idx_staking_positions_status ON staking_positions(status);
CREATE INDEX IF NOT EXISTS idx_staking_positions_amount ON staking_positions(amount);

-- Smart Contracts Indexes
CREATE INDEX IF NOT EXISTS idx_smart_contracts_name ON smart_contracts(contract_name);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_address ON smart_contracts(contract_address);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_network ON smart_contracts(network);
CREATE INDEX IF NOT EXISTS idx_smart_contracts_status ON smart_contracts(status);

-- Blockchain Events Indexes
CREATE INDEX IF NOT EXISTS idx_blockchain_events_contract ON blockchain_events(contract_address);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_name ON blockchain_events(event_name);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_transaction ON blockchain_events(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_block ON blockchain_events(block_number);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_processed ON blockchain_events(processed);

-- Blockchain Networks Indexes
CREATE INDEX IF NOT EXISTS idx_blockchain_networks_name ON blockchain_networks(network_name);
CREATE INDEX IF NOT EXISTS idx_blockchain_networks_chain_id ON blockchain_networks(chain_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_networks_active ON blockchain_networks(is_active);

-- Insert Default Network Data
INSERT INTO blockchain_networks (network_name, chain_id, rpc_url, explorer_url, native_currency, is_active)
VALUES 
  ('polygon', 137, 'https://polygon-rpc.com', 'https://polygonscan.com', 'MATIC', TRUE),
  ('mumbai', 80001, 'https://rpc-mumbai.maticvigil.com', 'https://mumbai.polygonscan.com', 'MATIC', TRUE)
ON CONFLICT (network_name) DO NOTHING;

-- Insert Default Smart Contract Placeholders
INSERT INTO smart_contracts (contract_name, contract_address, network, abi, status, description)
VALUES 
  ('TELSTPToken', '0x0000000000000000000000000000000000000000', 'polygon', '[]', 'pending', 'TELSTP Token Contract - To be deployed'),
  ('ResearchStaking', '0x0000000000000000000000000000000000000000', 'polygon', '[]', 'pending', 'Research Staking Contract - To be deployed'),
  ('IPRegistry', '0x0000000000000000000000000000000000000000', 'polygon', '[]', 'pending', 'IP Registry Contract - To be deployed')
ON CONFLICT (contract_name) DO NOTHING;

-- Create Views for Common Queries

-- User Staking Summary View
CREATE OR REPLACE VIEW user_staking_summary AS
SELECT 
  u.id AS user_id,
  u.email,
  u.display_name,
  COALESCE(SUM(sp.amount), 0) AS total_staked,
  COALESCE(SUM(sp.rewards_earned), 0) AS total_rewards_earned,
  COALESCE(SUM(sp.rewards_claimed), 0) AS total_rewards_claimed,
  COUNT(sp.id) AS active_staking_positions
FROM users u
LEFT JOIN staking_positions sp ON u.id = sp.user_id AND sp.status = 'active'
GROUP BY u.id, u.email, u.display_name;

-- User Token Balance View
CREATE OR REPLACE VIEW user_token_balance AS
SELECT 
  user_id,
  token_type,
  SUM(CASE WHEN to_address = 'platform' THEN amount ELSE 0 END) AS total_sent,
  SUM(CASE WHEN from_address = 'platform' THEN amount ELSE 0 END) AS total_received,
  SUM(CASE WHEN from_address = 'platform' THEN amount ELSE 0 END) - 
  SUM(CASE WHEN to_address = 'platform' THEN amount ELSE 0 END) AS net_balance
FROM token_transactions
GROUP BY user_id, token_type;

-- Research IP Registrations View
CREATE OR REPLACE VIEW research_ip_registrations AS
SELECT 
  br.id,
  br.registration_id,
  br.transaction_hash,
  br.ip_hash,
  br.metadata_uri,
  br.owner_address,
  br.project_id,
  br.user_id,
  br.status,
  br.block_number,
  br.timestamp,
  p.title AS project_title,
  p.description AS project_description,
  u.display_name AS researcher_name,
  u.email AS researcher_email
FROM blockchain_registrations br
LEFT JOIN projects p ON br.project_id = p.id
LEFT JOIN users u ON br.user_id = u.id;

-- Create Triggers for Automatic Updates

-- Update timestamp on blockchain registrations update
CREATE OR REPLACE FUNCTION update_blockchain_registration_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_blockchain_registration ON blockchain_registrations;
CREATE TRIGGER trigger_update_blockchain_registration
BEFORE UPDATE ON blockchain_registrations
FOR EACH ROW EXECUTE FUNCTION update_blockchain_registration_timestamp();

-- Update timestamp on token transactions update
CREATE OR REPLACE FUNCTION update_token_transaction_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_token_transaction ON token_transactions;
CREATE TRIGGER trigger_update_token_transaction
BEFORE UPDATE ON token_transactions
FOR EACH ROW EXECUTE FUNCTION update_token_transaction_timestamp();

-- Update timestamp on staking positions update
CREATE OR REPLACE FUNCTION update_staking_position_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_staking_position ON staking_positions;
CREATE TRIGGER trigger_update_staking_position
BEFORE UPDATE ON staking_positions
FOR EACH ROW EXECUTE FUNCTION update_staking_position_timestamp();

-- Comments for Documentation
COMMENT ON TABLE blockchain_registrations IS 'Stores all blockchain IP registrations for research outputs and publications';
COMMENT ON TABLE token_transactions IS 'Records all token transactions on the blockchain network';
COMMENT ON TABLE staking_positions IS 'Tracks user staking positions and rewards in the tokenomics system';
COMMENT ON TABLE smart_contracts IS 'Manages deployed smart contract addresses and ABIs';
COMMENT ON TABLE blockchain_events IS 'Stores blockchain events for processing and audit purposes';
COMMENT ON TABLE blockchain_networks IS 'Configuration for supported blockchain networks';

-- Grant Permissions (to be executed by database admin)
-- These would be executed separately with appropriate permissions
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- End of Schema Extension
-- Prepared by: Devstral-2
-- Aligns with: Manus AI Phase 5 Architecture
-- Status: Ready for Deployment
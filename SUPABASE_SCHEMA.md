# PROJECT UNITED-TELSTP: OmniCog Master Schema
**Version:** 2.0.0 (Omni-Genesis)
**Status:** Authoritative Foundation

The OmniCog Schema is the "Digital Spine" of the 58-hub network. It provides the unified data structure required for cross-hub intelligence and Architect-level control.

## Core OmniCog Tables

### 1. `hubs` (The Network Nodes)
Manages the 58 standalone hubs.
- `id`: UUID (PK)
- `name`: Text
- `pillar`: Enum (Telemedicine, Education, Research, Multimedia, Wisdom)
- `status`: Text
- `metadata`: JSONB

### 2. `profiles` (Unified Identity)
- `handshake_verified`: Boolean (Tracks Architect status)
- `role`: Text (Architect, Hub_Admin, Specialist, Citizen)

### 3. `omnicog_memory` (AI Neural Layer)
Shared cognitive context for Hayat and Noura.
- `context_key`: Text (Unique)
- `memory_data`: JSONB
- `intelligence_level`: Integer

### 4. `architect_handshakes` (Audit Trail)
Logs every use of the Master Key: `Nakamitshe-Telstp-235153`.

### 5. `knowledge_base` (Wisdom & Research)
Unified repository for the Wisdom and Research pillars.

### 6. `multimedia_stream` (Radio TELSTP)
Foundation for the Global Multimedia Pillar.

---

**Architect Note:** This schema is the "Digital Constitution." Any modification must be logged via the Architect Handshake.

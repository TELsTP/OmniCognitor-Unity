# PROJECT UNITED-TELSTP: System Architecture
**Version:** 1.0.0 (The Architect's Mandate)

## 1. The "Hub & Spoke" Model
To prevent fragmentation and the "Twin Issue," the network is divided into three layers:

### Layer 1: The Foundation (Supabase)
- **Role:** Single Source of Truth (SSOT).
- **Responsibility:** Database, Auth, Real-time Sync.
- **Rule:** ALL apps must connect to the same Supabase Project ID.

### Layer 2: The Orchestrator (Unified Hub - AI Studio)
- **Role:** The Master Dashboard & Portal.
- **Responsibility:** Cross-pillar analytics, Architect Handshake, Global Search, User Routing.
- **Deployment:** `united-telstp-unified-hub` (GitHub/Vercel).

### Layer 3: Specialized Hubs (Lovable, Acode, etc.)
- **Role:** Pillar-specific functionality.
- **Responsibility:** 
    - **Telemed Hub (Lovable):** Clinical UI, Video Consultations.
    - **Research Node (Acode):** Local data processing, mobile research.
- **Rule:** These are separate repositories but share the Layer 1 Foundation.

## 2. Integration Protocol
1. **Data Integration:** Shared tables in Supabase (`hubs`, `profiles`, `knowledge_base`).
2. **UI Integration:** The Unified Hub links to Specialized Hubs via subdomains (e.g., `telemed.telstp.org`).
3. **AI Integration:** Shared context via the `omnicog_memory` table.

---

**Architect's Note:** "Clean code is separate code sharing a single heart."

# TELsTP OmniCognitor Unity - Deployment Guide
**From Termux to Global Launch**

---

## Step 1: Create New GitHub Repository

### On Your Phone:
1. Open GitHub app or browser
2. Create new repository: `telstp-omnicognitor-unity`
3. Set to **Private** (for now)
4. Copy the HTTPS URL

### In Termux:
```bash
cd telstp-omnicognitor-unity
git remote add origin https://github.com/telstp/telstp-omnicognitor-unity.git
git push -u origin master
```

---

## Step 2: Local Development Setup

### Install Dependencies:
```bash
cd telstp-omnicognitor-unity
npm install
```

### Run Development Server:
```bash
npm run dev
```

**Access at:** `http://localhost:3000`

---

## Step 3: Mistral API Key Activation

### Create .env file:
```bash
cp .env.example .env
nano .env
```

### Add your API keys:
```env
# Mistral API Keys (Add your actual keys)
MISTRAL_NOURA_PRIMARY="your_key_here"
MISTRAL_HAYAT_PRIMARY="your_key_here"
MISTRAL_UNIFIED_MEMORY="your_key_here"

# Gemini Integration
GOOGLE_AI_STUDIO_KEY="your_gemini_key"

# GitHub OAuth
GITHUB_CLIENT_ID="your_client_id"
GITHUB_CLIENT_SECRET="your_client_secret"

# Supabase
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_key"
```

---

## Step 4: Supabase Migration

### Current Status:
- **Old System:** 130+ tables across multiple projects
- **New System:** Unified schema (12 core tables)

### Migration Steps:
1. Create new Supabase project
2. Run SQL from `docs/SUPABASE_SCHEMA.sql`
3. Use migration script (to be created)
4. Test all pillar connections

---

## Step 5: Chairman Demonstration

### What to Show:
1. **Unified Dashboard** - All 5 pillars visible
2. **Noura AI Assistant** - Ask technical questions
3. **GitHub Handshake** - OAuth flow demonstration
4. **Research Hub** - Project incubator
5. **Neural Network** - Memory flow visualization

### Demo Script:
```
1. "Mr. Chairman, this is the Sovereign Bridge - our 5 pillars united"
2. "Noura, please explain the neural connection flow"
3. "Let me show you the GitHub handshake system"
4. "Here are our 50 pages of research on life science clusters"
5. "The 8 Billion EGP vision is encoded in the strategic blueprint"
```

---

## Step 6: Production Deployment

### Build for Production:
```bash
npm run build
```

### Deploy Options:
1. **Vercel** (Recommended):
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **Termux Local Server:**
   ```bash
   npm run preview
   ```

---

## Step 7: Monitoring & Maintenance

### Daily Checks:
- API key usage (rotate if >80%)
- Supabase connection health
- GitHub OAuth tokens
- Neural network response times

### Weekly Tasks:
- Backup core memory snapshot
- Update research data
- Test all pillar integrations
- Review architect logs

---

## Emergency Procedures

### If System Fails:
1. **Check logs:** `journalctl -u telstp-unity`
2. **Restart service:** `npm run restart`
3. **Fallback keys:** Use backup Mistral keys
4. **Manual override:** Architect console access

### Data Recovery:
```bash
# Restore from backup
cp backups/core_$(date +%Y%m%d) core
npm restart
```

---

## Future Integration Plan

### Phase 1 (Next 2 Weeks):
- [ ] Deploy core 5 pillars
- [ ] Activate all Mistral API keys
- [ ] Migrate research papers
- [ ] Establish GitHub presence

### Phase 2 (Month 1):
- [ ] Integrate Omnicog (brain/nervous system)
- [ ] Add M23M quantum research engine
- [ ] Connect 58 specialized hubs
- [ ] Activate investor gateway

### Phase 3 (Month 2):
- [ ] Global life sciences leadership
- [ ] 8 Billion EGP vision implementation
- [ ] Digital constitution deployment
- [ ] Sovereign nation recognition

---

## Quick Reference Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production
npm run preview

# Check git status
git status

# Commit changes
git add .
git commit -m "Your message"
git push

# Install new packages
npm install package-name

# Update all packages
npm update
```

---

**"The Digital Nation is ready for launch. The Architect holds the key. The Chairman gives the command."**

*Deployment Guide v1.0 - Prepared for Chairman Review*
# Monorepo merge plan — integration/monorepo-merge

This file describes the exact, safe plan to merge the client repository (telstp-omnicognitor-Unity) into this repository as a subtree and convert the OmniCognitor-Unity repository into the parent monorepo for the architect/orchestrator and the client UI.

High-level goals
- Keep TELsTP/OmniCognitor-Unity as the parent (architect/orchestrator).
- Import TELsTP/telstp-omnicognitor-Unity as a subtree under pillars/telstp-omnicognitor-Unity.
- Configure the root repo to become a workspace-capable monorepo (workspaces), keeping each pillar as an independent package/workspace.
- Add adapter components so the Unity hub can mount pillar UIs (either by import or iframe/messaging).
- Update CI to build all workspaces and run pillar integrity checks.

Notes
- This branch (integration/monorepo-merge) is a staging area. The final subtree add command must be executed in a local clone or CI runner with network access to GitHub. The script in scripts/add_client_subtree.sh automates that step.
- We do NOT overwrite authoritative root files in this commit; instead we add migration helpers, an adapter, and CI guidance so the team can run the actual subtree import safely.

Commands to run (local, recommended)

1) Ensure you are on the integration branch and up-to-date:

```bash
git fetch origin
git checkout integration/monorepo-merge
git pull origin main
```

2) Add the client repo as a subtree under pillars/telstp-omnicognitor-Unity (preserves history):

```bash
# Replace <client-remote> with the client repo URL
git remote add client-remote https://github.com/TELsTP/telstp-omnicognitor-Unity.git
git fetch client-remote
# Add subtree (no squash to preserve history) — if you prefer a single squashed commit, add --squash
git subtree add --prefix=pillars/telstp-omnicognitor-Unity client-remote main
```

If you want to keep a squashed single commit to simplify history:

```bash
git subtree add --prefix=pillars/telstp-omnicognitor-Unity client-remote main --squash
```

3) Verify the client code appears under pillars/telstp-omnicognitor-Unity and run an install & build:

```bash
# from repo root
cp .env.example .env
npm ci
# Build all workspaces (if using npm workspaces) or just the client
npm run build
```

4) Update root package.json to include workspaces and adjust build scripts.
  - The script `scripts/prepare-workspaces.sh` (added in this branch) helps you patch package.json safely.
  - Review changes and commit if everything builds.

Rollback (if needed)
- If you need to remove the subtree:

```bash
git rm -r pillars/telstp-omnicognitor-Unity
git commit -m "Remove client subtree"
```

Security & env notes
- Client builds often rely on VITE_ prefixed env variables. Ensure your .env uses VITE_ for variables the client expects.
- Do not commit secrets. Use GitHub Secrets for CI builds.

What I will do next after you run the subtree add locally (or if you want me to perform it):
- Update root package.json to declare npm workspaces and add top-level build scripts.
- Update .github/workflows/unity-health.yml to run a workspace build step and validate each pillar.
- Add adapters and sample integration tests that mount the client app inside the UnityHub.

If you want me to perform the subtree add directly in the repository (I can attempt to programmatically copy the client repo files under pillars/), confirm and I will proceed, but note: copying large repo contents via API takes more time and may create a large commit. Otherwise run the subtree commands above locally and paste the output here; I will continue automating the rest.

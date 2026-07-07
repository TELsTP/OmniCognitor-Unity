---
name: Monorepo Merge: Integration PR
about: Automated PR for merging the client subtree and monorepo scaffolding
---

This pull request finalizes the integration of the client repository (telstp-omnicognitor-Unity) into the OmniCognitor-Unity monorepo as a subtree under pillars/telstp-omnicognitor-Unity, and adds pnpm workspace scaffolding, CI workflow, and an iframe adapter so the UnityHub can mount the client during the migration.

Summary of changes included in this PR:

- import placeholders & subtree helper scripts
- pnpm-workspace.yaml + root package.json updated with workspaces and build orchestration
- .github/workflows/monorepo-build.yml (builds all workspaces and validates pillars)
- src/pillars/telstp-omnicognitor-Unity/AdapterIframe.tsx
- scripts/add_client_subtree.sh (run locally or in CI runner to perform the actual subtree add)

Next steps (what maintainers should do):
1. Run the subtree add to import the client repo into pillars/ (or allow me to run it if collaborator write access is present). Command:
   git remote add client-remote https://github.com/TELsTP/telstp-omnicognitor-Unity.git
   git fetch client-remote
   git subtree add --prefix=pillars/telstp-omnicognitor-Unity client-remote main

2. Run pnpm install and pnpm -w -r build to build all workspaces.

3. Verify the UnityHub mounts the client via the iframe adapter and that OAuth callbacks work with APP_URL/GITHUB_CLIENT_* environment variables.

4. Review CI changes and add necessary GitHub Actions secrets for production builds (VITE_SUPABASE_*, GITHUB_CLIENT_ID, etc.)

Testing checklist
- [ ] Run `pnpm -w -r build` locally (or in CI) — builds succeed
- [ ] Start server in production mode (NODE_ENV=production node server.ts) and verify the root URL serves the built UI
- [ ] Validate OAuth flow works with GITHUB_CLIENT_ID/SECRET and APP_URL
- [ ] Verify subtitles and assets are properly loaded from built dist folders


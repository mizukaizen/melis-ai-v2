## Git Discipline — Non-Negotiable Rules

### Commit After Every Change
After modifying ANY file, immediately commit:
```bash
git add -A && git commit -m "type: description of what changed"
```
Never leave a session with uncommitted changes. No exceptions.

### Never Run git reset --hard Without Committing First
Before any `git reset`, `git checkout`, or branch switch, always run:
```bash
git status  # confirm nothing uncommitted
git stash   # if there ARE uncommitted changes, stash first
```

### Push After Every Session
Before closing a Claude Code session, always push:
```bash
git push origin <current-branch>
```
This ensures work survives even if the local machine has issues.

### Branch Strategy
- Never commit directly to `main`
- Always work on a feature branch: `git checkout -b ui/description`
- Push branch to origin before ending session
- Sean merges PRs manually — Claude Code never merges to main

### Commit Message Format
Use conventional commits:
- `feat:` — new feature or component
- `fix:` — bug fix or regression fix
- `ui:` — visual/CSS change
- `refactor:` — restructuring without behaviour change
- `chore:` — deps, config, tooling

### Session Closure Checklist
1. `git status` — confirm all changes are committed
2. `git push origin <branch>` — push to remote
3. Confirm with: `git log --oneline -5` — verify commits are there
4. Push isn't enough — any branch with shippable work must merge to main before session close. Pushed-but-unmerged work creates baseline drift and bites the next branch cut (see 2026-05-26 recovery incident).

### Never Deploy on Helsinki Without Pushing to Origin First
**Critical rule learned 2026-05-19 after a 15-file silent drift was discovered.**

If you edit code on Helsinki (or anywhere that gets deployed), the EXACT same commits must land on `origin/main` in the same session. Never:
- SSH-edit + restart container without an accompanying PR
- "Quick fix in prod, push later" — you will forget
- Deploy from a local branch that hasn't been pushed
- Skip the PR step because "it's small"

Anti-pattern that bit us: merge+deploy on Helsinki, plan to push to GitHub "after testing," then move on. Result: Helsinki running v1.1 of bundle-engine + entire Bundle #2 app for weeks before anyone noticed. Next deploy from a fresh clone would have silently regressed everything.

**Enforcement:** before declaring any Helsinki deploy "done," run:
```bash
cd /opt/<repo> && git log origin/main..HEAD --oneline
```
If this output is non-empty, you have unpushed commits running in production. Fix immediately.

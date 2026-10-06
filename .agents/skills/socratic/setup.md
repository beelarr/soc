# Setup

Follow this only after `socratic` has named `WORKSPACE`.

## Tools

Ask which tools to connect: `cursor`, `claude`, `codex`, `copilot`, `windsurf`, or `all`. Wait for the answer.

`.agents` is the only copy of instructions, skills, and rules. Tool directories point at it. Do not copy `.agents` into a tool directory.

- Cursor: `.cursor` symlinks to `.agents`. Ignore file: `.cursorignore`.
- Claude: `.claude` symlinks to `.agents`. Write `.agents/CLAUDE.md` containing `@../AGENTS.md` if that file is absent. Ignore is the `deny` list in `.agents/settings.json` for `.env` and `.env.*`, unless this version of Claude has its own ignore file.
- Codex: `.codex` symlinks to `.agents`. Ignore file: `.codexignore`.
- Copilot: `.github/copilot-instructions.md` points at `AGENTS.md`.
- Windsurf: `.windsurfrules` points at `AGENTS.md`.

If the tool reads a different path, use that path. Point it at `.agents` with a symlink or a one-line import.

If `.cursor`, `.claude`, or `.codex` is already a real directory, leave it. Do not delete it. Add a pointer inside that directory and leave the rest of the files.

Every ignore file lists `.env`, `.env.*`, `*.pem`, and `*.key`. Do not add project policy to an ignore file.

## Files

Write `WORKSPACE/AGENTS.md` only if it is missing. It says `.agents` holds the rules and skills, and tells the agent to read them before editing. Do not overwrite an existing `AGENTS.md`. Add a short pointer at the end only if it does not already mention `.agents`.

Create `WORKSPACE/.agents/` if it is missing.

## Manifests

Search the whole repository for manifests, including subfolders. Skip `.git`, `node_modules`, and build output. Record the package name, the version string, and the file you found it in. Do not read source files to invent a dependency.

- `package.json`: `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`.
- `requirements.txt`, including files pulled in with `-r` or `--requirement`. A name like `uvicorn[standard]` is `uvicorn`. Keep the version (`psycopg[binary]==3.2.3` is `3.2.3`).
- `go.mod`, `Cargo.toml`, `Gemfile`, `pom.xml`, `build.gradle`, `build.gradle.kts`, `composer.json`.

Show the person the list. This list is input for research and the interview. Do not turn it into a document.

## A later run

When `.agents/rules` or `.agents/skills` already exist, this is an update.

For each manifest, run `git log -1 -p -- <file>` from `WORKSPACE`. Also run `git diff -- <file>` when the working tree differs from HEAD. Tell the person what was added, removed, or version-changed. A manifest that git has never contained before is the whole file, and the existing rules are the previous record.

An added or version-changed dependency goes to research, then to the interview, which asks before installing anything. Do not delete a rule because a dependency disappeared. Ask the person first.

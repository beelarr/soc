# SOC

<p align="center">
  <img src="docs/soc.jpg" alt="SOC, a black-and-white stick-figure sketch holding a scroll with a question mark" width="280" />
</p>

Human intent becomes a harness an agent can follow. This repository is one skill, `socratic`. You install it, open an agent in your repository, and the agent does the work. There is no CLI.

SOC asks about what the code is already doing before anyone writes a rule. The skill does not invent a practice the person did not state. An answer that does not change how an agent should work produces no file.

## Install

```bash
npx skills add beelarr/soc
```

That installs one skill, `socratic`. Open an agent in the repository you want to wrap. It reads `setup.md`, `research.md`, `interview.md`, and `verify.md` from its own folder and follows them in that order. Those four files are not separate skills, so they do not take the names `setup`, `research`, `interview`, or `verify` in the skill list.

Add `-g` to install the skill for every repository on your machine. Update it later with `npx skills update`.

## What you get

A finished run leaves a harness in the repository:

- `AGENTS.md` at the root, if you did not already have one.
- `.agents/` holding the rules and skills.
- When `.cursor`, `.claude`, or `.codex` is missing, a symlink from that directory to `.agents`, plus that tool's ignore file. If one of those is already a real directory, it stays and the skill adds a pointer inside it. Copilot and Windsurf get a one-line pointer at `AGENTS.md`.
- Rules in `.agents/rules/` and skills in `.agents/skills/` for the practices you accepted.
- Vendor skills and MCP entries only where you said yes.

You do not get a decision log. Ownership, incidents, and open questions stay in the conversation unless they imply a rule or a skill.

## The skills

`socratic` is the only skill. It names the repository and then follows the four steps in its folder.

| Step | What it does |
| --- | --- |
| `setup.md` | Asks which tools to connect. Writes `AGENTS.md`, `.agents`, and the links. Reads `package.json` and the other manifests. On a later run, reads `git log -1 -p` for those files. |
| `research.md` | Looks up skills and MCP servers for the dependencies, reads the docs for the version in the manifest, and prepares an offer. It does not install anything. |
| `interview.md` | Describes the architecture it can see and asks if that is right. Says which skills may be useful and waits for a yes. Writes a rule in the person's words, with no extra ban. |
| `verify.md` | Opens each file again and quotes a line from that read. A declined install, and an MCP the docs say this version cannot use, must be absent. |

Two examples:

- `package.json` depends on Next. Research finds the skill and MCP Vercel publishes. It does not offer an MCP when the docs require a newer version than the manifest.
- You say the team is trunk-based. The interview writes a rule that branches come off `main` and `main` is the trunk.

## What the skills will not do

- Install a skill, an MCP server, or a package before you say yes.
- Delete a file it did not write. An existing `.cursor`, `.claude`, or `.codex` directory stays. The skill adds a pointer inside it.
- Read `.env`, `.env.*`, `*.pem`, or `*.key`.
- Invent a stack by reading source files. Dependencies come from manifests. Architecture questions come from the directories and entry points the interview names.
- Upload your repository. A documentation fetch uses a URL the agent shows you first.

## Repository layout

| Path | Role |
| --- | --- |
| `.agents/skills/socratic/SKILL.md` | The only installed skill. Runs first. |
| `.agents/skills/socratic/setup.md` | Files, tool links, manifests, later-run diff. |
| `.agents/skills/socratic/research.md` | Reads the docs for the version in the manifest and prepares an offer of skills and MCP servers. It does not write a doc. It does not install anything. |
| `.agents/skills/socratic/interview.md` | Code reading, vendor asks, rules and skills. |
| `.agents/skills/socratic/verify.md` | The file check at the end of a run. |
| `test/skills.test.js` | Checks that `socratic` is the only installed skill and that the steps still say the limits above. |

## Verify

```bash
npm test
```

## Influences

This project owes a lot to Matt Pocock and poteto. Matt's [Skills for Real Engineers](https://github.com/mattpocock/skills) shaped how we think about grilling a plan before an agent writes code. poteto's [How](https://github.com/poteto/how) and [Poteto mode](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md) shaped how we explain architecture, keep changes small, and prove the work.

## Open source

- [LICENSE](./LICENSE). MIT, Copyright (c) 2026 Bryon Larrance.
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [SECURITY.md](./SECURITY.md)

## Feedback

Issues are for a session where the skill did the wrong thing. The standard is [SCOPE.md](./SCOPE.md). Questions go to [discussions](https://github.com/beelarr/soc/discussions).

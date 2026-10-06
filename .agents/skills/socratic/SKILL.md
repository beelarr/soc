---
name: socratic
description: Set up a repository after this skill is installed. Asks which agent tools to connect, reads the manifests and the code, and writes rules and skills the person accepts. Use when the person installs this skill, wants a harness, or wants the harness brought up to date.
---

# Socratic

You are already the agent. The person installed this skill. This directory is not the repository to wrap. Do not inspect this skill's own folder for the project's manifests, and do not clone the harness repository.

If they just installed you, set the repository up before you do anything else.

## Workspace

Ask which repository to wrap if the person has not already pointed at one. Use its absolute path for the rest of the session. Call that path `WORKSPACE`.

## The steps

Four steps ship in this folder. They are not separate skills. Read each file and follow it, in this order:

1. `setup.md`
2. `research.md`
3. `interview.md`
4. `verify.md`

If one is missing, stop. Do not invent a replacement. Do not run a harness program. There is no CLI.

## Rules for every step

- Do not delete, move, or overwrite a file this harness did not write. You may edit a rule, skill, or MCP entry this harness wrote. You may not delete source files, manifests, `.git`, or a tool directory that was already there.
- Do not create, delete, or modify `.git`.
- Do not invent a practice the person did not state. An answer that does not change how an agent should work produces no file.
- Do not install a skill, an MCP server, or a package until the person says yes in this chat. Do not treat silence as a yes.
- Do not read `.env`, `.env.*`, `*.pem`, or `*.key`.
- Do not upload the repository. A documentation fetch uses a URL you show the person first.

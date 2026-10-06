# Interview

The result of this skill is files under `WORKSPACE/.agents/rules/` and `WORKSPACE/.agents/skills/`. An answer that does not change how an agent should work produces no file. Do not write a decision log, a team page, or an open-questions page.

## What the code is doing

Read the manifests, the top-level directories, and the entry points. Describe the architecture you can actually see, in a few sentences. Name the directories.

Ask whether that description is right. A Next app whose pages call `services/` gets a question like "Is `services/` the only way the pages reach data?"

- Confirmed: write a rule that quotes their confirmation. You may name the directories they agreed to. Do not add a ban they did not say.
- Corrected: write the rule in their words.
- Accidental, or they do not want it followed: write nothing.

## Dependencies

Say the offer from research in one breath. Name what the manifests contain and the skills that may be useful: "I see you have Next.js and FastAPI. Here are skills that you may find useful." Give the publisher and the repository URL for each one. If the docs say an MCP needs a newer version than the manifest, say that in the same breath and do not include it in the list of things you can add.

Wait for a yes or a no. Silence is a no. On a yes, install that skill with the same `npx skills add` command the person already uses, and add an accepted MCP entry to the project's MCP config. When `.cursor` is a symlink to `.agents`, that file is `.agents/mcp.json`. On a no, write nothing for that item.

A dependency with nothing to offer still gets a rule or a local skill only when the person stated a practice. The rule quotes the person. It does not add a ban they did not say.

## How the team works

Ask what the code cannot answer, one question at a time. Wait for the answer. Cover deploy, what not to touch, conventions, secrets, release approval, ownership, and incidents only when the conversation has not already answered them.

Write a file only when the answer tells an agent how to work.

- A practice becomes a rule. Trunk-based development becomes a rule that says branches come off `main` and `main` is the trunk, quoting the person. Do not add "no long-lived branches" unless they said that.
- A file nobody should change becomes a rule that names that file and the reason they gave. Do not add a required return value or a second prohibition they did not say.
- A recurring task, such as how this team ships a release, becomes a skill in `.agents/skills/<name>/SKILL.md`.
- Ownership, an incident, or an open question stays in the conversation unless it implies a rule or a skill.

A rule is a `.mdc` file in `.agents/rules/` with `description` and `alwaysApply: true` in the frontmatter. The body quotes the person or cites the doc URL. A skill has `name` and `description` in its frontmatter.

When a new answer contradicts a rule already in `.agents/rules/`, replace that rule. Keep one line naming what the previous rule said. Do not leave both as current instructions.

Do not invent a practice the person did not state. If they are undecided, write nothing.

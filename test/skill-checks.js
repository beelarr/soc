import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(repoRoot, ".agents", "skills");
const socraticDir = path.join(skillsDir, "socratic");

const STEPS = ["setup.md", "research.md", "interview.md", "verify.md"];

const REQUIRED = [
  ["SKILL.md", "setup.md"],
  ["SKILL.md", "research.md"],
  ["SKILL.md", "interview.md"],
  ["SKILL.md", "verify.md"],
  ["SKILL.md", "They are not separate skills"],
  ["SKILL.md", "Do not delete, move, or overwrite a file this harness did not write"],
  ["SKILL.md", "Do not create, delete, or modify `.git`"],
  ["setup.md", "Do not delete it"],
  ["setup.md", "package.json"],
  ["setup.md", "including subfolders"],
  ["setup.md", "git log -1 -p"],
  ["setup.md", ".cursor` symlinks to `.agents"],
  ["setup.md", "The `socratic` skill the installer copied does not count."],
  ["setup.md", ".cursor/rules/agents.mdc"],
  ["setup.md", "do not write `.cursor/AGENTS.md`"],
  ["setup.md", "Do not write `.codex/AGENTS.md`"],
  ["research.md", "I see you have Next.js and FastAPI. Here are skills that you may find useful."],
  ["research.md", "needs a newer version"],
  ["interview.md", "Silence is a no"],
  ["interview.md", "main` is the trunk"],
  ["interview.md", "Do not add a ban they did not say"],
  ["verify.md", "Open each file again"],
];

const BANNED = [
  "npx github:beelarr/agent-engineering-contract",
  "npx socratic-engineering",
  "socratic-engineering init",
];

export async function checkSkills() {
  const failures = [];
  const texts = new Map();

  let entries = [];
  try {
    entries = await readdir(skillsDir);
  } catch {
    failures.push(`missing ${skillsDir}`);
    return { failures, skills: [] };
  }

  const skillFiles = [];
  for (const entry of entries) {
    try {
      await readFile(path.join(skillsDir, entry, "SKILL.md"));
      skillFiles.push(entry);
    } catch {
      continue;
    }
  }
  if (skillFiles.length !== 1 || skillFiles[0] !== "socratic") {
    failures.push(`installable skills are ${skillFiles.join(", ") || "none"}; expected only socratic`);
  }

  const skill = await readFile(path.join(socraticDir, "SKILL.md"), "utf8").catch(() => "");
  if (!skill) {
    failures.push("missing socratic/SKILL.md");
  } else {
    texts.set("SKILL.md", skill);
    if (!/^name:\s*socratic$/m.test(skill)) {
      failures.push("socratic frontmatter name is not socratic");
    }
  }

  for (const step of STEPS) {
    const text = await readFile(path.join(socraticDir, step), "utf8").catch(() => "");
    if (!text) {
      failures.push(`missing ${step}`);
      continue;
    }
    texts.set(step, text);
    if (text.startsWith("---\n")) {
      failures.push(`${step} has skill frontmatter and would install as its own skill`);
    }
  }

  for (const text of texts.values()) {
    for (const banned of BANNED) {
      if (text.includes(banned)) {
        failures.push(`a socratic file tells the agent to run ${banned}`);
      }
    }
  }

  for (const [file, needle] of REQUIRED) {
    const text = texts.get(file);
    if (text && !text.includes(needle)) {
      failures.push(`${file} is missing ${JSON.stringify(needle)}`);
    }
  }

  return { failures, skills: skillFiles };
}

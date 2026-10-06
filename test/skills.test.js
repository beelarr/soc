import assert from "node:assert/strict";
import { test } from "node:test";
import { checkSkills } from "./skill-checks.js";

test("socratic is the only installable skill, and none of the files invokes a CLI", async () => {
  const result = await checkSkills();
  assert.deepEqual(result.failures, []);
});

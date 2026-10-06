import assert from "node:assert/strict";
import { test } from "node:test";
import { checkSkills } from "./skill-checks.js";

test("the five skills are the harness, and none of them invokes a CLI", async () => {
  const result = await checkSkills();
  assert.deepEqual(result.failures, []);
});

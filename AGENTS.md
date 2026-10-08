# SOC

This repository is the `socratic` skill. Harness instructions for some other project do not belong here.

## Commits

A merge to `main` publishes a version from the commits since the last tag. The highest bump in that range wins. The type is lowercase. A scope is optional: `feat(readme): explain install`.

- `fix: correct the pointer file` publishes a patch, `v0.1.1`.
- `feat: add a third step` publishes a minor, `v0.2.0`.
- `feat!: drop an old step` publishes a major, `v1.0.0`. `fix!:` does too. A body line `BREAKING CHANGE: drop an old step` does too.
- `docs:`, `chore:`, `refactor:`, `test:`, and `ci:` publish nothing.

If GitHub squashes the pull request, the title is the commit that lands on `main`. Write that title in this form.

# Verify

Run this after the other three steps. The conversation is not the record. Open each file again and quote a line you just read. Do not quote from memory of writing it.

For each rule in `WORKSPACE/.agents/rules/` and each skill in `WORKSPACE/.agents/skills/` written during this run:

- Quote a line from the file you just opened.
- If that line adds a ban the person did not say, say so. Do not fix it silently. Ask the person, then fix it.

For each vendor skill or MCP the person declined, confirm it is absent from `.agents/skills/` and from the MCP config.

For each MCP whose docs require a newer version than the manifest, confirm it is absent.

For each vendor skill or MCP the person accepted, confirm the install is present.

List anything the person accepted that has no file yet.

End with that list. A summary that only restates the chat is not a pass.

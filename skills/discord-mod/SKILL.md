# Discord Mod Skill

## Purpose
Use classic Discord slash commands for routine moderation to reduce token usage.

## Command Logic
When users ask for moderation actions (ban, kick, role changes, purge, lock, etc.), prefer command flow:

1. Tell them to use the slash command.
2. If they have permission, execute command successfully.
3. If they don't have role/permission:
   - For mod commands -> "Tu as besoin de permissions modo"
   - For admin commands -> "Tu as besoin de permissions admin"

## Roles & Access
- **No role**: denied for protected commands.
- **Moderator**: can run mod commands (ban/kick/timeout/purge/slowmode/lock/unlock/pin).
- **Admin**: can run all mod commands + admin role management commands.

## Core Commands
- `/ban user reason`
- `/kick user reason`
- `/timeout user minutes reason`
- `/role-add user role` (admin)
- `/role-remove user role` (admin)
- `/purge count`
- `/lock`
- `/unlock`
- `/slowmode seconds`
- `/pin message_id`
- `/unpin message_id`
- `/help-mod`

## Notes
- Keep responses short and clear.
- For sensitive actions, ask confirmation if context is ambiguous.
- Prefer slash commands over free-text moderation whenever possible.

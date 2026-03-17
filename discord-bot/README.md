# Discord Moderation Bot (classic commands)

Bot Discord avec commandes slash pour modération classique (style MEE6/Carl-bot de base), pour éviter de passer par l'IA pour chaque action.

## Setup

1. Créer une app bot sur Discord Developer Portal
2. Inviter le bot avec permissions mod/admin nécessaires
3. Copier `.env.example` vers `.env` puis remplir:
   - `DISCORD_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `DISCORD_GUILD_ID`
   - `MOD_ROLE_IDS` (IDs rôles mod, séparés par virgule)
   - `ADMIN_ROLE_IDS` (IDs rôles admin, séparés par virgule)

## Install

```bash
cd discord-bot
npm install
npm run deploy
npm start
```

## Commandes

- `/ban`
- `/kick`
- `/timeout`
- `/role-add` (admin)
- `/role-remove` (admin)
- `/purge`
- `/lock`
- `/unlock`
- `/slowmode`
- `/pin`
- `/unpin`
- `/help-mod`

## Permission logic

- Sans rôle/permission -> refus + message explicite
- Modo -> commandes modération
- Admin -> commandes admin + modération

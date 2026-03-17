import "dotenv/config";
import { REST, Routes } from "discord.js";
import { commands } from "./commands.js";

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
  throw new Error("Missing env vars: DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID");
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
  body: commands,
});

console.log("✅ Slash commands deployed.");

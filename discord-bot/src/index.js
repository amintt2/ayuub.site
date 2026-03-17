import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Partials,
  PermissionsBitField,
} from "discord.js";
import { canAdmin, canModerate, denyMessage, parseIds } from "./permissions.js";

const modRoleIds = parseIds(process.env.MOD_ROLE_IDS || "");
const adminRoleIds = parseIds(process.env.ADMIN_ROLE_IDS || "");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Channel],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

function ensurePermission(interaction, level = "mod") {
  const member = interaction.member;
  const ok = level === "admin" ? canAdmin(member, adminRoleIds) : canModerate(member, modRoleIds);
  if (!ok) {
    interaction.reply({ content: denyMessage(level), ephemeral: true });
    return false;
  }
  return true;
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = interaction.commandName;

  try {
    if (cmd === "help-mod") {
      return interaction.reply({
        ephemeral: true,
        content:
          "**Commandes modération**\n" +
          "`/ban /kick /timeout /role-add /role-remove /purge /lock /unlock /slowmode /pin /unpin`\n" +
          "- Utilisateur sans rôle: refus + message permission\n" +
          "- Modo: actions de modération\n" +
          "- Admin: toutes actions",
      });
    }

    if (["ban", "kick", "timeout", "purge", "lock", "unlock", "slowmode", "pin", "unpin"].includes(cmd)) {
      if (!ensurePermission(interaction, "mod")) return;
    }
    if (["role-add", "role-remove"].includes(cmd)) {
      if (!ensurePermission(interaction, "admin")) return;
    }

    if (cmd === "ban") {
      const user = interaction.options.getUser("user", true);
      const reason = interaction.options.getString("reason") || "No reason";
      await interaction.guild.members.ban(user.id, { reason });
      return interaction.reply(`✅ ${user.tag} banni. Raison: ${reason}`);
    }

    if (cmd === "kick") {
      const user = interaction.options.getUser("user", true);
      const reason = interaction.options.getString("reason") || "No reason";
      const member = await interaction.guild.members.fetch(user.id);
      await member.kick(reason);
      return interaction.reply(`✅ ${user.tag} expulsé. Raison: ${reason}`);
    }

    if (cmd === "timeout") {
      const user = interaction.options.getUser("user", true);
      const minutes = interaction.options.getInteger("minutes", true);
      const reason = interaction.options.getString("reason") || "No reason";
      const member = await interaction.guild.members.fetch(user.id);
      await member.timeout(minutes * 60 * 1000, reason);
      return interaction.reply(`✅ ${user.tag} timeout ${minutes} min.`);
    }

    if (cmd === "role-add") {
      const user = interaction.options.getUser("user", true);
      const role = interaction.options.getRole("role", true);
      const member = await interaction.guild.members.fetch(user.id);
      await member.roles.add(role);
      return interaction.reply(`✅ Rôle ${role} ajouté à ${user.tag}.`);
    }

    if (cmd === "role-remove") {
      const user = interaction.options.getUser("user", true);
      const role = interaction.options.getRole("role", true);
      const member = await interaction.guild.members.fetch(user.id);
      await member.roles.remove(role);
      return interaction.reply(`✅ Rôle ${role} retiré à ${user.tag}.`);
    }

    if (cmd === "purge") {
      const count = interaction.options.getInteger("count", true);
      await interaction.channel.bulkDelete(count, true);
      return interaction.reply({ content: `✅ ${count} messages supprimés.`, ephemeral: true });
    }

    if (cmd === "lock") {
      const everyone = interaction.guild.roles.everyone;
      await interaction.channel.permissionOverwrites.edit(everyone, {
        SendMessages: false,
      });
      return interaction.reply("🔒 Salon verrouillé.");
    }

    if (cmd === "unlock") {
      const everyone = interaction.guild.roles.everyone;
      await interaction.channel.permissionOverwrites.edit(everyone, {
        SendMessages: null,
      });
      return interaction.reply("🔓 Salon déverrouillé.");
    }

    if (cmd === "slowmode") {
      const seconds = interaction.options.getInteger("seconds", true);
      await interaction.channel.setRateLimitPerUser(seconds);
      return interaction.reply(`🐢 Slowmode réglé à ${seconds}s.`);
    }

    if (cmd === "pin" || cmd === "unpin") {
      const targetId = interaction.options.getString("message_id", true);
      const msg = await interaction.channel.messages.fetch(targetId);
      if (!msg) return interaction.reply({ content: "❌ Message introuvable.", ephemeral: true });
      if (cmd === "pin") {
        await msg.pin();
        return interaction.reply("📌 Message épinglé.");
      }
      await msg.unpin();
      return interaction.reply("📍 Message désépinglé.");
    }
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      return interaction.followUp({ content: "❌ Erreur pendant la commande.", ephemeral: true });
    }
    return interaction.reply({ content: "❌ Erreur pendant la commande.", ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);

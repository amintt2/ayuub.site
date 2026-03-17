import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannir un utilisateur")
    .addUserOption((o) => o.setName("user").setDescription("Utilisateur").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Raison"))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulser un utilisateur")
    .addUserOption((o) => o.setName("user").setDescription("Utilisateur").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Raison"))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout un utilisateur")
    .addUserOption((o) => o.setName("user").setDescription("Utilisateur").setRequired(true))
    .addIntegerOption((o) => o.setName("minutes").setDescription("Durée en minutes").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Raison"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  new SlashCommandBuilder()
    .setName("role-add")
    .setDescription("Ajouter un rôle à un utilisateur")
    .addUserOption((o) => o.setName("user").setDescription("Utilisateur").setRequired(true))
    .addRoleOption((o) => o.setName("role").setDescription("Rôle").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  new SlashCommandBuilder()
    .setName("role-remove")
    .setDescription("Retirer un rôle à un utilisateur")
    .addUserOption((o) => o.setName("user").setDescription("Utilisateur").setRequired(true))
    .addRoleOption((o) => o.setName("role").setDescription("Rôle").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Supprimer des messages")
    .addIntegerOption((o) =>
      o.setName("count").setDescription("Nombre de messages (1-100)").setRequired(true).setMinValue(1).setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Verrouiller le salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Déverrouiller le salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Définir le slowmode")
    .addIntegerOption((o) => o.setName("seconds").setDescription("Secondes").setRequired(true).setMinValue(0).setMaxValue(21600))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  new SlashCommandBuilder()
    .setName("pin")
    .setDescription("Épingler un message par ID")
    .addStringOption((o) => o.setName("message_id").setDescription("ID du message").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  new SlashCommandBuilder()
    .setName("unpin")
    .setDescription("Désépingler un message par ID")
    .addStringOption((o) => o.setName("message_id").setDescription("ID du message").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  new SlashCommandBuilder()
    .setName("help-mod")
    .setDescription("Voir les commandes de modération")
].map((c) => c.toJSON());

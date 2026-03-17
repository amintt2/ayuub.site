export function parseIds(raw = "") {
  return raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function hasAnyRole(member, roleIds = []) {
  if (!member || !roleIds.length) return false;
  return roleIds.some((id) => member.roles.cache.has(id));
}

export function canModerate(member, modRoleIds) {
  return member.permissions.has("ModerateMembers") || hasAnyRole(member, modRoleIds);
}

export function canAdmin(member, adminRoleIds) {
  return member.permissions.has("Administrator") || hasAnyRole(member, adminRoleIds);
}

export function denyMessage(level = "mod") {
  if (level === "admin") {
    return "❌ Tu as besoin de permissions **admin** pour cette commande.";
  }
  return "❌ Tu as besoin de permissions **modo** pour cette commande.";
}

const BASE_URL = "https://valorant-api.com/v1";

function cleanEnum(value) {
  if (!value) return null;
  return value.split("::").pop();
}

function simplifyWeapon(weapon) {
  const stats = weapon.weaponStats;

  return {
    uuid: weapon.uuid,
    displayName: weapon.displayName,
    category: cleanEnum(weapon.category),
    shopCategory: weapon.shopData?.category ?? "Melee",
    displayIcon: weapon.displayIcon,
    cost: weapon.shopData?.cost ?? null,
    stats: stats
      ? {
          fireRate: stats.fireRate,
          magazineSize: stats.magazineSize,
          reloadTimeSeconds: stats.reloadTimeSeconds,
          runSpeedMultiplier: stats.runSpeedMultiplier,
          wallPenetration: cleanEnum(stats.wallPenetration),
          damage: stats.damageRanges?.[0]
            ? {
                head: stats.damageRanges[0].headDamage,
                body: stats.damageRanges[0].bodyDamage,
                leg: stats.damageRanges[0].legDamage,
              }
            : null,
        }
      : null,
  };
}

export async function getWeapons() {
  const res = await fetch(`${BASE_URL}/weapons`);

  if (!res.ok) {
    throw new Error(`Failed to fetch weapons: ${res.status}`);
  }

  const json = await res.json();
  return json.data.map(simplifyWeapon);
}

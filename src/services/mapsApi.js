const BASE_URL = "https://valorant-api.com/v1";

function simplifyMap(map) {
  return {
    uuid: map.uuid,
    displayName: map.displayName,
    sites: map.tacticalDescription,
    coordinates: map.coordinates,
    splash: map.splash,
    listViewIcon: map.listViewIconTall || map.listViewIcon,
    minimap: map.displayIcon,
  };
}

export async function getMaps() {
  const res = await fetch(`${BASE_URL}/maps`);

  if (!res.ok) {
    throw new Error(`Failed to fetch maps: ${res.status}`);
  }

  const json = await res.json();
  return json.data
    .filter((map) => map.tacticalDescription !== null)
    .map(simplifyMap);
}

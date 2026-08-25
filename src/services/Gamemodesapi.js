const BASE_URL = "https://valorant-api.com/v1";

function simplifyGameMode(mode) {
  return {
    uuid: mode.uuid,
    displayName: mode.displayName,
    description: mode.description,
    duration: mode.duration,
    displayIcon: mode.displayIcon,
    allowsMatchTimeouts: mode.allowsMatchTimeouts,
    isTeamVoiceAllowed: mode.isTeamVoiceAllowed,
  };
}

export async function getGameModes() {
  const res = await fetch(`${BASE_URL}/gamemodes`);

  if (!res.ok) {
    throw new Error(`Failed to fetch game modes: ${res.status}`);
  }

  const json = await res.json();
  return json.data
    .filter((mode) => mode.displayIcon !== null)
    .map(simplifyGameMode);
}

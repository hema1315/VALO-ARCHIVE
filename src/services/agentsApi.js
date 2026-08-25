const BASE_URL = "https://valorant-api.com/v1";

export async function getAgents() {
  const res = await fetch(`${BASE_URL}/agents?isPlayableCharacter=true`);

  if (!res.ok) {
    throw new Error(`Failed to fetch agents: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export async function getAgentById(uuid) {
  const res = await fetch(`${BASE_URL}/agents/${uuid}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch agent: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

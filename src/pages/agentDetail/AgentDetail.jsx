import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAgentById } from "../../services/agentsApi";
import OptimizedImage from "../../components/Optimizedimage";
import "./agentDetail.css";

const SLOT_LABELS = {
  Ability1: "C",
  Ability2: "Q",
  Grenade: "E",
  Ultimate: "X",
  Passive: "PASSIVE",
};

const SLOT_ORDER = ["Passive", "Ability1", "Ability2", "Grenade", "Ultimate"];

function AgentDetail() {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    setAgent(null);

    getAgentById(agentId)
      .then((data) => {
        if (!isMounted) return;
        setAgent(data);
        setStatus("success");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, [agentId]);

  const abilities = agent?.abilities
    ?.filter((a) => a.slot !== "Ability" && a.displayName)
    .sort((a, b) => SLOT_ORDER.indexOf(a.slot) - SLOT_ORDER.indexOf(b.slot));

  return (
    <section className="agent-detail-page">
      <Link to="/agents" className="back-link">
        &larr; Back to Roster
      </Link>

      {status === "loading" && (
        <div className="agent-detail-loading">
          <div className="agent-detail-scanline"></div>
          <p>DECRYPTING AGENT FILE_</p>
        </div>
      )}

      {status === "error" && (
        <p className="agent-detail-error">
          Couldn&apos;t load this agent&apos;s file. Check your connection and
          try again.
        </p>
      )}

      {status === "success" && agent && (
        <>
          {/* Hero */}
          <div className="agent-hero">
            <div className="agent-hero-visual">
              <OptimizedImage
                src={agent.fullPortrait}
                alt={agent.displayName}
                width={520}
                className="agent-hero-portrait"
                fetchPriority="high"
              />
            </div>

            <div className="agent-hero-content">
              <div className="agent-file-tag">AGENT FILE</div>

              {agent.role && (
                <div className="agent-role">
                  <OptimizedImage
                    src={agent.role.displayIcon}
                    alt={agent.role.displayName}
                    width={40}
                    className="agent-role-icon"
                  />
                  <span>{agent.role.displayName}</span>
                </div>
              )}

              <h1 className="agent-name">{agent.displayName}</h1>

              {agent.description && (
                <p className="agent-description">{agent.description}</p>
              )}
            </div>
          </div>

          {/* Abilities */}
          {abilities?.length > 0 && (
            <div className="agent-abilities">
              <div className="abilities-header">
                <span className="abilities-tag">// KIT BREAKDOWN</span>
                <h2 className="abilities-title">Abilities</h2>
              </div>

              <div className="abilities-grid">
                {abilities.map((ability) => (
                  <div className="ability-card" key={ability.slot}>
                    <div className="ability-top">
                      {ability.displayIcon ? (
                        <OptimizedImage
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          width={80}
                          className="ability-icon"
                        />
                      ) : (
                        <div className="ability-icon-placeholder"></div>
                      )}
                      <span className="ability-slot">
                        {SLOT_LABELS[ability.slot] || ability.slot}
                      </span>
                    </div>

                    <h3 className="ability-name">{ability.displayName}</h3>
                    <p className="ability-description">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AgentDetail;

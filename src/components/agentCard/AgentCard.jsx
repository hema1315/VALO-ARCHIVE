import { Link } from "react-router-dom";
import "./agentCard.css";
import OptimizedImage from "../Optimizedimage";


function AgentCard({ agent }) {
  const {
    uuid,
    displayName,
    role,
    fullPortraitV2,
    fullPortrait,
    backgroundGradientColors,
  } = agent;

  const portrait = fullPortraitV2 || fullPortrait;

  const gradientTop = backgroundGradientColors?.[0]
    ? `#${backgroundGradientColors[0].slice(0, 6)}`
    : "var(--bg-secondary)";

  return (
    <Link
      to={`/agents/${uuid}`}
      className="agent-card"
      style={{ "--agent-glow": gradientTop }}
    >
      <div className="agent-card-frame">
        <div className="agent-card-glow"></div>

        {role?.displayIcon && (
          <OptimizedImage
            className="agent-card-role"
            src={role.displayIcon}
            alt={role.displayName}
            width={48}
          />
        )}

        <OptimizedImage
          className="agent-card-portrait"
          src={portrait}
          alt={displayName}
          width={360}
        />

        <div className="agent-card-scanline"></div>
      </div>

      <div className="agent-card-info">
        <span className="agent-card-name">{displayName}</span>
        {role?.displayName && (
          <span className="agent-card-role-name">{role.displayName}</span>
        )}
      </div>
    </Link>
  );
}

export default AgentCard;

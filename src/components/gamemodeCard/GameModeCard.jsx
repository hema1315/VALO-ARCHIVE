import "./gameModeCard.css";
import OptimizedImage from "../Optimizedimage";

function GameModeCard({ gameMode, isExpanded, onToggle }) {
  const {
    displayName,
    description,
    duration,
    displayIcon,
    allowsMatchTimeouts,
    isTeamVoiceAllowed,
  } = gameMode;

  const formatDuration = (val) => {
    if (!val) return "—";
    if (typeof val === "string") return val;
    return `${val} MINS`;
  };

  return (
    <div className={`gamemode-card ${isExpanded ? "is-expanded" : ""}`}>
      <span className="gamemode-corner gamemode-corner-tl"></span>
      <span className="gamemode-corner gamemode-corner-br"></span>

      <button
        type="button"
        className="gamemode-card-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="gamemode-card-icon-plate">
          {displayIcon && (
            <OptimizedImage src={displayIcon} alt={displayName} width={100} />
          )}
        </div>

        <span className="gamemode-card-name">{displayName}</span>

        <svg
          className="gamemode-card-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className="gamemode-card-collapse">
        <div className="gamemode-card-collapse-inner">
          <div className="gamemode-card-stats-grid">
            <div className="gamemode-stat">
              <span className="gamemode-stat-label">Duration</span>
              <span className="gamemode-stat-value gamemode-stat-value-sm">
                {formatDuration(duration)}
              </span>
            </div>
            <div className="gamemode-stat">
              <span className="gamemode-stat-label">Team Voice</span>
              <span className="gamemode-stat-value">
                {isTeamVoiceAllowed ? "Yes" : "No"}
              </span>
            </div>
            <div className="gamemode-stat">
              <span className="gamemode-stat-label">Timeouts</span>
              <span className="gamemode-stat-value">
                {allowsMatchTimeouts ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {description && (
            <p className="gamemode-card-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModeCard;

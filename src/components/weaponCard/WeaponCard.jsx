import { useState } from "react";
import "./weaponCard.css";
import OptimizedImage from "../Optimizedimage";


function WeaponCard({ weapon }) {
  const [expanded, setExpanded] = useState(false);
  const { displayName, category, displayIcon, cost, stats } = weapon;

  return (
    <div className={`weapon-card ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="weapon-card-header"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <div className="weapon-card-icon-plate">
          {displayIcon && (
            <OptimizedImage src={displayIcon} alt={displayName} width={100} />
          )}
        </div>

        <div className="weapon-card-heading">
          <span className="weapon-card-name">{displayName}</span>
          <span className="weapon-card-category">{category}</span>
        </div>

        <div className="weapon-card-side">
          {cost !== null && <span className="weapon-card-cost">{cost}</span>}
          <svg
            className="weapon-card-chevron"
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
        </div>
      </button>

      <div className="weapon-card-collapse">
        <div className="weapon-card-collapse-inner">
          {stats ? (
            <>
              <div className="weapon-card-stats-grid">
                <div className="weapon-stat">
                  <span className="weapon-stat-label">Fire Rate</span>
                  <span className="weapon-stat-value">
                    {stats.fireRate ?? "—"} <small>rps</small>
                  </span>
                </div>
                <div className="weapon-stat">
                  <span className="weapon-stat-label">Magazine</span>
                  <span className="weapon-stat-value">
                    {stats.magazineSize ?? "—"} <small>rds</small>
                  </span>
                </div>
                <div className="weapon-stat">
                  <span className="weapon-stat-label">Reload</span>
                  <span className="weapon-stat-value">
                    {stats.reloadTimeSeconds ?? "—"} <small>s</small>
                  </span>
                </div>
                <div className="weapon-stat">
                  <span className="weapon-stat-label">Wall Pen</span>
                  <span className="weapon-stat-value">
                    {stats.wallPenetration ?? "—"}
                  </span>
                </div>
              </div>

              {stats.damage && (
                <div className="weapon-damage-table">
                  <span className="weapon-damage-title">
                    Damage <small>(close range)</small>
                  </span>
                  <div className="weapon-damage-row">
                    <div className="weapon-damage-cell">
                      <span className="weapon-damage-value">
                        {stats.damage.head}
                      </span>
                      <span className="weapon-damage-label">Head</span>
                    </div>
                    <div className="weapon-damage-cell">
                      <span className="weapon-damage-value">
                        {stats.damage.body}
                      </span>
                      <span className="weapon-damage-label">Body</span>
                    </div>
                    <div className="weapon-damage-cell">
                      <span className="weapon-damage-value">
                        {stats.damage.leg}
                      </span>
                      <span className="weapon-damage-label">Legs</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="weapon-card-no-stats">
              No fire-arm stats for this weapon — melee equipment relies on
              range and swing timing instead.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeaponCard;

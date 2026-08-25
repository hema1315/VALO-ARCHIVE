import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGameModes } from "../../services/Gamemodesapi";

import "./gameModesPreview.css";
import GameModeCard from "../gamemodeCard/GameModeCard";

const FEATURED_GAME_MODE_NAMES = ["Standard", "Deathmatch", "Swiftplay"];

function GameModesPreviewLoadingSkeleton() {
  return (
    <div className="gamemodes-preview-grid">
      {Array.from({ length: FEATURED_GAME_MODE_NAMES.length }).map((_, i) => (
        <div className="gamemode-skeleton" key={i}>
          <div className="gamemode-skeleton-plate"></div>
          <div className="gamemode-skeleton-line"></div>
        </div>
      ))}
    </div>
  );
}

function GameModesPreview() {
  const [gameModes, setGameModes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getGameModes()
      .then((data) => {
        if (!isMounted) return;

        const featured = FEATURED_GAME_MODE_NAMES.map((name) =>
          data.find((mode) => mode.displayName === name),
        ).filter(Boolean);

        setGameModes(featured);
        setStatus("success");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggle = (uuid) => {
    setExpandedId((prevId) => (prevId === uuid ? null : uuid));
  };

  return (
    <section className="gamemodes-preview">
      <div className="gamemodes-preview-header">
        <div>
          <span className="gamemodes-preview-tag">
            <span className="gamemodes-preview-dot"></span>
            PROTOCOLS
          </span>
          <h2 className="gamemodes-preview-heading">
            GAME <span className="gamemodes-preview-accent">MODES</span>
          </h2>
          <p className="gamemodes-preview-subtext">
            Tap a mode to pull up its round structure and rules.
          </p>
        </div>

        <Link to="/gamemodes" className="gamemodes-preview-cta">
          <span>Show All</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {status === "loading" && <GameModesPreviewLoadingSkeleton />}

      {status === "error" && (
        <p className="gamemodes-preview-error">
          Couldn&apos;t load the game modes. Check your connection and try
          again.
        </p>
      )}

      {status === "success" && (
        <div className="gamemodes-preview-grid">
          {gameModes.map((gameMode, i) => (
            <div
              className="gamemode-card-wrapper"
              key={gameMode.uuid}
              style={{ "--i": i }}
            >
              <GameModeCard
                gameMode={gameMode}
                isExpanded={expandedId === gameMode.uuid}
                onToggle={() => handleToggle(gameMode.uuid)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default GameModesPreview;

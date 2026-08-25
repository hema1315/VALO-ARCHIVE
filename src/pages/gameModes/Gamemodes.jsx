import { useEffect, useState } from "react";
import { getGameModes } from "../../services/Gamemodesapi";
import OptimizedImage from "../../components/Optimizedimage";
import "./Gamemodes.css";

const ITEMS_PER_PAGE = 6;

function GameModes() {
  const [gameModes, setGameModes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    getGameModes()
      .then((data) => {
        if (!isMounted) return;
        setGameModes(data);
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

  const totalPages = Math.ceil(gameModes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentModes = gameModes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="gamemodes-page">
      <div className="gamemodes-page-header">
        <div>
          <span className="gamemodes-page-tag">
            <span className="gamemodes-page-dot"></span>
            PROTOCOLS
          </span>
          <h2 className="gamemodes-page-heading">
            GAME <span className="gamemodes-page-accent">MODES</span>
          </h2>
        </div>
      </div>

      {status === "loading" && (
        <div className="gamemodes-page-grid">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div className="gamemodes-page-skeleton" key={i}></div>
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="gamemodes-page-error">
          Couldn&apos;t load the game modes. Check your connection and try
          again.
        </p>
      )}

      {status === "success" && (
        <>
          <div className="gamemodes-page-grid">
            {currentModes.map((gameMode, i) => (
              <div
                className="gm-card-wrapper"
                key={gameMode.uuid}
                style={{ "--i": i }}
              >
                <div className="gm-card">
                  <div className="gm-card-header">
                    <div className="gm-card-icon-plate">
                      {gameMode.displayIcon && (
                        <OptimizedImage
                          src={gameMode.displayIcon}
                          alt={gameMode.displayName}
                          width={100}
                        />
                      )}
                    </div>

                    <div className="gm-card-heading">
                      <span className="gm-card-name">
                        {gameMode.displayName}
                      </span>
                      <span className="gm-card-duration">
                        {gameMode.duration || "—"}
                      </span>
                    </div>
                  </div>

                  {gameMode.description && (
                    <p className="gm-card-description">
                      {gameMode.description}
                    </p>
                  )}

                  <div className="gm-card-tags">
                    <span className="gm-card-tag">
                      Team Voice:{" "}
                      <b>{gameMode.isTeamVoiceAllowed ? "Yes" : "No"}</b>
                    </span>
                    <span className="gm-card-tag">
                      Timeouts:{" "}
                      <b>{gameMode.allowsMatchTimeouts ? "Yes" : "No"}</b>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="gamemodes-pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &larr; PREV
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-num ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                NEXT &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default GameModes;

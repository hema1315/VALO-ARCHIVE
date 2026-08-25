import { useEffect, useState } from "react";
import { getAgents } from "../../services/agentsApi";
import AgentCard from "../../components/agentCard/AgentCard";
import "./Agents.css";
import "../../components/agentsPreview/AgentsPreview";

const ITEMS_PER_PAGE = 12;

function Agents() {
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    getAgents()
      .then((data) => {
        if (!isMounted) return;
        setAgents(data);
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

  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAgents = agents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="agents-preview">
      <div className="agents-preview-header">
        <div>
          <span className="agents-preview-tag">
            <span className="agents-preview-dot"></span>
            ROSTER
          </span>
          <h2 className="agents-preview-heading">
            MEET THE <span className="agents-preview-accent">AGENTS</span>
          </h2>
        </div>
      </div>

      {status === "loading" && (
        <div className="agents-preview-grid">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div className="agent-skeleton" key={i}>
              <div className="agent-skeleton-frame"></div>
              <div className="agent-skeleton-line"></div>
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="agents-preview-error">
          Couldn&apos;t load the roster. Check your connection and try again.
        </p>
      )}

      {status === "success" && (
        <>
          <div className="agents-preview-grid">
            {currentAgents.map((agent, i) => (
              <div
                className="agent-card-wrapper"
                key={agent.uuid}
                style={{ "--i": i }}
              >
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="agents-pagination">
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

export default Agents;

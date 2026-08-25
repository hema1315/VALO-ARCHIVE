import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAgents } from "../../services/agentsApi";

import "./agentsPreview.css";
import AgentCard from "../agentCard/AgentCard";

const PREVIEW_COUNT = 18;

function AgentsPreview() {
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    let isMounted = true;

    getAgents()
      .then((data) => {
        if (!isMounted) return;
        setAgents(data.slice(12, PREVIEW_COUNT));
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

        <Link to="/agents" className="agents-preview-cta">
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

      {status === "loading" && (
        <div className="agents-preview-grid">
          {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
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
        <div className="agents-preview-grid">
          {agents.map((agent, i) => (
            <div
              className="agent-card-wrapper"
              key={agent.uuid}
              style={{ "--i": i }}
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AgentsPreview;

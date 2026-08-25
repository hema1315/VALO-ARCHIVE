import { Link } from "react-router-dom";
import "./aboutPrev.css";

function AboutPrev() {
  return (
    <section className="about-preview">
      <div className="about-corner about-corner-tl"></div>
      <div className="about-corner about-corner-br"></div>

      <div className="about-preview-inner">
        <span className="about-tag">
          <span className="about-tag-dot"></span>
          MISSION BRIEFING
        </span>

        <h2 className="about-heading">
          ABOUT <span className="about-heading-accent">THE ARCHIVE</span>
        </h2>

        <p className="about-copy">
          A fan-built intel database for Valorant — agents, weapons, maps and
          modes broken down and catalogued in one place. No fluff, just the data
          you need before you queue up.
        </p>

        <Link to="/about" className="about-link">
          <span>Learn More</span>
          <svg
            className="about-link-arrow"
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
    </section>
  );
}

export default AboutPrev;

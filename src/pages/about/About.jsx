import { Link } from "react-router-dom";
import "./about.css";

const SECTIONS = [
  {
    name: "Agents",
    path: "/agents",
    desc: "Full roster with abilities breakdown",
  },
  { name: "Weapons", path: "/weapons", desc: "Arsenal stats and loadout data" },
  { name: "Maps", path: "/maps", desc: "Every battleground, tactical view" },
  { name: "Game Modes", path: "/gamemodes", desc: "Rules and round structure" },
  { name: "Tiers", path: "/tiers", desc: "The competitive rank ladder" },
  {
    name: "Collections",
    path: "/collections",
    desc: "Player cards and sprays",
  },
];

function About() {
  return (
    <section className="about-page">
      <div className="about-header">
        <span className="about-tag">
          <span className="about-dot"></span>
          ABOUT
        </span>
        <h2 className="about-heading">
          ABOUT <span className="about-accent">THIS ARCHIVE</span>
        </h2>
      </div>


      <div className="about-intro">
        <p>
          VALO ARCHIVE is an independent, fan-built database for Valorant. It
          exists for one reason: to give players fast access to accurate game
          data without digging through wikis or outdated posts.
        </p>
        <p>
          Every agent, weapon, map, and rank shown here is pulled live from Riot
          Games&apos; public data source and kept up to date automatically.
        </p>
      </div>

      <div className="about-sections">
        <div className="about-sections-head">
          <span className="about-sections-tag">// WHAT&apos;S INSIDE</span>
        </div>

        <div className="about-sections-list">
          {SECTIONS.map((s) => (
            <Link to={s.path} className="about-section-row" key={s.path}>
              <span className="section-name">{s.name}</span>
              <span className="section-desc">{s.desc}</span>
              <span className="section-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="about-creator">
        <span className="about-sections-tag">// CREATED BY</span>

        <div className="creator-row">
          <p className="creator-name">IBRAHIM MAHMOUD</p>

          <div className="creator-links">
            <a
              href="https://github.com/hema1315"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="creator-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ibrahim-mahmoud-88b491335/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="creator-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/ibrahim.mahmoud.226325/?locale=ar_AR"
              target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="creator-link">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="about-legal">
        <span className="about-sections-tag">// DISCLAIMER</span>
        <p>
          VALO ARCHIVE is not affiliated with, endorsed by, or connected to Riot
          Games, Inc. in any way. Valorant and all related assets, names, and
          data are trademarks and property of Riot Games, Inc. All game data
          displayed here is sourced from the public, community-run{" "}
          href="https://valorant-api.com" target="_blank" rel="noopener
          noreferrer"
          <a>valorant-api.com</a>.
        </p>
      </div>
    </section>
  );
}

export default About;

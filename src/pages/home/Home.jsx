import { Link } from "react-router-dom";
import "./Home.css";
import AboutPrev from "../../components/about/AboutPrev";
import AgentsPreview from "../../components/agentsPreview/AgentsPreview";
import WeaponsPreview from "../../components/weaponsPreview/WeaponsPreview";
import MapsPreview from "../../components/mapsPreview/MapsPreview";
import GameModesPreview from "../../components/GamemodesPreview/GameModesPreview";
import TiersCollectionsPreview from "../../components/TiersCollectionsPreview/TiersCollectionsPreview";

const ROLES = [
  {
    index: "01",
    name: "DUELIST",
    desc: "First through the door, first to frag.",
  },
  {
    index: "02",
    name: "INITIATOR",
    desc: "Clears the way before the team pushes in.",
  },
  {
    index: "03",
    name: "CONTROLLER",
    desc: "Cuts sightlines, owns the space.",
  },
  {
    index: "04",
    name: "SENTINEL",
    desc: "Locks the flank, holds the line.",
  },
];

function Home() {
  return (
    <div className="home">
      <div className="boot-overlay">
        <p className="boot-line">
          <span className="boot-prompt">&gt;</span> LOCK IN
          <span className="boot-cursor">_</span>
        </p>
      </div>

      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="valoBack.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="dossier">
          <div className="file-stamp">LOCK IN</div>
          <div className="file-meta">AGENT NO. 000</div>

          <h1 className="dossier-title">
            <span className="title-line">KNOW</span>
            <span className="title-line title-accent">YOUR AGENT</span>
          </h1>

          <p className="dossier-text">
            Every ability, every role, every play style — indexed and ready
            before you lock in.
          </p>

          <div className="status-chip">
            <span className="status-dot"></span>
            25 AGENTS · ACTIVE ROSTER
          </div>

          <Link to="/agents" className="dossier-cta">
            Explore Agents
          </Link>
        </div>

        <div className="role-legend">
          {ROLES.map((role) => (
            <div className="legend-row" key={role.index}>
              <span className="legend-index">{role.index}</span>
              <div className="legend-copy">
                <span className="legend-role">{role.name}</span>
                <span className="legend-desc">{role.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <AboutPrev />
      <AgentsPreview />
      <MapsPreview />
      <WeaponsPreview />
      <GameModesPreview />
      <TiersCollectionsPreview />
    </div>
  );
}

export default Home;

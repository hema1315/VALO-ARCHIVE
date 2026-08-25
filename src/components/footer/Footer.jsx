import { Link } from "react-router-dom";
import "./footer.css";

const LINK_GROUPS = [
  {
    title: "DATABASE",
    links: [
      { name: "Agents", path: "/agents" },
      { name: "Weapons", path: "/weapons" },
      { name: "Maps", path: "/maps" },
      { name: "Game Modes", path: "/gamemodes" },
      { name: "Tiers", path: "/tiers" },
      { name: "Collections", path: "/collections" },
    ],
  },

  {
    title: "INFO",
    links: [{ name: "About", path: "/about" }],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <svg
              className="footer-logo-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff5252"
                d="M5,10.885v11.761c0,0.878,0.289,1.732,0.823,2.43L17.4,40.215C17.778,40.71,18.365,41,18.988,41	h9.951c0.835,0,1.302-0.963,0.785-1.619L6.785,10.266C6.198,9.521,5,9.936,5,10.885z"
              ></path>
              <path
                fill="#ff5252"
                d="M27.245,28.389l13.964-18.07C41.792,9.563,43,9.976,43,10.93v12.465c0,0.395-0.117,0.781-0.336,1.109	l-3.07,4.606C39.223,29.666,38.598,30,37.93,30h-9.893C27.206,30,26.737,29.046,27.245,28.389z"
              ></path>
            </svg>
            <span className="footer-logo-text">
              ALO<span className="accent"> ARCHIVE</span>
            </span>
          </Link>
          <p className="footer-tagline">
            An independent database for agents, weapons, maps, and everything in
            between.
          </p>
        </div>

        <div className="footer-groups">
          {LINK_GROUPS.map((group) => (
            <div className="footer-group" key={group.title}>
              <span className="footer-group-title">{group.title}</span>
              <ul>
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p className="footer-disclaimer">
          Not affiliated with Riot Games, Inc. All game assets, names, and data
          belong to their respective owners.
        </p>
        <p className="footer-copyright">© {year} VALO ARCHIVE</p>
      </div>
    </footer>
  );
}

export default Footer;

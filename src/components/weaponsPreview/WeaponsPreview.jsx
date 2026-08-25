import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeapons } from "../../services/weaponsApi";

import "./weaponsPreview.css";
import WeaponCard from "../weaponCard/WeaponCard";

const FEATURED_WEAPON_NAMES = [
  "Vandal",
  "Phantom",
  "Operator",
  "Spectre",
  "Sheriff",
  "Judge",
];

function AgentsPreviewLoadingSkeleton() {
  return (
    <div className="weapons-preview-grid">
      {Array.from({ length: FEATURED_WEAPON_NAMES.length }).map((_, i) => (
        <div className="weapon-skeleton" key={i}>
          <div className="weapon-skeleton-plate"></div>
          <div className="weapon-skeleton-lines">
            <div className="weapon-skeleton-line"></div>
            <div className="weapon-skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WeaponsPreview() {
  const [weapons, setWeapons] = useState([]);
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    let isMounted = true;

    getWeapons()
      .then((data) => {
        if (!isMounted) return;

        const featured = FEATURED_WEAPON_NAMES.map((name) =>
          data.find((w) => w.displayName === name),
        ).filter(Boolean);

        setWeapons(featured);
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
    <section className="weapons-preview">
      <div className="weapons-preview-header">
        <div>
          <span className="weapons-preview-tag">
            <span className="weapons-preview-dot"></span>
            ARSENAL
          </span>
          <h2 className="weapons-preview-heading">
            THE <span className="weapons-preview-accent">WEAPONS</span>
          </h2>
          <p className="weapons-preview-subtext">
            Tap a weapon to pull up its fire-rate, magazine and damage profile.
          </p>
        </div>

        <Link to="/weapons" className="weapons-preview-cta">
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

      {status === "loading" && <AgentsPreviewLoadingSkeleton />}

      {status === "error" && (
        <p className="weapons-preview-error">
          Couldn&apos;t load the arsenal. Check your connection and try again.
        </p>
      )}

      {status === "success" && (
        <div className="weapons-preview-grid">
          {weapons.map((weapon, i) => (
            <div
              className="weapon-card-wrapper"
              key={weapon.uuid}
              style={{ "--i": i }}
            >
              <WeaponCard weapon={weapon} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default WeaponsPreview;

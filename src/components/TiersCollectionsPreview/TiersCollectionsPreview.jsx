import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tiersCollections.css";

const TIER_COUNT = 6;
const CARD_COUNT = 6;
const SPRAY_COUNT = 6;

function TiersCollectionsPreview() {
  const [tiers, setTiers] = useState([]);
  const [cards, setCards] = useState([]);
  const [sprays, setSprays] = useState([]);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/competitivetiers")
      .then((res) => res.json())
      .then((json) => {
        const episodes = json.data;
        const latest = episodes[episodes.length - 1];
        const seen = new Set();
        const list = [];

        latest.tiers.forEach((t) => {
          const isValidDivision =
            t.tier > 0 &&
            t.divisionName &&
            t.divisionName !== "UNRANKED" &&
            !t.divisionName.startsWith("Unused");

          if (isValidDivision && !seen.has(t.divisionName)) {
            seen.add(t.divisionName);
            list.push(t);
          }
        });

        setTiers(list.slice(0, TIER_COUNT));
      })
      .catch((err) => console.error("Failed to fetch tiers:", err));

    fetch("https://valorant-api.com/v1/playercards")
      .then((res) => res.json())
      .then((json) => {
        const visible = json.data.filter((c) => !c.isHiddenIfNotOwned);
        setCards(visible.slice(0, CARD_COUNT));
      })
      .catch((err) => console.error("Failed to fetch player cards:", err));

    fetch("https://valorant-api.com/v1/sprays")
      .then((res) => res.json())
      .then((json) => {
        const visible = json.data.filter(
          (s) => !s.isNullSpray && s.displayIcon,
        );
        setSprays(visible.slice(0, SPRAY_COUNT));
      })
      .catch((err) => console.error("Failed to fetch sprays:", err));
  }, []);

  return (
    <section className="tc-section">
      <div className="tc-sweep"></div>

      <div className="tc-col">
        <div className="tc-head">
          <span className="tc-tag">TIERS</span>
          <h3 className="tc-title">Rank Ladder</h3>
        </div>

        <div className="tc-tier-grid">
          {tiers.map((t, i) => (
            <div
              className="tc-tier-item"
              key={t.tier}
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              <img src={t.largeIcon} alt={t.divisionName} loading="lazy" />
              <span>{t.divisionName}</span>
            </div>
          ))}
        </div>

        <Link to="/tiers" className="tc-link">
          Show All Ranks →
        </Link>
      </div>

      <div className="tc-divider"></div>

      <div className="tc-col">
        <div className="tc-head">
          <span className="tc-tag">AND MORE</span>
          <h3 className="tc-title">Collections</h3>
        </div>

        <div className="tc-card-grid">
          {cards.map((c, i) => (
            <div
              className="tc-card-item"
              key={c.uuid}
              style={{ animationDelay: `${0.2 + i * 0.07}s` }}
            >
              <img src={c.smallArt} alt={c.displayName} loading="lazy" />
            </div>
          ))}

          {sprays.map((s, i) => (
            <div
              className="tc-card-item tc-spray-item"
              key={s.uuid}
              style={{
                animationDelay: `${0.2 + (CARD_COUNT + i) * 0.07}s`,
              }}
            >
              <img src={s.displayIcon} alt={s.displayName} loading="lazy" />
            </div>
          ))}
        </div>

        <Link to="/collections" className="tc-link">
          Show All Collections →
        </Link>
      </div>
    </section>
  );
}

export default TiersCollectionsPreview;

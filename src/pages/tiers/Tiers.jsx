import { useEffect, useMemo, useState } from "react";
import OptimizedImage from "../../components/Optimizedimage";
import "./tiers.css";

const RANK_ORDER = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "ASCENDANT",
  "IMMORTAL",
  "RADIANT",
];

function Tiers() {
  const [tiers, setTiers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    fetch("https://valorant-api.com/v1/competitivetiers")
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;

        const episodes = json.data;
        const latest = episodes[episodes.length - 1];

        const list = latest.tiers
          .filter(
            (t) =>
              t.tier > 0 &&
              t.divisionName &&
              t.divisionName !== "UNRANKED" &&
              !t.divisionName.startsWith("Unused"),
          )
          .map((t) => ({
            tier: t.tier,
            divisionName: t.divisionName,
            icon: t.largeIcon || t.smallIcon,
          }));

        setTiers(list);
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

  const grouped = useMemo(() => {
    const map = {};
    tiers.forEach((t) => {
      const base = t.divisionName;
      if (!map[base]) map[base] = [];
      map[base].push(t);
    });
    return map;
  }, [tiers]);

  const orderedRanks = RANK_ORDER.filter((rank) => grouped[rank]?.length);
  const total = orderedRanks.length;

  return (
    <section className="tiers-page">
      <div className="tiers-header">
        <span className="tiers-tag">
          <span className="tiers-dot"></span>
          COMPETITIVE
        </span>
        <h2 className="tiers-heading">
          RANK <span className="tiers-accent">LADDER</span>
        </h2>
        <p className="tiers-subtext">
          Iron to Radiant — the fewer who reach the top, the wider the base.
        </p>
      </div>

      {status === "loading" && (
        <div className="tiers-loading">
          <div className="tiers-scanline"></div>
          <p>LOADING RANK DATA_</p>
        </div>
      )}

      {status === "error" && (
        <p className="tiers-error">
          Couldn&apos;t load the rank ladder. Check your connection and try
          again.
        </p>
      )}

      {status === "success" && (
        <div className="pyramid">
          {orderedRanks.map((rankName, i) => {
            const widthPercent = total > 1 ? 100 - (i / (total - 1)) * 62 : 100;

            return (
              <div
                className={`pyramid-row ${
                  rankName === "RADIANT" ? "is-radiant" : ""
                }`}
                key={rankName}
                style={{
                  "--w": `${widthPercent}%`,
                  animationDelay: `${0.4 + i * 0.07}s`,
                }}
              >
                <div className="pyramid-bar">
                  <span className="row-label">
                    {rankName.charAt(0) + rankName.slice(1).toLowerCase()}
                  </span>

                  <div className="row-divisions">
                    {grouped[rankName].map((division) => (
                      <div className="division-chip" key={division.tier}>
                        <OptimizedImage
                          src={division.icon}
                          alt={division.divisionName}
                          width={56}
                          className="division-icon"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Tiers;

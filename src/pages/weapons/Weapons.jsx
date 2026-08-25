import { useEffect, useMemo, useState } from "react";
import { getWeapons } from "../../services/weaponsApi";
import "./Weapons.css";

const CATEGORY_ORDER = [
  "Sidearms",
  "SMGs",
  "Shotguns",
  "Rifles",
  "Sniper Rifles",
  "Heavy Weapons",
  "Melee",
];

function penetrationLevel(value) {
  if (!value) return 0;
  if (value.includes("Low")) return 1;
  if (value.includes("Medium")) return 2;
  if (value.includes("High")) return 3;
  return 0;
}

const DAMAGE_MAX = 160;

function Weapons() {
  const [weapons, setWeapons] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeWeapon, setActiveWeapon] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getWeapons()
      .then((data) => {
        if (!isMounted) return;
        setWeapons(data);
        setStatus("success");

        const firstCategory = CATEGORY_ORDER.find((cat) =>
          data.some((w) => w.shopCategory === cat),
        );
        const firstWeapon = data.find((w) => w.shopCategory === firstCategory);

        setActiveCategory(firstCategory);
        setActiveWeapon(firstWeapon);
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
    weapons.forEach((w) => {
      const cat = w.shopCategory;
      if (!map[cat]) map[cat] = [];
      map[cat].push(w);
    });
    return map;
  }, [weapons]);

  const categoryWeapons = activeCategory ? grouped[activeCategory] || [] : [];

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setActiveWeapon(grouped[cat]?.[0] || null);
  };

  const stats = activeWeapon?.stats;
  const closestRange = stats?.damage;
  const pen = penetrationLevel(stats?.wallPenetration);

  return (
    <section className="weapons-page">
      <div className="weapons-header">
        <span className="weapons-tag">
          <span className="weapons-dot"></span>
          ARSENAL
        </span>
        <h2 className="weapons-heading">
          THE <span className="weapons-accent">WEAPONS</span>
        </h2>
      </div>

      {status === "loading" && (
        <div className="weapons-loading">
          <div className="weapons-scanline"></div>
          <p>LOADING ARMORY DATA_</p>
        </div>
      )}

      {status === "error" && (
        <p className="weapons-error">
          Couldn&apos;t load the arsenal. Check your connection and try again.
        </p>
      )}

      {status === "success" && activeWeapon && (
        <div className="weapons-terminal">
          <div className="weapons-categories">
            {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => (
              <button
                key={cat}
                className={`category-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span className="category-name">{cat}</span>
                <span className="category-count">{grouped[cat].length}</span>
              </button>
            ))}
          </div>

          <div className="weapons-stage">
            <div className="stage-glow"></div>

            <div className="stage-top" key={`top-${activeWeapon.uuid}`}>
              <span className="stage-cost">
                {activeWeapon.cost
                  ? `${activeWeapon.cost} CREDITS`
                  : "STANDARD ISSUE"}
              </span>
              <h3 className="stage-name">{activeWeapon.displayName}</h3>
            </div>

            <div className="stage-image-wrap" key={`img-${activeWeapon.uuid}`}>
              <img
                src={activeWeapon.displayIcon}
                alt={activeWeapon.displayName}
                className="stage-image"
              />
            </div>

            {stats && (
              <div className="stage-stats" key={`stats-${activeWeapon.uuid}`}>
                <div className="stat-row">
                  <span className="stat-label">FIRE RATE</span>
                  <div className="stat-bar">
                    <span
                      className="stat-fill"
                      style={{
                        "--target": `${Math.min(
                          (stats.fireRate / 12) * 100,
                          100,
                        )}%`,
                      }}
                    ></span>
                  </div>
                  <span className="stat-value">
                    {stats.fireRate ? `${stats.fireRate}/s` : "—"}
                  </span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">MAGAZINE</span>
                  <div className="stat-bar">
                    <span
                      className="stat-fill"
                      style={{
                        "--target": `${Math.min(
                          (stats.magazineSize / 30) * 100,
                          100,
                        )}%`,
                      }}
                    ></span>
                  </div>
                  <span className="stat-value">
                    {stats.magazineSize || "—"}
                  </span>
                </div>

                {closestRange && (
                  <>
                    <div className="stat-row">
                      <span className="stat-label">HEAD DMG</span>
                      <div className="stat-bar">
                        <span
                          className="stat-fill danger"
                          style={{
                            "--target": `${Math.min(
                              (closestRange.head / DAMAGE_MAX) * 100,
                              100,
                            )}%`,
                          }}
                        ></span>
                      </div>
                      <span className="stat-value">
                        {Math.round(closestRange.head)}
                      </span>
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">BODY DMG</span>
                      <div className="stat-bar">
                        <span
                          className="stat-fill"
                          style={{
                            "--target": `${Math.min(
                              (closestRange.body / DAMAGE_MAX) * 100,
                              100,
                            )}%`,
                          }}
                        ></span>
                      </div>
                      <span className="stat-value">
                        {Math.round(closestRange.body)}
                      </span>
                    </div>
                  </>
                )}

                <div className="stat-row penetration">
                  <span className="stat-label">WALL PEN</span>
                  <div className="pen-dots">
                    {[1, 2, 3].map((level) => (
                      <span
                        key={level}
                        className={`pen-dot ${level <= pen ? "filled" : ""}`}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="weapons-strip">
            {categoryWeapons.map((w) => (
              <button
                key={w.uuid}
                className={`strip-item ${
                  activeWeapon.uuid === w.uuid ? "active" : ""
                }`}
                onClick={() => setActiveWeapon(w)}
              >
                <img src={w.displayIcon} alt={w.displayName} loading="lazy" />
                <span>{w.displayName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Weapons;

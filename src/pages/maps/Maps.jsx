import { useEffect, useState } from "react";
import { getMaps } from "../../services/mapsApi";
import OptimizedImage from "../../components/Optimizedimage";
import "./maps.css";

function Maps() {
  const [maps, setMaps] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeMap, setActiveMap] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getMaps()
      .then((data) => {
        if (!isMounted) return;
        setMaps(data);
        setActiveMap(data[0] || null);
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
    <section className="maps-page">
      <div className="maps-header">
        <span className="maps-tag">
          <span className="maps-dot"></span>
          BATTLEGROUNDS
        </span>
        <h2 className="maps-heading">
          THE <span className="maps-accent">MAPS</span>
        </h2>
      </div>

      {status === "loading" && (
        <div className="maps-loading">
          <div className="maps-scanline"></div>
          <p>LOADING MAP DATA_</p>
        </div>
      )}

      {status === "error" && (
        <p className="maps-error">
          Couldn&apos;t load the maps. Check your connection and try again.
        </p>
      )}

      {status === "success" && activeMap && (
        <div className="maps-console">
          <div className="maps-list">
            {maps.map((m) => (
              <button
                key={m.uuid}
                className={`map-list-item ${
                  activeMap.uuid === m.uuid ? "active" : ""
                }`}
                onClick={() => setActiveMap(m)}
              >
                <OptimizedImage
                  src={m.listViewIcon}
                  alt={m.displayName}
                  width={60}
                />
                <span>{m.displayName}</span>
              </button>
            ))}
          </div>

          <div className="maps-stage" key={activeMap.uuid}>
            <div className="stage-visual">
              <OptimizedImage
                src={activeMap.splash}
                alt={activeMap.displayName}
                width={700}
                className="stage-splash"
                fetchPriority="high"
              />

              {activeMap.minimap && (
                <div className="stage-minimap-badge">
                  <OptimizedImage
                    src={activeMap.minimap}
                    alt={`${activeMap.displayName} minimap`}
                    width={160}
                  />
                  <span>TACTICAL</span>
                </div>
              )}
            </div>

            <div className="stage-content">
              <span className="stage-coords">
                {activeMap.coordinates || "COORDINATES CLASSIFIED"}
              </span>
              <h3 className="stage-name">{activeMap.displayName}</h3>

              {activeMap.sites && (
                <p className="stage-description">{activeMap.sites}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Maps;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMaps } from "../../services/mapsApi";
import "./mapsPreview.css";
import MapCard from "../mapCard/MapCard";

const PREVIEW_COUNT = 3;

function MapsPreview() {
  const [maps, setMaps] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    getMaps()
      .then((data) => {
        if (!isMounted) return;
        setMaps(data.slice(0, PREVIEW_COUNT));
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
    <section className="maps-preview">
      <div className="maps-preview-header">
        <div>
          <span className="maps-preview-tag">
            <span className="maps-preview-dot"></span>
            BATTLEGROUNDS
          </span>
          <h2 className="maps-preview-heading">
            THE <span className="maps-preview-accent">MAPS</span>
          </h2>
        </div>

        <Link to="/maps" className="maps-preview-cta">
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
        <div className="maps-preview-grid">
          {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
            <div className="map-skeleton" key={i}></div>
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="maps-preview-error">
          Couldn&apos;t load the maps. Check your connection and try again.
        </p>
      )}

      {status === "success" && (
        <div className="maps-preview-grid">
          {maps.map((map, i) => (
            <div
              className="map-card-wrapper"
              key={map.uuid}
              style={{ "--i": i }}
            >
              <MapCard map={map} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MapsPreview;

import { Link } from "react-router-dom";
import "./mapCard.css";
import OptimizedImage from "../Optimizedimage";


function MapCard({ map }) {
  const { uuid, displayName, sites, splash, listViewIcon } = map;
  const background = splash || listViewIcon;

  return (
    <div className="map-card">
      <div className="map-card-frame">
        {background && (
          <OptimizedImage
            className="map-card-bg"
            src={background}
            alt={displayName}
            width={500}
          />
        )}

        <div className="map-card-overlay"></div>
        <div className="map-card-scanline"></div>

        {sites && <span className="map-card-sites">{sites}</span>}

        <div className="map-card-footer">
          <span className="map-card-name">{displayName}</span>
        </div>
      </div>
    </div>
  );
}

export default MapCard;

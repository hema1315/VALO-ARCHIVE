import { useEffect, useMemo, useState } from "react";
import OptimizedImage from "../../components/Optimizedimage";
import "./collections.css";

const ITEMS_PER_PAGE = 18;

function Collections() {
  const [cards, setCards] = useState([]);
  const [sprays, setSprays] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch("https://valorant-api.com/v1/playercards").then((res) =>
        res.json(),
      ),
      fetch("https://valorant-api.com/v1/sprays").then((res) => res.json()),
    ])
      .then(([cardsJson, spraysJson]) => {
        if (!isMounted) return;

        const cardList = cardsJson.data
          .filter((c) => !c.isHiddenIfNotOwned && c.largeArt)
          .slice(0, 100)
          .map((c) => ({
            uuid: c.uuid,
            displayName: c.displayName,
            thumb: c.smallArt,
            full: c.largeArt,
          }));

        const sprayList = spraysJson.data
          .filter((s) => !s.isNullSpray && s.displayIcon)
          .slice(0, 100)
          .map((s) => ({
            uuid: s.uuid,
            displayName: s.displayName,
            thumb: s.displayIcon,
            full: s.fullTransparentIcon || s.animationPng || s.displayIcon,
          }));

        setCards(cardList);
        setSprays(sprayList);
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

  const activeList = activeTab === "cards" ? cards : sprays;

  
  const totalPages = Math.ceil(activeList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = useMemo(
    () => activeList.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [activeList, startIndex],
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="collections-page">
      <div className="collections-header">
        <span className="collections-tag">
          <span className="collections-dot"></span>
          COLLECTIONS
        </span>
        <h2 className="collections-heading">
          PLAYER <span className="collections-accent">COLLECTIONS</span>
        </h2>
        <p className="collections-subtext">
          Player cards and sprays — every piece of identity in the archive.
        </p>
      </div>

      {status === "success" && (
        <div className="collections-tabs">
          <button
            className={`tab-btn ${activeTab === "cards" ? "active" : ""}`}
            onClick={() => handleTabChange("cards")}
          >
            PLAYER CARDS
            <span className="tab-count">{cards.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "sprays" ? "active" : ""}`}
            onClick={() => handleTabChange("sprays")}
          >
            SPRAYS
            <span className="tab-count">{sprays.length}</span>
          </button>
        </div>
      )}

      {status === "loading" && (
        <div className="collections-loading">
          <div className="collections-scanline"></div>
          <p>OPENING VAULT_</p>
        </div>
      )}

      {status === "error" && (
        <p className="collections-error">
          Couldn&apos;t load the vault. Check your connection and try again.
        </p>
      )}

      {status === "success" && (
        <>
          <div
            className={`vault-grid ${
              activeTab === "sprays" ? "is-sprays" : ""
            }`}
          >
            {currentItems.map((item, i) => (
              <button
                key={item.uuid}
                className="vault-item"
                style={{ animationDelay: `${i * 0.02}s` }}
                onClick={() => setSelectedItem(item)}
              >
                <OptimizedImage
                  src={item.thumb}
                  alt={item.displayName}
                  width={160}
                  className="vault-thumb"
                />
                <span className="vault-name">{item.displayName}</span>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="collections-pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &larr; PREV
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-num ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                NEXT &rarr;
              </button>
            </div>
          )}
        </>
      )}

      {selectedItem && (
        <div className="vault-lightbox" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-iris">
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <OptimizedImage
                src={selectedItem.full}
                alt={selectedItem.displayName}
                width={600}
                className="lightbox-image"
              />

              <span className="lightbox-name">{selectedItem.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Collections;

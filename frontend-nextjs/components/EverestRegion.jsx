import { useEffect } from "react";

const EverestRegion = ({ handleEverestRegionState }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEverestRegionState]);

  return (
    <div className="everest-region-overlay" onClick={handleEverestRegionState}>
      <div className="everest-region-modal" onClick={(e) => e.stopPropagation()}>

        <button className="everest-region-close-btn" onClick={handleEverestRegionState} aria-label="Close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="everest-region-header">
          <h1>Everest Region</h1>
          <p className="subtitle">The Queen of Hills • Famous for Tea Gardens</p>
        </div>

        <div className="everest-region-body">

          <div className="everest-region-info">
            <p>
              The Everest Region is the most popular trekking destination in Nepal,
              offering breathtaking views of the world's highest mountain, Mount Everest.
            </p>
            <ul className="highlights">
              <li>World-famous Ilām Tea (orthodox & CTC)</li>
              <li>Antu Danda Sunrise Viewpoint</li>
              <li>Kanyam & Fikkal Tea Estates</li>
              <li>Maipokhari Lake & Sandakpur Trek</li>
            </ul>
          </div>
        </div>

        <div className="everest-region-footer">
        </div>  
      </div>
    </div>
  );
};

export default EverestRegion;   
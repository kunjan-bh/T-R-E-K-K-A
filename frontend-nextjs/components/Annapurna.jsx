import { useEffect } from "react";

const Annapurna = ({ handleAnnapurnaState }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleAnnapurnaState]);

  return (
    <div className="annapurna-overlay" onClick={handleAnnapurnaState}>
      <div className="annapurna-modal" onClick={(e) => e.stopPropagation()}>

        <button className="annapurna-close-btn" onClick={handleAnnapurnaState} aria-label="Close">
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
        <div className="annapurna-header">
          <h1>Annapurna</h1>
          <p className="subtitle">The Queen of Hills • Famous for Tea Gardens</p>
        </div>

        <div className="annapurna-body">

          <div className="annapurna-info">
            <p>
              Ilām is renowned for its lush tea plantations, rolling green hills,
              and breathtaking views of Kanchenjunga, the third highest mountain
              in the world.
            </p>
            <ul className="highlights">
              <li>World-famous Ilām Tea (orthodox & CTC)</li>
              <li>Antu Danda Sunrise Viewpoint</li>
              <li>Kanyam & Fikkal Tea Estates</li>
              <li>Maipokhari Lake & Sandakpur Trek</li>
            </ul>
          </div>
        </div>

        <div className="annapurna-footer">
        </div>  
      </div>
    </div>
  );
};

export default Annapurna;   
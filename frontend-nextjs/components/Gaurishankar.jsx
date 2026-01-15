import { useEffect } from "react";

const Gaurishankar = ({ handleGaurishankarState }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleGaurishankarState]);

  return (
    <div className="place-overlay" onClick={handleGaurishankarState}>
      <div className="gaurishankar-modal" onClick={(e) => e.stopPropagation()}>

        <button className="gaurishankar-close-btn" onClick={handleGaurishankarState} aria-label="Close">
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
        <div className="gaurishankar-header">
          <h1>Gaurishankar</h1>
          <p className="subtitle">The Queen of Hills • Famous for Tea Gardens</p>
        </div>

        <div className="gaurishankar-body">

          <div className="gaurishankar-info">
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

        <div className="gaurishankar-footer">
        </div>  
      </div>
    </div>
  );
};

export default Gaurishankar;   
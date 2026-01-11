import { useEffect } from "react";

const Ghandruk = ({ handleGhandrukState }) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleGhandrukState]);

    return (
        <div className="ghandruk-overlay" onClick={handleGhandrukState}>
            <div className="ghandruk-modal" onClick={(e) => e.stopPropagation()}>

                <button className="ghandruk-close-btn" onClick={handleGhandrukState} aria-label="Close">
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
                <div className="ghandruk-header">
                    <h1>Ghandruk</h1>
                    <p className="subtitle">The Queen of Hills • Famous for Tea Gardens</p>
                </div>

                <div className="ghandruk-body">

                    <div className="ghandruk-info">
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

                <div className="ghandruk-footer">
                </div>
            </div>
        </div>
    );
};

export default Ghandruk;   
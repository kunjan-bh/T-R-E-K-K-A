import { useEffect } from "react";
import { useState } from "react";

const Illam = ({ handleIllamState }) => {
  const [imgMode, setImgMode] = useState(false);
  const Img = ["illam1.jpeg", "img13.svg", "img21.svg"]
  const [imgIndex, setImgIndex] = useState(0)
  const Test = ["test1", "test2", "test3"]
  const [testIndex, setTestIndex] = useState(0)
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    const timer = setTimeout(() => {
      setImgMode(true);
    }, 1000); // 3 seconds
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [handleIllamState]);

  return (
    <div className={imgMode ? "place-overlay" : "place-overlay-null"} onClick={handleIllamState}>
      <div className="illam-modal" onClick={(e) => e.stopPropagation()}>
        {imgMode ? (
          <>
            <div className="place-image-placeholder">
              <img src={Img[imgIndex]} alt="Ilām" />
            </div>
            <button className="illam-close-btn" onClick={handleIllamState} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
            </button>
            <div className="place-header">
              <h1>Ilām</h1>
              <p className="subtitle">The Queen of Hills • Famous for Tea Gardens</p>
            </div>
          </>
        ) : (
          <>
            <div className="illam-header">
              <h1 className="grow-text">Ilām</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Illam;   
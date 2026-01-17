import { useEffect, useState } from "react";

const EverestRegion = ({ handleEverestRegionState }) => {
  const [imgMode, setImgMode] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);

  // Replace with your actual image paths (high-res Everest region photos recommended)
  const images = [
    "everest1.jpg",     // Classic Everest from Kala Patthar
    "everest2.jpg",     // Khumbu Icefall or Base Camp tents
    "everest3.jpg",     // Ama Dablam sunrise or Tengboche view
    "everest4.jpg",     // Namche Bazaar or suspension bridge panorama
  ];

  const subtitles = [
    "Roof of the World • Sagarmatha National Park",
    "Home of the Sherpas • Gateway to Everest",
    "Khumbu Icefall & Himalayan Giants",
    "Trekking Paradise • UNESCO World Heritage",
  ];

  const leftEmojiImages = [
    "mountain-peak.png",
    "sherpa.svg",
    "icefall.png",
  ];

  const rightEmojiImages = [
    "prayer-flag.png",
    "yak.svg",
    "monastery.png",
  ];

  const leftTexts = [
    "Iconic views of Everest from Kala Patthar at sunrise",
    "Rich Sherpa culture & warm mountain hospitality",
    "Khumbu Glacier & dramatic ice formations",
  ];

  const rightTexts = [
    "Colorful prayer flags & ancient monasteries",
    "Yaks carrying loads on high trails",
    "Tengboche Monastery with Ama Dablam backdrop",
  ];

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
    setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    setEmojiIndex((prev) => (prev + 1) % leftEmojiImages.length);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleEverestRegionState();
    };

    const timer = setTimeout(() => {
      setImgMode(true);
    }, 1200);

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [handleEverestRegionState]);

  return (
    <div
      className={imgMode ? "place-overlay" : "place-overlay-null"}
      onClick={handleEverestRegionState}
    >
      <div className="overlay-layout">
        {/* Left mini card */}
        {imgMode && (
          <div className="mini-div left">
            <div className="text">
              <p>{leftTexts[emojiIndex]}</p>
            </div>
            <div className="mini-div-header">
              <img src={leftEmojiImages[emojiIndex]} alt="" />
            </div>
            <div className="text">
              <p>{leftTexts[(emojiIndex + 1) % leftTexts.length]}</p>
            </div>
          </div>
        )}

        {/* Main modal area */}
        <div className="illam-modal" onClick={(e) => e.stopPropagation()}>
          {imgMode ? (
            <>
              {/* Full background image */}
              <div className="place-image-placeholder">
                <img src={images[imgIndex]} alt="Everest Region" />
              </div>

              {/* Close button */}
              <button
                className="everest-region-close-btn"
                onClick={handleEverestRegionState}
                aria-label="Close"
              >
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

              {/* Favorite button (optional) */}
              <div className="favorite-btn">
                <input type="checkbox" id="fav-everest" className="fav-input" />
                <label htmlFor="fav-everest" className="fav-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fav-heart"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <div className="fav-action">
                    <span className="fav-option-1">Add to Favorites</span>
                    <span className="fav-option-2">Added to Favorites</span>
                  </div>
                </label>
              </div>

              {/* Centered title + cycling subtitle */}
              <div className="place-header">
                <h1>Everest Region</h1>
                <p className="subtitle">{subtitles[subtitleIndex]}</p>
              </div>

              {/* Next arrow */}
              <button className="everest-region-arrow" onClick={handleNext}>
                <img src="/arrow.svg" alt="Next" />
              </button>
            </>
          ) : (
            <>
              {/* Initial grow-text loading screen */}
              <div className="illam-header">
                <h1 className="grow-text">Everest <br /> Region</h1>
              </div>
            </>
          )}
        </div>

        {/* Right mini card */}
        {imgMode && (
          <div className="mini-div right">
            <div className="text">
              <p>{rightTexts[emojiIndex]}</p>
            </div>
            <div className="mini-div-header">
              <img src={rightEmojiImages[emojiIndex]} alt="" />
            </div>
            <div className="text">
              <p>{rightTexts[(emojiIndex + 1) % rightTexts.length]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EverestRegion;
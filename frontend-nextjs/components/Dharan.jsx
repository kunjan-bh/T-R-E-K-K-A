import { useEffect, useState } from "react";

const Dharan = ({ handleDharanState }) => {
  const [imgMode, setImgMode] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);

  // Images – replace with actual Dharan photos
  const images = [
    "dharan1.jpg",    // hillside view
    "dharan2.jpg",    // Bhedetar viewpoint
    // "dharan3.jpg", // temple / city view
    // "dharan4.jpg", // sunrise / clouds
  ];

  const subtitles = [
    "Gateway to Eastern Nepal • Bhedetar Viewpoint",
    "Cool climate & scenic hills",
    "Dharan – Bhedetar – Dhankuta triangle",
    "Famous for oranges & adventure",
  ];

  const leftEmojiImages = [
    "mountain.png",
    "sunrise.png",
    "orange.png",
  ];

  const rightEmojiImages = [
    "binoculars.png",
    "road.svg",
    "temple.png",
  ];

  const leftTexts = [
    "Bhedetar – famous hill station with stunning sunrise",
    "Cool breeze and pine forests at 1,420 m",
    "Orange orchards and local farming vibes",
  ];

  const rightTexts = [
    "Gateway city to eastern Nepal hills",
    "Twisty roads and scenic drives to Dhankuta",
    "Pindeshwor Temple, temples and local culture",
  ];

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
    setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    setEmojiIndex((prev) => (prev + 1) % leftEmojiImages.length);
  };

  // Auto-enter image mode + ESC listener
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleDharanState();
    };

    const timer = setTimeout(() => {
      setImgMode(true);
    }, 1200);

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [handleDharanState]);

  return (
    <div
      className={imgMode ? "place-overlay" : "place-overlay-null"}
      onClick={handleDharanState}
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

        {/* Main content area */}
        <div className="illam-modal" onClick={(e) => e.stopPropagation()}>
          {imgMode ? (
            <>
              {/* Background image */}
              <div className="place-image-placeholder">
                <img src={images[imgIndex]} alt="Dharan" />
              </div>

              {/* Close button */}
              <button
                className="illam-close-btn white"
                onClick={handleDharanState}
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

              {/* Favorite button (optional – same as Illam) */}
              <div className="favorite-btn">
                <input type="checkbox" id="fav-dharan" className="fav-input" />
                <label htmlFor="fav-dharan" className="fav-label">
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

              {/* Title + cycling subtitle */}
              <div className="place-header">
                <h1>Dharan</h1>
                <p className="subtitle">{subtitles[subtitleIndex]}</p>
              </div>

              {/* Next arrow */}
              <button className="arrow" onClick={handleNext}>
                <img src="/arrow.svg" alt="Next" />
              </button>
            </>
          ) : (
            <>
              {/* Initial loading / grow effect */}
              <div className="illam-header">
                <h1 className="grow-text">Dharan</h1>
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

export default Dharan;
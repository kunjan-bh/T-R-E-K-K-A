import { useEffect, useState } from "react";

const KoshiTappu = ({ handleKoshiTappuState }) => {
  const [imgMode, setImgMode] = useState(false);

  const images = ["koshi1.webp", "koshi2.webp", "koshi3.png"];

  const subtitles = [
    "Wildlife Paradise • Ramsar Site",
    "Birdwatcher's Heaven in Eastern Nepal",
    "Wetlands & wildlife living of wild water buffalo",
  ];

  const leftEmojiImages = ["wetland.png", "buffalo.png", "bird.png"];
  const rightEmojiImages = ["jeep.png", "walk.png", "businessman.png"];

  const leftTexts = [
    "One of Asia's most important wetlands",
    "Designated Ramsar wetland of international importance",
    "Last remaining population of wild water buffalo",
    "Critical ecosystem supporting wetland biodiversity",
    "Over 500 species of birds recorded",

    "Key breeding and nesting ground for migratory birds",

  ];

  const rightTexts = [
    "(Guided birdwatching) with rare migratory species",
    "Jeep safari through grasslands and floodplains",

    "Peaceful jungle walks with local nature guides",
    "(Wildlife photography) in open wetland landscapes",

    "(Gentle rafting) along the Koshi River channels",
    "Community-based eco-tourism and cultural visits",
  ];

  const [imgIndex, setImgIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
    setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    setSlideIndex((prev) => (prev + 1) % leftEmojiImages.length);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleKoshiTappuState();
    };

    const timer = setTimeout(() => setImgMode(true), 1200);
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [handleKoshiTappuState]);

  return (
    <div
      className={imgMode ? "place-overlay" : "place-overlay-null"}
      onClick={handleKoshiTappuState}
    >
      <div className="overlay-layout">

        {/* LEFT MINI CARD */}
        {imgMode && (
          <div className="mini-div left">
            <div className="text">
              <p>{leftTexts[slideIndex * 2]}</p>
            </div>

            <div className="mini-div-header">
              <img src={leftEmojiImages[slideIndex]} alt="" />
            </div>

            <div className="text">
              <p>{leftTexts[slideIndex * 2 + 1]}</p>
            </div>
          </div>
        )}

        {/* MAIN MODAL */}
        <div className="place-modal" onClick={(e) => e.stopPropagation()}>
          {imgMode ? (
            <>
              <div className="place-image-placeholder">
                <img src={images[imgIndex]} alt="Koshi Tappu" />
              </div>

              <button className="place-close-btn" onClick={handleKoshiTappuState} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
              </button>
              <div className="favorite-btn">
                <input
                  type="checkbox"
                  id="fav-toggle"
                  className="fav-input"
                />

                <label htmlFor="fav-toggle" className="fav-label">
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

              <div className="place-header">
                <h1>Koshi Tappu</h1>
                <p className="subtitle">{subtitles[subtitleIndex]}</p>
              </div>

              <button className="arrow" onClick={handleNext}>
                <img src="/arrow.svg" alt="Next" />
              </button>
            </>
          ) : (
            <div className="place-pre-header">
              <h1 className="grow-text">
                Koshi <br /> Tappu
              </h1>
            </div>
          )}
        </div>

        {/* RIGHT MINI CARD */}
        {imgMode && (
          <div className="mini-div right">
            <div className="text">
              <p>{rightTexts[slideIndex * 2]}</p>
            </div>

            <div className="mini-div-header">
              <img src={rightEmojiImages[slideIndex]} alt="" />
            </div>

            <div className="text">
              <p>{rightTexts[slideIndex * 2 + 1]}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default KoshiTappu;

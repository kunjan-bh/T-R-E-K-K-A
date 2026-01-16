import { useEffect } from "react";
import { useState } from "react";

const Illam = ({ handleIllamState }) => {
  const [imgMode, setImgMode] = useState(false);
  const Img = [
    "illam1.svg",
    "illam2.svg",
    "illam3.jpg"
  ]
  const [imgIndex, setImgIndex] = useState(0)

  const Test = [
    "The Queen of Hills • Famous for Tea Gardens",
    "Cool hills and mist",
    "Tea gardens everywhere, Peaceful eastern Nepal."
  ]
  const [testIndex, setTestIndex] = useState(0)

  const EmojiLeft = [
    "leaf1.svg",
    "travel.png",
  ]
  const EmojiRight = [
    "hill.svg",
    "gardening.png"
  ]
  const [emojiIndex, setEmojiIndex] = useState(0)

  const emojiTextLeft = [
    "Endless tea gardens rolling over emerald hills — Ilām’s signature charm.",
    "Tea gardens everywhere, Peaceful eastern Nepal.",
    "Winding hill roads leading to peaceful viewpoints.",
    "Kanyam Tea Garden (MOST famous), Mai Pokhari (Sacred Lake)",
  ]

  const emojiTextRight = [
    "Fresh air, green tea estates, and calm mornings in eastern Nepal.",
    "Soft mountain air, winding roads, and serene hilltop landscapes.",
    "Scenic routes with views that make you stop and breathe.",
    "Ilām Bazaar, Fikkal Bazaar, Sandakpur Viewpoint",
  ]
  const [emojiTextIndex, setEmojiTextIndex] = useState(0)

  const handleIndex = () => {
    setImgIndex(imgIndex + 1)
    setTestIndex(testIndex + 1)
    if (imgIndex === Img.length - 1) {
      setImgIndex(0)
      setTestIndex(0)
    }
  }
  const handleEmojiIndex = () => {
    setEmojiIndex(emojiIndex + 1)
    setEmojiTextIndex(emojiTextIndex + 1)
    if (emojiIndex === EmojiLeft.length - 1) {
      setEmojiIndex(0)
    }
    if (emojiTextIndex === emojiTextLeft.length - 2) {
      setEmojiTextIndex(0)
    }
  };

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
      <div className="overlay-layout">
        {imgMode &&
          <div className="mini-div left">
            <div className="text">
              <p>{emojiTextLeft[emojiTextIndex]}</p>
            </div>
            <div className="mini-div-header">
              <img src={EmojiLeft[emojiIndex]} />
            </div>
            <div className="text">
              <p>{emojiTextLeft[emojiTextIndex + 1]}</p>
            </div>
          </div>
        }
        <div className="illam-modal" onClick={(e) => e.stopPropagation()}>
          {imgMode ? (
            <>
              <div className="place-image-placeholder">
                <img src={Img[imgIndex]} alt="Ilām" />
              </div>
              <button className="illam-close-btn" onClick={handleIllamState} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
              </button>
              <div className="place-header">
                <h1>Ilām</h1>
                <p className="subtitle">{Test[testIndex]}</p>
              </div>
              <button className="arrow" onClick={()=>{handleIndex(); handleEmojiIndex()}}>
                <img src="/arrow.svg" alt="" />
              </button>

            </>
          ) : (
            <>
              <div className="illam-header">
                <h1 className="grow-text">Ilām</h1>
              </div>

            </>
          )}
        </div>
        {imgMode &&
          <div className="mini-div right">
            <div className="text">
              <p>{emojiTextRight[emojiTextIndex]}</p>
            </div>
            <div className="mini-div-header">
              <img src={EmojiRight[emojiIndex]} />
            </div>
            <div className="text">
              <p>{emojiTextRight[emojiTextIndex + 1]}</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Illam;   
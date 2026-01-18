// components/PlaceModal.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PlaceModal = ({
    placeName,
    placeName2,
    images,
    subtitles,
    leftEmojiImages,
    rightEmojiImages,
    leftTexts,
    rightTexts,
    onClose,
}) => {
    const [imgMode, setImgMode] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);

    const totalSlides = Math.min(
        leftEmojiImages.length,
        rightEmojiImages.length,
        Math.floor(leftTexts.length / 2),
        Math.floor(rightTexts.length / 2)
    );

    const handleNext = () => {
        setImgIndex((prev) => (prev + 1) % images.length);
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setSlideIndex((prev) => (prev + 1) % totalSlides);
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        const timer = setTimeout(() => {
            setImgMode(true);
        }, 1200);

        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div
            className={imgMode ? "place-overlay" : "place-overlay-null"}
            onClick={onClose}
        >
            <div className="overlay-layout">

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
                                <img src={images[imgIndex]} alt={placeName} />
                            </div>

                            <button
                                className="place-close-btn"
                                onClick={onClose}
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

                            <div className="favorite-btn">
                                <input
                                    type="checkbox"
                                    id={`fav-toggle-${placeName.toLowerCase()}`}
                                    className="fav-input"
                                />
                                <label
                                    htmlFor={`fav-toggle-${placeName.toLowerCase()}`}
                                    className="fav-label"
                                >
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
                                <h1>{placeName}</h1>
                                <p className="subtitle">{subtitles[subtitleIndex]}</p>
                            </div>

                            <button className="arrow" onClick={handleNext}>
                                <img src="/arrow.svg" alt="Next" />
                            </button>
                        </>
                    ) : (
                        <div className="place-pre-header">
                            <h1 className="grow-text">
                                {placeName}
                                {placeName2 && (
                                    <>
                                        <br />
                                        {placeName2}
                                    </>
                                )}</h1>
                        </div>
                    )}
                </div>


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

PlaceModal.propTypes = {
    placeName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    subtitles: PropTypes.arrayOf(PropTypes.string).isRequired,
    leftEmojiImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    rightEmojiImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    leftTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
    rightTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PlaceModal;
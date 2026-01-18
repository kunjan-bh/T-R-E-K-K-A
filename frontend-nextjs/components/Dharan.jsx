// src/components/places/Dharan.jsx
import PlaceModal from "./PlaceModal";   // adjust path based on your folder structure

const Dharan = ({ handleDharanState }) => {
  const dharanConfig = {
    placeName: "Dharan",
    images: [
      "dharan1.png", 
      "dharan2.png", 
      "dharan3.png", 
    ],
    subtitles: [
      "Gateway to Eastern Hills • Bhedetar Viewpoint",
      "Cool Climate & Scenic Sunrise Spot",
      "Oranges, Temples & Adventure Triangle",
    ],
    leftEmojiImages: ["sunrise.png", "tanning.png", "scene.png"],
    rightEmojiImages: ["hill.svg", "temple.svg", "village.svg"],
    leftTexts: [
      "Bhedetar hill station at 1,420 m",
      "Famous for stunning sunrise & pine views",
      "Orange orchards and fresh local produce",
      "Cool breeze year-round escape from Terai heat",
      "Panoramic views of eastern plains & Koshi",
      "Charles Point – named after Prince Charles visit",
    ],
    rightTexts: [
      "Gateway city to Dhankuta & eastern hills",
      "Twisty scenic drives & adventure roads",
      "Pindeshwor & Dantakali temples nearby",
      "Budha Subba spiritual site & wishes",
      "Close to Namaste Falls & Skywalk thrill",
      "Cultural mix & vibrant local life",
    ],
    onClose: handleDharanState,
  };

  return <PlaceModal {...dharanConfig} />;
};

export default Dharan;
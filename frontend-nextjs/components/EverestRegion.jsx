// src/components/places/EverestRegion.jsx
import PlaceModal from "./PlaceModal";   // adjust path based on your folder structure

const EverestRegion = ({ handleEverestRegionState }) => {
  const EverestRegionConfig = {
    placeName: "Everest",
    placeName2: "Region",
    images: [
      "EverestRegion1.jpg", 
      "EverestRegion2.jpg",
      "EverestRegion3.jpg", 
    ],
    subtitles: [
      "Gateway to Eastern Hills • Bhedetar Viewpoint",
      "Cool Climate & Scenic Sunrise Spot",
      "Oranges, Temples & Adventure Triangle",
    ],
    leftEmojiImages: ["mountain.png", "sunrise.png", "orange.png"],
    rightEmojiImages: ["binoculars.png", "road.svg", "temple.png"],
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
    onClose: handleEverestRegionState,
  };

  return <PlaceModal {...EverestRegionConfig} />;
};

export default EverestRegion;
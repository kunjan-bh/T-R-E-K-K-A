// KoshiTappu.jsx
import PlaceModal from "./PlaceModal";

const KoshiTappu = ({ handleKoshiTappuState }) => {
  const config = {
    placeName: "Koshi",
    placeName2: "Tappu",
    images: ["koshi1.webp", "koshi2.webp", "koshi3.png"],
    subtitles: [
      "Wildlife Paradise • Ramsar Site",
      "Birdwatcher's Heaven in Eastern Nepal",
      "Wetlands & wildlife living of wild water buffalo",
    ],
    leftEmojiImages: ["wetland.png", "buffalo.png", "bird.png"],
    rightEmojiImages: ["jeep.png", "walk.png", "businessman.png"],
    leftTexts: [
      "One of Asia's most important wetlands",
      "Designated Ramsar wetland of international importance",
      "Last remaining population of wild water buffalo",
      "Critical ecosystem supporting wetland biodiversity",
      "Over 500 species of birds recorded",
      "Key breeding and nesting ground for migratory birds",
    ],
    rightTexts: [
      "(Guided birdwatching) with rare migratory species",
      "Jeep safari through grasslands and floodplains",
      "Peaceful jungle walks with local nature guides",
      "(Wildlife photography) in open wetland landscapes",
      "(Gentle rafting) along the Koshi River channels",
      "Community-based eco-tourism and cultural visits",
    ],
    onClose: handleKoshiTappuState,
  };

  return <PlaceModal {...config} />;
};

export default KoshiTappu;
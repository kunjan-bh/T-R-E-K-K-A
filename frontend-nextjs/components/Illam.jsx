// Illam.jsx (or wherever you open the modal)
import PlaceModal from "./PlaceModal";

const Illam = ({ handleIllamState }) => {
  const illamConfig = {
    placeName: "Ilām",
    placeName2: "",
    images: ["illam1.svg", "illam2.svg", "illam3.jpg"],
    subtitles: [
      "The Queen of Hills • Famous for Tea Gardens",
      "Cool hills and mist",
      "Tea gardens everywhere, Peaceful eastern Nepal",
    ],
    leftEmojiImages: ["leaf1.svg", "travel.png"],
    rightEmojiImages: ["hill.svg", "gardening.png"],
    leftTexts: [
      "Endless tea gardens rolling over emerald hills — Ilām’s signature charm.",
      "Tea gardens everywhere, Peaceful eastern Nepal.",
      "Winding hill roads leading to peaceful viewpoints.",
      "Kanyam Tea Garden (MOST famous), Mai Pokhari (Sacred Lake)",
    ],
    rightTexts: [
      "Fresh air, green tea estates, and calm mornings in eastern Nepal.",
      "Soft mountain air, winding roads, and serene hilltop landscapes.",
      "Scenic routes with views that make you stop and breathe.",
      "Ilām Bazaar, Fikkal Bazaar, Sandakpur Viewpoint",
    ],
    onClose: handleIllamState,
  };

  return <PlaceModal {...illamConfig} />;
};

export default Illam;
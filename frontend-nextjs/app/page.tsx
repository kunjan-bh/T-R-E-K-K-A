"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar1 from "./../components/Navbar1";
import PageTransition from "./../components/PageTransition";

import Link from "next/link";

export default function Home() {
  const backgrounds = [
    "/home1.png",
    "/home2.png",
  ];
  const texts = [
    "Nepal",
    "Nature",
  ];
  const describes = [
    "Nepal, nestled in the Himalayas, is a land of stunning natural beauty, cultural richness, and adventure. Home to Mount Everest and diverse traditions, it offers vibrant festivals, ancient temples, and breathtaking landscapes.",
    "Nepal’s nature is a breathtaking blend of towering mountains, lush forests, and serene valleys. Home to Mount Everest and the Annapurna range, it boasts diverse ecosystems, from the Himalayan peaks to the Terai plains.",
  ];
  const bar1 = [
    "bar1",
    "bar2",
  ];
  const bar2 = [
    "bar2",
    "bar1",
  ];

  const [currentBg, setCurrentBg] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentPara, setCurrentPara] = useState(0);
  const [currentBar1, setCurrentBar1] = useState(0);
  const [currentBar2, setCurrentBar2] = useState(0);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      setCurrentTitle((prev) => (prev + 1) % texts.length);
      setCurrentPara((prev) => (prev + 1) % describes.length);
      setCurrentBar1((prev) => (prev + 1) % bar1.length);
      setCurrentBar2((prev) => (prev + 1) % bar2.length);
    }, 5000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home fade-bg"
      style={{
        backgroundImage: `url(${backgrounds[currentBg]})`,
      }}
    >
      <Navbar1 />
      <div className="title">
        <h1 className="fade">{texts[currentTitle]}</h1>
        <p className="fade">
          {describes[currentPara]}
        </p>

        {/* <Link href="/login" className="home-btn"> */}
        <PageTransition href="/login" className="home-btn">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Get Started</span>
        </PageTransition>

        <div className="loader-bar">
          <div className={bar1[currentBar1]}></div>
          <div className={bar2[currentBar2]}></div>
        </div>
      </div>
    </div>
  );
}

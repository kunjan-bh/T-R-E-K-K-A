"use client";
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SideNav from "./../../components/SideNav";
import ProfileBtn from '@/components/ProfileBtn';
import Notify from '@/components/Notify';
import Overview from '../overview/page';
import TravelKit from '../travelKit/page';
const Dashboard = () => {
  const backgrounds = [
    "/side1.png",
    "/side2.png",
    "/side3.png",
  ];
  const texts = [
    "TEMPLES",
    "HILLS",
    "PEAKS",
  ];
  const [currentBg, setCurrentBg] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);

  //the following usesate are used solely for section navigation
  const [showOverview, setShowOverview] = useState(true);
  const [showTravelKit, setShowTravelKit] = useState(false);
  const handleOverview = () => {
    setShowOverview(true);
    setShowTravelKit(false);
  }
  const handleTravelKit = () => {
    setShowOverview(false);
    setShowTravelKit(true);
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      setCurrentTitle((prev) => (prev + 1) % texts.length);
    }, 4000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='dashboard-content'>
        <SideNav handleOverview={handleOverview} handleTravelKit={handleTravelKit}></SideNav>
        {showOverview && <Overview></Overview>}
        {showTravelKit && <TravelKit></TravelKit>}
      </div>
    
  )
}

export default Dashboard
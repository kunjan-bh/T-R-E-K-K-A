"use client";
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import SideNav from "./../../components/SideNav";
import ProfileBtn from '@/components/ProfileBtn';
import Notify from '@/components/Notify';
import Overview from '../overview/page';
import TravelKit from '../travelKit/page';
import { isAuthenticated, getCurrentUser } from '@/lib/api';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
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

  //the following usestate are used solely for section navigation
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

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }

      // Fetch user data
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        console.log('User data:', userData);
      } catch (error) {
        console.error('Failed to get user:', error);
        // If token is invalid, redirect to login
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Background rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      setCurrentTitle((prev) => (prev + 1) % texts.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading...
      </div>
    );
  }

  // Only render dashboard if user is authenticated
  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className='dashboard-content'>
      <SideNav 
        handleOverview={handleOverview} 
        handleTravelKit={handleTravelKit}
        user={user} // Pass user data to SideNav if needed
      />
      {showOverview && <Overview user={user} />}
      {showTravelKit && <TravelKit user={user} />}
    </div>
  );
}

export default Dashboard;
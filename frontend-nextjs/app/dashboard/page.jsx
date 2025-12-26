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
import Community from '../community/page';

const Dashboard = () => {
  const router = useRouter();
  const [showOverview, setShowOverview] = useState(true);
  const [showTravelKit, setShowTravelKit] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOverview = () => {
    setShowOverview(true);
    setShowTravelKit(false);
    setShowCommunity(false);
  }
  
  const handleTravelKit = () => {
    setShowOverview(false);
    setShowTravelKit(true);
    setShowCommunity(false);
  }

  const handleCommunity = () => {
    setShowOverview(false);
    setShowTravelKit(false);
    setShowCommunity(true);
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof isAuthenticated !== 'undefined' && !isAuthenticated()) {
        router.push('/login');
        return;
      }

      try {
        if (typeof getCurrentUser !== 'undefined') {
            const userData = await getCurrentUser();
            setUser(userData);
            console.log('User data:', userData);
        }
      } catch (error) {
        console.error('Failed to get user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <div className='dashboard-content'>
        <SideNav handleOverview={handleOverview} handleTravelKit={handleTravelKit} handleCommunity={handleCommunity}></SideNav>
        {showOverview && <Overview></Overview>}
        {showTravelKit && <TravelKit></TravelKit>}
        {showCommunity && <Community></Community>}
      </div>
  )
}

export default Dashboard;
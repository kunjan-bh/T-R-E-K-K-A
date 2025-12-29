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
import { getCurrentUser, isAuthenticated } from '@/lib/api';

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
      console.log('User datas:');
      try {
        if (typeof getCurrentUser !== 'undefined') {
          const userData = await getCurrentUser();
          setUser(userData);
          console.log('User datas:', userData.id);
        }
      } catch (error) {
        console.error('Failed to get user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
        console.log('Loading:', loading);
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
      {showOverview && <Overview user_id={user.id}></Overview>}
      {showTravelKit && <TravelKit user_id={user.id}></TravelKit>}
      {showCommunity && <Community user_id={user.id}></Community>}
    </div>
  )
}

export default Dashboard;
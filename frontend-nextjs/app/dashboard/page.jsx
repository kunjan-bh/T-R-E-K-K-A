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
import SherpaDashboard from '../sherpa/page';
import ChatPage from '../chat/page';
import Loading from '@/components/Loading';
import DiscoverNepal from '../discoverNepal/page';
import { getCurrentUser, isAuthenticated } from '@/lib/api';

const Dashboard = () => {

  const router = useRouter();
  const [showOverview, setShowOverview] = useState(true);
  const [showTravelKit, setShowTravelKit] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showDiscoverNepal, setShowDiscoverNepal] = useState(false);
  const [showSherpaDashboard, setShowSherpaDashboard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOverview = () => {
    setShowOverview(true);
    setShowTravelKit(false);
    setShowCommunity(false);
    setShowDiscoverNepal(false);
    setShowSherpaDashboard(false);
    setShowChat(false);
  }

  const handleTravelKit = () => {
    setShowOverview(false);
    setShowTravelKit(true);
    setShowCommunity(false);
    setShowDiscoverNepal(false);
    setShowSherpaDashboard(false);
    setShowChat(false);
  }

  const handleCommunity = () => {
    setShowOverview(false);
    setShowTravelKit(false);
    setShowCommunity(true);
    setShowDiscoverNepal(false);
    setShowSherpaDashboard(false);
    setShowChat(false);
  }

  const handleDiscoverNepal = () => {
    setShowOverview(false);
    setShowTravelKit(false);
    setShowCommunity(false);
    setShowDiscoverNepal(true);
    setShowSherpaDashboard(false);
    setShowChat(false);
  }

  const handleSherpaDashboard = () => {
    setShowOverview(false);
    setShowTravelKit(false);
    setShowCommunity(false);
    setShowDiscoverNepal(false);
    setShowSherpaDashboard(true);
    setShowChat(false);
  }

  const handleChat = () => {
    setShowOverview(false);
    setShowTravelKit(false);
    setShowCommunity(false);
    setShowDiscoverNepal(false);
    setShowSherpaDashboard(false);
    setShowChat(true);
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
    return <div><Loading /></div>;
  }

  return (
    <div className='dashboard-content'>
      <SideNav handleOverview={handleOverview} handleTravelKit={handleTravelKit} handleCommunity={handleCommunity} handleDiscoverNepal={handleDiscoverNepal} handleSherpaDashboard={handleSherpaDashboard} handleChat={handleChat}></SideNav>
      {showOverview && <Overview user_id={user.id}></Overview>}
      {showTravelKit && <TravelKit user_id={user.id}></TravelKit>}
      {showCommunity && <Community user_id={user.id}></Community>}
      {showDiscoverNepal && <DiscoverNepal user_id={user.id}></DiscoverNepal>}
      {showSherpaDashboard && <SherpaDashboard user_id={user.id}></SherpaDashboard>}
      {showChat && <ChatPage user_id={user.id}></ChatPage>}
    </div>
  )
}

export default Dashboard;
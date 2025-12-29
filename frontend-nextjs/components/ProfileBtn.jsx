"use client";
import { getCurrentUser, logout } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const ProfileBtn = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        console.log('User info-profile-btn:', userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();           //clear token
    router.push("/login");    // redirect user
  };

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen(!open);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative profile-container" ref={menuRef}>
      <button
        className="profile flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
        onClick={toggleMenu}
      >
        <div className="userDiv text-right">
          <span className="usersName block font-semibold text-sm">{user?.first_name + " " + user?.last_name}</span>
          <span className="userRole block text-xs text-gray-500">{user?.is_from_nepal ? 'Explorer' : 'Traveler'}</span>
        </div>
        <div className="profileImg w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <img src="/me.webp" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </button>

      {open && (
        <div
          className="profileBtns overlay-profile absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-xl border border-gray-100 p-3 animate-fadeIn"
        >
          <button className="overlay-profile-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-black">
            My Profile
          </button>
          <button className="overlay-profile-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-black">
            Settings
          </button>
          <button onClick={handleLogout} className="overlay-profile-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500">
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default ProfileBtn;

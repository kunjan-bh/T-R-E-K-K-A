"use client";
import { useEffect, useState } from "react";
import SherpaRegister from "./register/page";
import SherpaUpdate from "./update/page";
import ProfileBtn from "@/components/ProfileBtn";
import Notify from "@/components/Notify";

export default function SherpaDashboard() {
  const [sherpas, setSherpas] = useState([]);
  const [status, setStatus] = useState(null);
  const [register, setRegister] = useState(false);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    fetch("http://127.0.0.1:8000/sherpa/list/")
      .then(res => res.json())
      .then(data => Array.isArray(data) && setSherpas(data));

    if (token) {
      fetch("http://127.0.0.1:8000/sherpa/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : null)
        .then(setStatus);
    }
  }, []);

  const handleRegisterClose = () => setRegister(false);
  const handleUpdateClose = () => setUpdate(false);

  const handleRegisterSuccess = () => {
    setStatus(prev => ({ ...prev, is_sherpa: true, is_verified: false }));
    setRegister(false);
  };

  const handleUpdateSuccess = (updatedData) => {
    setStatus(prev => ({ ...prev, ...updatedData }));

    // Update or add own profile in the list
    setSherpas(prev => {
      const ownId = status?.id; // assuming /me/ returns 'id'
      if (!ownId) return prev;

      const exists = prev.some(s => s.id === ownId);
      if (exists) {
        return prev.map(s =>
          s.id === ownId ? { ...s, ...updatedData } : s
        );
      } else if (updatedData.is_available) {
        // If newly available, refetch full list (safest)
        fetch("http://127.0.0.1:8000/sherpa/list/")
          .then(res => res.json())
          .then(data => Array.isArray(data) && setSherpas(data));
        return prev;
      }
      return prev;
    });

    setUpdate(false);
  };

  const filteredSherpas = sherpas.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sherpa-container">
      <div className="dasNav">
        <h1>GUIDE PROFILES</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by name or region..."
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="userInfo">
          <Notify />
          <ProfileBtn />
        </div>
      </div>

      <div className="sherpa-dashboard">
        {register && <SherpaRegister handleRegister={handleRegisterClose} onSuccess={handleRegisterSuccess} />}
        {update && <SherpaUpdate handleUpdate={handleUpdateClose} onSuccess={handleUpdateSuccess} />}

        <div className="sherpa-header">
          <div className="sherpa-actions">
            {/* {!status?.is_sherpa && (
              <button className="sherpa-btn sherpa-btn-register" onClick={() => setRegister(true)}>
                Register as Guide
              </button>
            )} */}

            {status?.is_sherpa && !status?.is_verified && (
              <span className="sherpa-badge sherpa-badge-pending">
                Pending Verification
              </span>
            )}

            {status?.is_sherpa && status?.is_verified && (
              <button className="sherpa-btn sherpa-btn-update" onClick={() => setUpdate(true)}>
                Update Profile
              </button>
            )}
          </div>
        </div>

        {!status?.is_sherpa && (
          <div className="register_area">
            <div className="register-div">
              <div className="sherpa-info-section info-not-registered">
                <div className="info-content">
                  <h2>Join Our Professional Guide Community <span>(Career)</span></h2>
                  <p><span>Become a certified guide</span> and connect with travelers looking for authentic experiences across Nepal.</p>
                  <ul className="info-benefits">
                    <li>Showcase your expertise in trekking & cultural tours</li>
                    <li>Set your own daily rates and availability</li>
                    <li>Build reputation with verified status</li>
                    <li>Direct bookings from adventure seekers</li>
                  </ul>
                  <button className="sherpa-btn sherpa-btn-register" onClick={() => setRegister(true)}>
                    Register Now
                  </button>
                </div>

              </div>
              <div className="analytics-area">
                <div className="register-analytics">

                </div>
                <div className="register-analytics">

                </div>
              </div>
            </div>
            <div className="marquee_register">
              <div className="marquee-content">
                <p>Join Our Professional Guide Community (Career)</p>
              </div>
            </div>
          </div>
        )}

        {status?.is_sherpa && !status?.is_verified && (
          <div className="sherpa-info-section info-pending">
            <div className="info-content">
              <h2>Application Under Review</h2>
              <p>Thank you for registering. Our team is currently verifying your documents.</p>
              <p>Typical review time: 24–72 hours</p>
              <div className="pending-tips">
                <h3>What happens next:</h3>
                <ul>
                  <li>You'll receive a notification once approved</li>
                  <li>You can update your profile anytime</li>
                  <li>Verified guides appear in public listings</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="sherpa-grid">
          {filteredSherpas.map(s => (
            <div key={s.id} className="sherpa-card">
              <div className="sherpa-card-photo-container">
                <img src={s.photo} alt={s.name} className="sherpa-card-photo" />
              </div>
              <h3 className="sherpa-card-name">{s.name}</h3>
              <p className="sherpa-card-region">{s.region}</p>
              <p className="sherpa-card-contact">{s.phone}</p>
              <p className="sherpa-card-rate">
                {s.experience_years} years • NPR {s.daily_rate}/day
              </p>
              <div className="sherpa-card-status">
                <span className={`status-badge ${s.is_available ? 'available' : 'unavailable'}`}>
                  {s.is_available ? 'Available' : 'Unavailable'}
                </span>
                <span className={`status-badge ${s.is_verified ? 'verified' : 'pending'}`}>
                  {s.is_verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSherpas.length === 0 && status?.is_sherpa && status?.is_verified && (
          <p className="no-results">No guides match your search.</p>
        )}
      </div>
    </div>
  );
}
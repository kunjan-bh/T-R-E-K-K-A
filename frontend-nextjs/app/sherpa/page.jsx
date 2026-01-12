"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SherpaDashboard() {
  const [sherpas, setSherpas] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    // Fetch all sherpas (public)
    fetch("http://127.0.0.1:8000/sherpa/list/")
      .then(res => res.json())
      .then(data => Array.isArray(data) && setSherpas(data));

    // Fetch logged-in user sherpa status
    if (token) {
      fetch("http://127.0.0.1:8000/sherpa/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => (res.ok ? res.json() : null))
        .then(setStatus);
    }
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Guide Profiles</h1>

        <div className="flex items-center gap-4">
          {/* Register button */}
          {!status?.is_sherpa && (
            <Link href="/sherpa/register">
              <button className="px-4 py-2 bg-black text-white rounded-lg">
                Register as Guide
              </button>
            </Link>
          )}

          {/* Pending verification badge */}
          {status?.is_sherpa && !status?.is_verified && (
            <span className="text-yellow-600 font-medium">
              ⏳ Pending Verification
            </span>
          )}

          {/* Update button if verified */}
          {status?.is_sherpa && status?.is_verified && (
            <Link href="/sherpa/update">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Update Info
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Sherpa cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {sherpas.map((s) => (
          <div key={s.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <img src={s.photo} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-lg font-semibold text-center mt-3">{s.name}</h3>
            <p className="text-sm text-center text-gray-500">{s.region}</p>
            <p className="text-sm text-center text-gray-500">{s.phone}(phone)</p>
            <p className="text-sm mt-2 text-center">
              {s.experience_years} yrs • ₹{s.daily_rate}
            </p>
            <p className="text-sm mt-1 text-center">
              {s.is_available ? " Available" : " Not Available"}
            </p>
            <p className="text-sm mt-1 text-center">
              {s.is_verified ? " Verified" : " Not Verified"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

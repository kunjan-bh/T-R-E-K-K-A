import React from 'react'
import Link from "next/link";

const Navbar1 = () => {
  return (
    <div className="navigation-bar">
      <div className="nav-container">
        <Link href="/" className="logo-a">
          <div className="logo">
              <div className="logo-img">
                  <img src="/mount-w.png" alt="" />
              </div>
              <span>Trekya</span>
          </div>
        </Link>
        <div className="nav-links">
          <ul>
            <li><Link href="#">Discover Nepal</Link></li>
            <li><Link href="#">AI Explore</Link></li>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar1;

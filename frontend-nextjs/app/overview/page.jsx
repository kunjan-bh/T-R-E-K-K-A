"use client";
import ProfileBtn from "@/components/ProfileBtn";
import Notify from "@/components/Notify";

const Overview = () => {
    return (
        <div className="selective-content">
          <div className="dasNav">
            <h1>DASHBOARD</h1>
            <div className="search">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
            <div className="userInfo">
              <Notify></Notify>
              <ProfileBtn></ProfileBtn>
            </div>
            
          </div>
          <div className="part-content-area">
            <div className="part-content-area-top">
              <div className="journey-card">
                <h1>JOURNEY TRACKER</h1>
                <div className="journey_default">
                  <img src="/default_journey.svg" alt="" />
                </div>
                <h2>Location is turned off</h2>
                <p>View the guide through maps, your stay and different location along the journey.</p>
              </div>
              <div className="Weather-card">
                <h1>WEATHER UPDATE</h1>
                <div className="weather_default">
                  <img src="/weather_default.svg" alt="" />
                </div>
                <h2>No relevant data Currently</h2>
                <p>You can view the live weather condition of your preferred destination</p>
              </div>
            </div>
            <div className="part-content-area-center">
              <div className="favSection">
                <h1>FAVOURITE DESTINATIONS</h1>
                <div className="fav_default">
                  <img src="/fav_default.svg" alt="" />
                </div>
                <h2>No Favourites</h2>
                <p>You can add an item to your favourites by clicking “Star Icon”</p>
              </div>
            </div>
            <div className="part-content-area-bottom">
              <div className="photo-gallery-card">
                <h1>PHOTO GALLERY</h1>
                <div className="gallery_default">
                  <img src="/gallery_default.svg" alt="" />
                </div>
                <h2>No Photos</h2>
                <p>You can add your photos during travel journey and save it as a memory.</p>
              </div>
              <div className="travel-stat-card">
                <h1>TRAVEL STATS</h1>
                <div className="travel_default">
                  <img src="/travel_default.svg" alt="" />
                </div>
                <h2>Go On A Journey!</h2>
                <p>All your travelling analysis will be displayed here from places visited to latest explored destination!</p>
              </div>
            </div>
          </div>
        </div>
    );
};
export default Overview;

"use client";
import Notify from "@/components/Notify";
import ProfileBtn from "@/components/ProfileBtn"; 

const TravelKit = ({ user_id }) => {
    return (
        <div className='travelKit-content'>
            <div className="selective-content">
                <div className="dasNav">
                    <h1>TRAVEL KIT</h1>
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
                <div className="travelKit-content-inner">
                    <div className="travelKit-content-upper">
                        <div className="travelKit-content-upper-left">
                            <div className="travelKit-content-upper-left-top">
                                <h2>Search Destinations</h2>
                                <input
                                    type="text"
                                    placeholder="Preferred Destination"
                                    className="search-input"
                                />
                            </div>
                            <div className="travelKit-content-upper-left-bottom">
                                <h2>Suggested Items</h2>
                                <div className="default-search-item">
                                    <img src="./default-Search.png" alt="Search result" />
                                    <h3>Search for item recommendations</h3>
                                </div>
                            </div>
                        </div>
                        <div className="travelKit-content-upper-right">
                            <div className="favSection">
                                <h1>FAVOURITE DESTINATIONS</h1>
                                <div className="fav_default">
                                    <img src="/fav_default.svg" alt="" />
                                </div>
                                <h2>No Favourites</h2>
                                <p>You can add an item to your favourites by clicking “Star Icon”</p>
                            </div>
                        </div>
                    </div>
                    <div className="travelKit-content-middle">
                        <h2>Extra Items</h2>
                        <input
                            type="text"
                            placeholder="Search......"
                            className="search-input"
                        />
                        <div className="default-search-item">
                            <img src="./default-search-1.svg" alt="Search result" />
                            <h3>Search for items</h3>
                        </div>
                    </div>
                    <div className="travelKit-content-lower">
                        <h2>Saved travel items set</h2>
                        <ul className="saved-items">
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TravelKit;
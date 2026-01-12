"use client";
import { useState, useEffect } from "react";
import ProfileBtn from "@/components/ProfileBtn";
import Notify from "@/components/Notify";

const Overview = ({ user_id }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCity, setSearchCity] = useState("");

    // Get API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    useEffect(() => {
        fetchWeatherByLocation();
    }, []);

    const fetchWeatherByLocation = async () => {
        try {
            setLoading(true);
            setError(null);

            // Get user's location
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000
                });
            });

            const { latitude, longitude } = position.coords;

            // Fetch weather using coordinates
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            setWeather(data);

        } catch (err) {
            if (err.code === 1) {
                setError('Location access denied. Please enable location or search for a city.');
            } else if (err.message.includes('timeout')) {
                setError('Location request timed out. Please search for a city.');
            } else {
                setError('Unable to fetch weather data. Please search for a city.');
            }
            console.error('Weather fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCity = async (city) => {
        if (!city.trim()) {
            setError("Please enter a city name in Nepal");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},Nepal&aqi=no`;
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                setError("City not found in Nepal. Please try again.");
                setWeather(null);
                setLoading(false);
                return;
            }

            const data = await response.json();

            // Verify the location is in Nepal
            if (data.location.country !== "Nepal") {
                setError("Please enter a city within Nepal only.");
                setWeather(null);
                setLoading(false);
                return;
            }

            setWeather(data);
            setSearchCity("");

        } catch (err) {
            setError("Unable to fetch weather data. Please try again.");
            setWeather(null);
            console.error('Weather fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        const conditionLower = condition.toLowerCase();
        
        if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
            return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
            return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
        } else if (conditionLower.includes("snow")) {
            return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
        } else if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
            return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (conditionLower.includes("mist") || conditionLower.includes("fog")) {
            return "https://cdn-icons-png.flaticon.com/512/4005/4005817.png";
        } else {
            return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        }
    };

    const handleSearch = () => {
        fetchWeatherByCity(searchCity);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeatherByCity(searchCity);
        }
    };

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
                
                {/* Weather Search Box */}
                <div className="weather-search">
                  <input
                    type="text"
                    placeholder="Enter city name in Nepal"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="weather-search-input"
                  />
                  <button onClick={handleSearch} className="weather-search-btn">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="Search" />
                  </button>
                </div>

                {/* Error Display */}
                {error && !loading && (
                  <div className="weather-error">
                    <p>{error}</p>
                  </div>
                )}
                
                {loading ? (
                  <div className="weather_default">
                    <img src="/weather_default.svg" alt="" />
                    <h2>Loading weather...</h2>
                  </div>
                ) : weather ? (
                  <div className="weather-content">
                    <img 
                      src={getWeatherIcon(weather.current.condition.text)} 
                      alt={weather.current.condition.text}
                      className="weather-icon" 
                    />
                    <h1 className="temp">{Math.round(weather.current.temp_c)}°C</h1>
                    <h2 className="city">{weather.location.name}</h2>
                    <p className="condition">{weather.current.condition.text}</p>
                    <div className="weather-details">
                      <div className="detail-col">
                        <img src="https://cdn-icons-png.flaticon.com/512/727/727790.png" alt="Humidity" />
                        <div>
                          <p className="humidity">{weather.current.humidity}%</p>
                          <p>Humidity</p>
                        </div>
                      </div>
                      <div className="detail-col">
                        <img src="https://cdn-icons-png.flaticon.com/512/959/959711.png" alt="Wind" />
                        <div>
                          <p className="wind">{weather.current.wind_kph} km/h</p>
                          <p>Wind Speed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : !error && (
                  <div className="weather_default">
                    <img src="/weather_default.svg" alt="" />
                    <h2>No relevant data Currently</h2>
                    <p>Search for a city to view weather information</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="part-content-area-center">
              <div className="favSection">
                <h1>FAVOURITE DESTINATIONS</h1>
                <div className="fav_default">
                  <img src="/fav_default.svg" alt="" />
                </div>
                <h2>No Favourites</h2>
                <p>You can add an item to your favourites by clicking "Star Icon"</p>
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
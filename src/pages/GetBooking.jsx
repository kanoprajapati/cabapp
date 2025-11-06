import React, { useState, useEffect } from 'react';
import '../css/GetBooking.css';
import BookingCard from '../componet/BookingCard';

export default function GetBooking({ activeColor }) {
  const [searchText, setSearchText] = useState('');
  const [typingText, setTypingText] = useState('');
  const [vehicleType, setVehicleType] = useState('all');
  const [searchArea, setSearchArea] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const vehicleNames = ['Car', 'Bike', 'Scooter', 'Auto', 'Bicycle'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const popularLocations = [
    'Connaught Place, Delhi',
    'Marine Drive, Mumbai',
    'MG Road, Bangalore',
    'Park Street, Kolkata',
    'Jubilee Hills, Hyderabad',
    'Ameerpet, Hyderabad',
    'Banjara Hills, Hyderabad',
    'Hitech City, Hyderabad',
    'Secunderabad, Hyderabad'
  ];

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = vehicleNames[currentIndex];
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypingText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 800);
        }
      } else {
        if (charIndex > 0) {
          setTypingText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % vehicleNames.length);
        }
      }
    };
    const typingSpeed = isDeleting ? 45 : 90;
    const timer = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, isDeleting]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSearchArea(value);
    if (value.length > 2) {
      const filtered = popularLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setLocationSuggestions([]);
    }
  };

  const handleSuggestionClick = (location) => {
    setSearchArea(location);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // implement booking search logic here
    setDrawerOpen(false); // close drawer on mobile/tablet
  };

  // For responsive drawer only
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="booking-root" style={{ '--active-color': activeColor }}>
      <header className="booking-header" style={{ backgroundColor: 'var(--active-color)' }}>
        <div className="header-content">
          <h1 className="header-title">Find Your Perfect Ride</h1>
          <p className="header-subtitle">Book vehicles instantly with best prices</p>
        </div>
      </header>

      <main className="booking-main">
        <button
          className="drawer-toggle"
          onClick={handleDrawerToggle}
          style={{ background: 'var(--active-color)' }}
          aria-label="Open Filters"
        >
          &#9776; Filters
        </button>

        <aside className={`booking-drawer ${drawerOpen ? 'open' : ''}`}>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label">Serach All</label>
              <div className="search-input-container">
                <input
                  type="text"
                  className="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={`Search ${typingText}...`}
                  style={{ borderColor: 'var(--active-color)' }}
                />
                <span className="typing-cursor">|</span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Vehicle Group</label>
              <select
                className="filter-select"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                style={{ borderColor: 'var(--active-color)' }}
              >
                <option value="all">All Vehicles</option>
                <option value="car">Cars</option>
                <option value="bike">Bikes</option>
                <option value="scooter">Scooters</option>
                <option value="auto">Auto Rickshaws</option>
                <option value="bicycle">Bicycles</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Search Area</label>
              <div className="location-container">
                <input
                  type="text"
                  className="search-input"
                  value={searchArea}
                  onChange={handleLocationChange}
                  placeholder="Enter location..."
                  style={{ borderColor: 'var(--active-color)' }}
                />
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {locationSuggestions.map((l, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        style={{ color: 'var(--active-color)' }}
                        onClick={() => handleSuggestionClick(l)}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Search Time</label>
              <select
                className="filter-select"
                value={searchTime}
                onChange={(e) => setSearchTime(e.target.value)}
                style={{ borderColor: 'var(--active-color)' }}
              >
                <option value="">Any Time</option>
                <option value="morning">Morning (6AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 9PM)</option>
                <option value="night">Night (9PM - 6AM)</option>
              </select>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="search-button"
                style={{
                  background: 'var(--active-color)',
                  color: '#fff'
                }}
              >
                Search Vehicles
              </button>
            </div>
          </form>
        </aside>

        <section className="booking-results">
          <h2>Available Bookings</h2>
          <div className="content-placeholder">
  <BookingCard
    bookingId="BK12345"
    pickup="Connaught Place, Delhi"
    drop="Marine Drive, Mumbai"
    adminPhone="9876543210"
  />
  <BookingCard
    bookingId="BK12346"
    pickup="MG Road, Bangalore"
    drop="Park Street, Kolkata"
    adminPhone="9876543211"
  />
  <BookingCard
    bookingId="BK12347"
    pickup="Jubilee Hills, Hyderabad"
    drop="Ameerpet, Hyderabad"
    adminPhone="9876543212"
  />
  <BookingCard
    bookingId="BK12348"
    pickup="Banjara Hills, Hyderabad"
    drop="Hitech City, Hyderabad"
    adminPhone="9876543213"
  />
</div>

        </section>
      </main>
    </div>
  );
}

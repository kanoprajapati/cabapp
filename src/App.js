import React, { useState } from 'react';
import './App.css';
import TabNavigation from './componet/TabNavigation';
import GetBooking from './pages/GetBooking';

function App() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: 'All', color: '#ff6b00' },
    { id: 'Chat', label: 'Chat', color: '#4caf50' },
    { id: 'GetBooking', label: 'Get Booking', color: '#2196f3' },
    { id: 'Beauty', label: 'Beauty', color: '#9c27b0' },
    { id: 'help', label: 'help', color: '#ff9800' },
    { id: 'CompanyProfile', label: 'Company Profile', color: '#607d8b' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getActiveTabColor = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.color : '#ff6b00';
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'All':
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>Fresh fruits</h3>
              <p>STARTS AT ₹29</p>
            </div>
            <div className="category-card">
              <h3>Milk & eggs</h3>
              <p>UP TO 40% OFF</p>
            </div>
            <div className="category-card">
              <h3>Curd & yoghurts</h3>
              <p>UP TO 30% OFF</p>
            </div>
            <div className="category-card">
              <h3>Paneer, cheese & more</h3>
              <p>UP TO 50% OFF</p>
            </div>
          </div>
        );

      case 'Chat':
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>Fresh Vegetables</h3>
              <p>UP TO 25% OFF</p>
            </div>
            <div className="category-card">
              <h3>Organic Fruits</h3>
              <p>STARTS AT ₹49</p>
            </div>
            <div className="category-card">
              <h3>Leafy Greens</h3>
              <p>UP TO 20% OFF</p>
            </div>
            <div className="category-card">
              <h3>Exotic Fruits</h3>
              <p>UP TO 35% OFF</p>
            </div>
          </div>
        );

      case 'GetBooking':
        return (
         <>
         <GetBooking activeColor={getActiveTabColor()} />
         </>
        );

      case 'Beauty':
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>Skincare</h3>
              <p>UP TO 30% OFF</p>
            </div>
            <div className="category-card">
              <h3>Makeup</h3>
              <p>UP TO 25% OFF</p>
            </div>
            <div className="category-card">
              <h3>Hair Care</h3>
              <p>UP TO 40% OFF</p>
            </div>
            <div className="category-card">
              <h3>Fragrances</h3>
              <p>UP TO 35% OFF</p>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>Prescription Drugs</h3>
              <p>UP TO 20% OFF</p>
            </div>
            <div className="category-card">
              <h3>Wellness Products</h3>
              <p>UP TO 25% OFF</p>
            </div>
            <div className="category-card">
              <h3>Ayurvedic</h3>
              <p>UP TO 30% OFF</p>
            </div>
            <div className="category-card">
              <h3>Health Devices</h3>
              <p>UP TO 15% OFF</p>
            </div>
          </div>
        );

      case 'CompanyProfile':
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>Smartphones</h3>
              <p>UP TO 40% OFF</p>
            </div>
            <div className="category-card">
              <h3>Laptops</h3>
              <p>UP TO 35% OFF</p>
            </div>
            <div className="category-card">
              <h3>Headphones</h3>
              <p>UP TO 50% OFF</p>
            </div>
            <div className="category-card">
              <h3>Smart Watches</h3>
              <p>UP TO 45% OFF</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="content-grid">
            <div className="category-card">
              <h3>All Products</h3>
              <p>BEST DEALS</p>
            </div>
            <div className="category-card">
              <h3>Featured Items</h3>
              <p>SPECIAL OFFERS</p>
            </div>
            <div className="category-card">
              <h3>Trending Now</h3>
              <p>HOT DEALS</p>
            </div>
            <div className="category-card">
              <h3>New Arrivals</h3>
              <p>FRESH STOCK</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app" style={{ 
      '--active-color': getActiveTabColor(),
      '--active-color-light': getActiveTabColor() + '20'
    }}>
       <div className="main-content">
        {renderTabContent()}
      </div>
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
      
     
    </div>
  );
}

export default App;
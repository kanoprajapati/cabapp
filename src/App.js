import React, { useState, useEffect } from 'react';
import './App.css';
import TabNavigation from './componet/TabNavigation';
import GetBooking from './pages/GetBooking';
import Help from './pages/Help';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Loding from './componet/Loding';

function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'All', label: 'All', color: '#ff6b00' },
    { id: 'Chat', label: 'Chat', color: '#4caf50' },
    { id: 'GetBooking', label: 'Get Booking', color: '#2196f3' },
    { id: 'Beauty', label: 'Beauty', color: '#9c27b0' },
    { id: 'help', label: 'help', color: '#ff9800' },
    { id: 'CompanyProfile', label: 'Company Profile', color: '#607d8b' }
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const getActiveTabColor = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.color : '#ff6b00';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'All': return <>all</>;
      case 'Chat': return <Chat activeColor={getActiveTabColor()} />;
      case 'GetBooking': return <GetBooking activeColor={getActiveTabColor()} />;
      case 'Beauty':
        return (
          <div className="content-grid">
            <div className="category-card"><h3>Skincare</h3><p>UP TO 30% OFF</p></div>
            <div className="category-card"><h3>Makeup</h3><p>UP TO 25% OFF</p></div>
            <div className="category-card"><h3>Hair Care</h3><p>UP TO 40% OFF</p></div>
            <div className="category-card"><h3>Fragrances</h3><p>UP TO 35% OFF</p></div>
          </div>
        );
      case 'help': return <Help activeColor={getActiveTabColor()} />;
      case 'CompanyProfile': return <Profile activeColor={getActiveTabColor()} />;
      default: return <>Default</>;
    }
  };

  if (loading) return <Loding />;

  return (
    <div className="app" style={{
      '--active-color': getActiveTabColor(),
      '--active-color-light': getActiveTabColor() + '20'
    }}>
      <div className="main-content">{renderTabContent()}</div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;

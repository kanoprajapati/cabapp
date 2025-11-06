import React from 'react';
import '../css/TabNavigation.css';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : 'inactive'}`}
            onClick={() => onTabChange(tab.id)}
            style={{
              '--tab-color': tab.color,
              '--tab-color-light': tab.color + '20',
              '--tab-color-light-inactive': tab.color + '10'
            }}
          >
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
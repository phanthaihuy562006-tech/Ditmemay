import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-content">
        <div className="stats-info">
          <h3>{value.toLocaleString()}</h3>
          <p>{title}</p>
        </div>
        <div className="stats-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
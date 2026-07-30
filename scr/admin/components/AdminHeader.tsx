import React from 'react';

interface AdminHeaderProps {
  title: string;
  user: any;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, user, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span>Xin chào, <strong>{user?.username}</strong></span>
        </div>
        <button onClick={onLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📁', label: 'Sản Phẩm' },
    { path: '/admin/users', icon: '👥', label: 'Người Dùng' },
    { path: '/admin/settings', icon: '⚙️', label: 'Cài Đặt' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>ADMIN DTN</h2>
        <p>File Sharing System</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/" className="back-to-site">
          <i className="fas fa-arrow-left"></i> Về Trang Chủ
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
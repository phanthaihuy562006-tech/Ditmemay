import React from 'react';
import './css/header.css';
import './css/common.css';


const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/#hero">
            <img src="/image/logo.png" alt="FastShare Logo" />
            </a>
          </div>
          <nav>
            <ul>
              <li><a href="/#hero">Trang chủ</a></li>
              <li><a href="/#files-section">Tệp tin</a></li>
              <li><a href="/Contact">Liên hệ</a></li>
              <li><a href="/About">Giới thiệu</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
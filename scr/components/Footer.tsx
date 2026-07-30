import React from 'react';
import './css/footer.css';
import './css/common.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div id="footer-content" className="footer-content">
          <div className="footer-section">
            <h3>Về chúng tôi</h3>
            <p>Đây là hệ thống chia sẻ tệp tin nhanh chóng, an toàn và miễn phí. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho người dùng.</p>
          </div>
          
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <ul className="contact-info">
              <li><i className="fas fa-map-marker-alt"></i> Bù Gia Mập, Đồng Nai</li>
              <li><i className="fas fa-phone"></i> 0342 031 354</li>
              <li><i className="fas fa-envelope"></i> dinhthenhandako@gmail.com</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Theo dõi chúng tôi</h3>
            <p>Kết nối với chúng tôi trên các mạng xã hội để cập nhật những thông tin mới nhất.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; Thế Nhân ( ĐTN ). Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
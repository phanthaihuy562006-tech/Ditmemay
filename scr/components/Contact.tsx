import React, { useEffect, useState, useRef } from 'react';
import './css/contact.css';

const ContactHero: React.FC = () => {
  return (
    <section id="contact-hero" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>
          <p>Mọi thắc mắc và góp ý xin vui lòng liên hệ trực tiếp với đội ngũ hỗ trợ</p>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: string;
  title: string;
  detail: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, detail }) => {
  return (
    <div className="contact-item flex items-center mb-6">
      <div className="contact-icon text-2xl mr-4">
        <i className={icon}></i>
      </div>
      <div className="contact-details">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{detail}</p>
      </div>
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call in production)
    setTimeout(() => {
      console.log('Form data:', formData);
      setNotification({ message: 'Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.', type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <section id="contact-section" className="py-12">
      <div className="container mx-auto px-4">
        <div className="contact-content flex flex-col md:flex-row gap-8">
          <div className="contact-info md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h2>
            <ContactItem icon="fas fa-map-marker-alt" title="Địa Chỉ" detail="Bù Gia Mập, Đồng Nai" />
            <ContactItem icon="fas fa-phone" title="Điện Thoại" detail="0342 031 354" />
            <ContactItem icon="fas fa-envelope" title="Email" detail="dinhthenhandako@gmail.com" />
            <ContactItem icon="fas fa-clock" title="Thời Gian Làm Việc" detail="Thứ 2 - Chủ Nhật: 8:00 - 22:00" />
          </div>
          <div className="contact-form md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h2>
            <form ref={formRef} className="space-y-4">
              <div className="form-group flex items-center border rounded-lg p-2 focus-within:border-blue-500">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="flex-1 outline-none"
                />
                <i className="fas fa-user text-gray-500"></i>
              </div>
              <div className="form-group flex items-center border rounded-lg p-2 focus-within:border-blue-500">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="flex-1 outline-none"
                />
                <i className="fas fa-envelope text-gray-500"></i>
              </div>
              <div className="form-group flex items-center border rounded-lg p-2 focus-within:border-blue-500">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Chủ đề"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="flex-1 outline-none"
                />
                <i className="fas fa-tag text-gray-500"></i>
              </div>
              <div className="form-group flex items-start border rounded-lg p-2 focus-within:border-blue-500">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Nội dung tin nhắn"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="flex-1 outline-none resize-none"
                ></textarea>
                <i className="fas fa-comment text-gray-500 mt-2"></i>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="submit-btn bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <><i className="fas fa-spinner fa-spin mr-2"></i> Đang gửi...</>
                ) : (
                  <><i className="fas fa-paper-plane mr-2"></i> Gửi Tin Nhắn</>
                )}
              </button>
            </form>
            {notification && (
              <div className={`fixed top-5 right-5 bg-${notification.type === 'success' ? 'green' : 'blue'}-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-slideInRight`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : 'info-circle'} mr-2`}></i>
                    <span>{notification.message}</span>
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="text-white opacity-70 hover:opacity-100"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TeamMemberProps {
  imageSrc?: string;
  name: string;
  role: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, name, role, description }) => {
  return (
    <div className="team-member text-center">
      <div className="member-image relative">
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-48 object-cover rounded-lg" />
        ) : (
          <div className="placeholder-avatar w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
            <i className="fas fa-user text-4xl text-gray-500"></i>
          </div>
        )}
        <div className="member-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="social-links flex space-x-4 text-white">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="member-info mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-gray-600">{role}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      imageSrc: '/image/team-member1.jpg',
      name: 'Đinh Thế Nhân',
      role: 'Founder & Full-stack Developer',
      description: 'Chuyên gia với 5+ năm kinh nghiệm trong phát triển hệ thống web',
    },
    {
      name: 'Nguyễn Văn A',
      role: 'Backend Developer',
      description: 'Chuyên gia xử lý dữ liệu và bảo mật hệ thống',
    },
    {
      name: 'Trần Thị B',
      role: 'UI/UX Designer',
      description: 'Chuyên gia thiết kế trải nghiệm người dùng tối ưu',
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Đội Ngũ Của Chúng Tôi</h2>
        <p className="text-center mb-8">Những chuyên gia đằng sau hệ thống chia sẻ file hàng đầu</p>
        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              imageSrc={member.imageSrc}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .animate-slideInRight {
        animation: slideInRight 0.3s ease;
      }
      .animate-slideOutRight {
        animation: slideOutRight 0.3s ease;
      }
      .form-group.focused input,
      .form-group.focused textarea {
        border-color: #3b82f6;
        background: #f3f4f6;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactSection />
      <TeamSection />
    </main>
  );
};

export default Contact;
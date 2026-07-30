
import React, { useEffect } from 'react';
import './css/about.css';

const IntroSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Giới Thiệu</h2>
          <div className="max-w-3xl mx-auto">
            <p className="mb-4">
              Đây là nền tảng chia sẻ file miễn phí được phát triển bởi Đinh Thế Nhân, 
              mang đến giải pháp lưu trữ và chia sẻ dữ liệu đơn giản, nhanh chóng và hiệu quả.
            </p>
            <p className="mb-4">
              Chúng tôi chuyên cung cấp dịch vụ chia sẻ các loại file đa dạng phục vụ cộng đồng:
            </p>
            <div className="file-types mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold">File & Code</h3>
                <p>
                  Chia sẻ source code, dự án phần mềm, script, template website, 
                  và các tài nguyên lập trình khác. Hỗ trợ đa dạng ngôn ngữ lập trình 
                  từ frontend đến backend.
                </p>
              </div>
            </div>
            <div className="features mb-6">
              <h3 className="text-xl font-semibold">Tính Năng Nổi Bật</h3>
              <ul className="list-disc list-inside">
                <li>Upload và download không giới hạn dung lượng</li>
                <li>Tốc độ truyền tải cao, ổn định</li>
                <li>Hỗ trợ đa dạng định dạng file</li>
                <li>Giao diện đơn giản, dễ sử dụng</li>
                <li>Bảo mật dữ liệu tuyệt đối</li>
                <li>Hoạt động 24/7 không gián đoạn</li>
              </ul>
            </div>
            <div className="contact-cta">
              <p>
                Mọi thắc mắc hoặc đóng góp ý kiến, vui lòng liên hệ trực tiếp 
                qua thông tin liên hệ ở cuối trang hoặc sử dụng form liên hệ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description }) => {
  return (
    <div className="timeline-item flex mb-8">
      <div className="timeline-date text-gray-500 font-semibold mr-6">{date}</div>
      <div className="timeline-content bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const timelineData: TimelineItemProps[] = [
    { date: '2019', title: 'Bắt đầu học lập trình', description: 'Bắt đầu hành trình với HTML, CSS và JavaScript cơ bản' },
    { date: '2020', title: 'Thành thạo Full-stack', description: 'Hoàn thành các dự án đầu tiên với MERN Stack' },
    { date: '2021', title: 'Freelancer đầu tiên', description: 'Nhận dự án freelance đầu tiên và xây dựng portfolio' },
    { date: '2022', title: 'Khởi nghiệp', description: 'Thành lập dự án FILE SHARE và phát triển hệ thống' },
    { date: '2023', title: 'Mở rộng quy mô', description: 'Hệ thống phục vụ hàng ngàn người dùng mỗi tháng' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Hành Trình Phát Triển</h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} date={item.date} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AchievementCardProps {
  icon: string;
  count: number;
  text: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ icon, count, text }) => {
  const [currentCount, setCurrentCount] = React.useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = count / (duration / 16);
    const updateCount = () => {
      start += step;
      if (start < count) {
        setCurrentCount(Math.floor(start));
        requestAnimationFrame(updateCount);
      } else {
        setCurrentCount(count);
      }
    };
    updateCount();
  }, [count]);

  return (
    <div className="achievement-card bg-white p-6 rounded-lg shadow text-center">
      <div className="achievement-icon text-4xl mb-4">
        <i className={icon}></i>
      </div>
      <div className="achievement-number text-2xl font-bold" data-count={count}>
        {currentCount.toLocaleString()}
      </div>
      <div className="achievement-text">{text}</div>
    </div>
  );
};

const AchievementsSection: React.FC = () => {
  const achievements: AchievementCardProps[] = [
    { icon: 'fas fa-trophy', count: 15420, text: 'Tệp tin được chia sẻ' },
    { icon: 'fas fa-download', count: 124500, text: 'Lượt tải xuống' },
    { icon: 'fas fa-clock', count: 99, text: '% Uptime hệ thống' },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Thành Tựu Nổi Bật</h2>
        <div className="achievements-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} icon={achievement.icon} count={achievement.count} text={achievement.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="philosophy-content flex flex-col md:flex-row">
          <div className="philosophy-text md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Triết Lý Làm Việc</h2>
            <blockquote className="border-l-4 border-blue-500 pl-4 mb-6">
              "Code không chỉ là công việc, đó là nghệ thuật. Mỗi dòng code là một nét vẽ, 
              mỗi hệ thống là một kiệt tác. Tôi tin rằng sự đơn giản và hiệu quả 
              luôn đi đôi với nhau."
            </blockquote>
            <div className="philosophy-points space-y-4">
              <div className="point flex items-center">
                <i className="fas fa-check mr-2"></i>
                <span>Luôn học hỏi công nghệ mới</span>
              </div>
              <div className="point flex items-center">
                <i className="fas fa-check mr-2"></i>
                <span>Chú trọng trải nghiệm người dùng</span>
              </div>
              <div className="point flex items-center">
                <i className="fas fa-check mr-2"></i>
                <span>Code sạch, tài liệu rõ ràng</span>
              </div>
              <div className="point flex items-center">
                <i className="fas fa-check mr-2"></i>
                <span>Bảo mật là ưu tiên hàng đầu</span>
              </div>
            </div>
          </div>
          <div className="philosophy-image md:w-1/2">
            <div className="code-animation space-y-2">
              <div className="code-line h-2 bg-gray-300"></div>
              <div className="code-line h-2 bg-gray-300"></div>
              <div className="code-line h-2 bg-gray-300"></div>
              <div className="code-line h-2 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes celebrate {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .scroll-animate {
        animation: fadeInUp 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <main className="min-h-screen">
      <IntroSection />
      <TimelineSection />
      <AchievementsSection />
      <PhilosophySection />
    </main>
  );
};

export default About;

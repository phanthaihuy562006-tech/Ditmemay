import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../utils/adminApi';
import StatsCard from '../components/StatsCard';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import './css/Dashboard.css';

interface DashboardStats {
  totalProducts: number;
  totalDownloads: number;
  totalCategories: number;
  recentProducts: any[];
  downloadsByCategory: { category: string; count: number }[];
  monthlyDownloads: { month: string; downloads: number }[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const admin = JSON.parse(localStorage.getItem('adminUser') || 'null');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [admin, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await adminApi.getStats();
      setStats(statsData);
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      setError(error.message || 'Không thể tải thống kê');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Dashboard" user={admin} onLogout={handleLogout} />
          <div className="loading">Đang tải thống kê...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Dashboard" user={admin} onLogout={handleLogout} />
          <div className="error-message">
            {error}
            <button onClick={fetchStats} className="retry-btn">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-main">
        <AdminHeader title="Dashboard" user={admin} onLogout={handleLogout} />
        
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              title="Tổng Sản Phẩm"
              value={stats?.totalProducts || 0}
              icon="📁"
              color="#3de9e9"
            />
            <StatsCard
              title="Tổng Lượt Tải"
              value={stats?.totalDownloads || 0}
              icon="⬇️"
              color="#255eda"
            />
            <StatsCard
              title="Danh Mục"
              value={stats?.totalCategories || 0}
              icon="📂"
              color="#ffd102"
            />
            <StatsCard
              title="Người Dùng"
              value="1.2K"
              icon="👥"
              color="#390666"
            />
          </div>

          {/* Charts Section */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Lượt Tải Theo Tháng</h3>
              <div className="bar-chart">
                {stats?.monthlyDownloads.map((item, index) => (
                  <div key={index} className="bar-container">
                    <div className="bar-label">{item.month}</div>
                    <div className="bar">
                      <div 
                        className="bar-fill"
                        style={{ height: `${(item.downloads / 500) * 100}%` }}
                      ></div>
                    </div>
                    <div className="bar-value">{item.downloads}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <h3>Phân Bổ Theo Danh Mục</h3>
              <div className="pie-chart">
                {stats?.downloadsByCategory.map((item, index) => {
                  const colors = ['#3de9e9', '#255eda', '#ffd102', '#390666', '#8B5CF6', '#10B981'];
                  const percentage = (item.count / (stats?.totalDownloads || 1)) * 100;
                  return (
                    <div key={index} className="pie-item">
                      <div className="pie-color" style={{ backgroundColor: colors[index] }}></div>
                      <span className="pie-label">{item.category}</span>
                      <span className="pie-value">{percentage.toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="recent-products">
            <h3>Sản Phẩm Phổ Biến</h3>
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Tên Sản Phẩm</th>
                    <th>Danh Mục</th>
                    <th>Lượt Tải</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.downloads}</td>
                      <td>
                        <span className="status active">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
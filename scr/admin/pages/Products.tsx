import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi, Product } from '../utils/adminApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import './css/Products.css';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const admin = JSON.parse(localStorage.getItem('adminUser') || 'null');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [admin, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await adminApi.getProducts();
      setProducts(productsData);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await adminApi.deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error: any) {
        console.error('Error deleting product:', error);
        alert('Lỗi khi xóa sản phẩm: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.fileType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (size: number) => {
    return size < 1024 ? `${size} MB` : `${(size / 1024).toFixed(1)} GB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-main">
        <AdminHeader title="Quản Lý Sản Phẩm" user={admin} onLogout={handleLogout} />
        
        <div className="products-content">
          <div className="products-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            <Link to="/admin/products/add" className="add-product-btn">
              <i className="fas fa-plus"></i> Thêm Sản Phẩm
            </Link>
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={fetchProducts} className="retry-btn">
                Thử lại
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading">Đang tải sản phẩm...</div>
          ) : (
            <div className="products-table-container">
              <div className="table-info">
                Hiển thị {filteredProducts.length} / {products.length} sản phẩm
              </div>
              
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Hình Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Danh Mục</th>
                    <th>Loại File</th>
                    <th>Kích Thước</th>
                    <th>Lượt Tải</th>
                    <th>Ngày Tạo</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product._id}>
                      <td>
                        <img 
                          src={product.thumbnail || '/placeholder-image.jpg'} 
                          alt={product.name}
                          className="product-thumb"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                          }}
                        />
                      </td>
                      <td className="product-name" title={product.name}>
                        {product.name}
                      </td>
                      <td>
                        <span className="category-badge">{product.category.name}</span>
                      </td>
                      <td>
                        <span className="file-type-badge">{product.fileType.toUpperCase()}</span>
                      </td>
                      <td>{formatFileSize(product.fileSize)}</td>
                      <td>
                        <span className="download-count">{product.downloadCount}</span>
                      </td>
                      <td>{formatDate(product.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <Link 
                            to={`/admin/products/edit/${product._id}`}
                            className="btn-edit"
                            title="Chỉnh sửa"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn-delete"
                            title="Xóa"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredProducts.length === 0 && searchTerm && (
                <div className="no-products">
                  <p>Không tìm thấy sản phẩm nào phù hợp với "{searchTerm}"</p>
                </div>
              )}
              
              {filteredProducts.length === 0 && !searchTerm && (
                <div className="no-products">
                  <p>Chưa có sản phẩm nào. <Link to="/admin/products/add">Thêm sản phẩm mới</Link></p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
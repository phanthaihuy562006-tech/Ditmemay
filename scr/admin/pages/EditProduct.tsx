import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi, Product } from '../utils/adminApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import ProductForm from '../components/ProductForm';
import './css/EditProduct.css';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const admin = JSON.parse(localStorage.getItem('adminUser') || 'null');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    if (!id) {
      setError('Không tìm thấy ID sản phẩm');
      setFetchLoading(false);
      return;
    }
    fetchProduct();
  }, [id, admin, navigate]);

  const fetchProduct = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const productData = await adminApi.getProduct(id!);
      setProduct(productData);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      setError(error.message || 'Không thể tải thông tin sản phẩm');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    
    setLoading(true);
    try {
      await adminApi.updateProduct(id, formData);
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert('Lỗi khi cập nhật sản phẩm: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (fetchLoading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Chỉnh Sửa Sản Phẩm" user={admin} onLogout={handleLogout} />
          <div className="loading">Đang tải thông tin sản phẩm...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Chỉnh Sửa Sản Phẩm" user={admin} onLogout={handleLogout} />
          <div className="error-message">
            {error}
            <button onClick={() => navigate('/admin/products')} className="retry-btn">
              Quay lại
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
        <AdminHeader title="Chỉnh Sửa Sản Phẩm" user={admin} onLogout={handleLogout} />
        
        <div className="edit-product-content">
          <div className="form-container">
            {product && (
              <ProductForm 
                product={product}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
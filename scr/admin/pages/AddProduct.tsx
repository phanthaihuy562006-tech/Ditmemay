import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { adminApi } from '../utils/adminApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import ProductForm from '../components/ProductForm';
import './css/AddProduct.css';

const AddProduct: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await adminApi.createProduct(formData);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Lỗi khi thêm sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-main">
        <AdminHeader title="Thêm Sản Phẩm Mới" user={admin} onLogout={logout} />
        
        <div className="add-product-content">
          <div className="form-container">
            <ProductForm 
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
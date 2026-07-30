import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FileCard from './components/FileCard';
import './App.css';

interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  media: string[];
  file: string;
  fileType: string;
  category: { _id: string; name: string };
  fileSize: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        console.log('API Base URL:', apiBaseUrl);
        const fullUrl = `${apiBaseUrl}/api/products`;
        console.log('Fetching from:', fullUrl);
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        console.log('Fetched data:', data);
        setProducts(data.products);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category.name))].sort();
  const types = [...new Set(products.map(product => product.fileType))].sort();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
    const matchesType = !selectedType || product.fileType === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const displayProducts = () => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;
    if (filteredProducts.length === 0) return <p>Không tìm thấy sản phẩm nào phù hợp.</p>;

    return filteredProducts.map(product => (
      <FileCard
        key={product._id}
        product={product}
        onViewDetail={(id: string) => navigate(`/detail/${id}`)} // Thêm tiền tố /detail/
      />
    ));
  };


  return (
    <div className="App">
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>CHIA SẺ TỆP TIN FREE BY ĐTN</h2>
            <p>Hệ thống chia sẻ tệp tin miễn phí mới nhất được tạo bởi <strong>Đinh Thế Nhân</strong>.</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button><i className="fas fa-search"></i> Tìm kiếm</button>
            </div>
          </div>
        </div>
      </section>

      <section id="files-section" className="files-section">
        <div className="container">
          <h2 className="section-title">Tệp tin phổ biến</h2>
          <div className="filters">
            <div className="select-wrapper">
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="select-arrow"><i className="fas fa-chevron-down"></i></span>
            </div>
            <div className="select-wrapper">
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tất cả định dạng</option>
                {types.map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
              <span className="select-arrow"><i className="fas fa-chevron-down"></i></span>
            </div>
          </div>
          <div className="files-grid">{displayProducts()}</div>
        </div>
      </section>
    </div>
  );
};

export default App;
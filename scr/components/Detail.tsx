import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/detail.css';

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
  description?: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('No product ID provided');
        setLoading(false);
        console.log('No ID provided, setting error');
        return;
      }
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const fullUrl = `${apiBaseUrl}/api/products/${id}`;
        console.log('Fetching product from:', fullUrl);
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Raw API response:', data);
        const productData: Product = {
          _id: data._id || '',
          name: data.name || 'Unnamed',
          thumbnail: data.thumbnail || '',
          media: Array.isArray(data.media) ? data.media : [],
          file: data.file || '',
          fileType: data.fileType || '',
          category: { _id: data.category?._id || '', name: data.category?.name || 'Unknown' },
          fileSize: data.fileSize || 0,
          downloadCount: data.downloadCount || 0,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          description: data.description || '',
        };
        console.log('Processed product data:', productData);
        setProduct(productData);
        setError(null);
      } catch (error: any) {
        console.error('Fetch error details:', error);
        setError(`Failed to fetch product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const mediaContent = product?.media.map((media, index) => {
    const isVideo = media.endsWith('.mp4') || media.endsWith('.avi');
    return isVideo ? (
      <video
        key={index}
        src={media}
        controls
        className={`media-item ${index === currentIndex ? 'active' : ''}`}
        style={{ width: '100%', height: 'auto', transition: 'opacity 0.3s' }}
      />
    ) : (
      <img
        key={index}
        src={media}
        alt={`${product?.name} preview ${index + 1}`}
        className={`media-item ${index === currentIndex ? 'active' : ''}`}
        style={{ width: '100%', height: 'auto', transition: 'opacity 0.3s' }}
        loading="lazy"
      />
    );
  }) || [];

  const thumbnailContent = product?.media.map((media, index) => {
    const isVideo = media.endsWith('.mp4') || media.endsWith('.avi');
    return (
      <div
        key={index}
        className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
        data-index={index}
        onClick={() => setCurrentIndex(index)}
      >
        {isVideo ? <i className="fas fa-video"></i> : <img src={media} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%' }} loading="lazy" />}
      </div>
    );
  }) || [];

  const handlePrev = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + (product?.media.length || 1)) % (product?.media.length || 1)),
    [product?.media.length]
  );
  const handleNext = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % (product?.media.length || 1)),
    [product?.media.length]
  );

  useEffect(() => {
    const observeElements = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-animate');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeElements('.section-title');
    observeElements('.detail-card');
    observeElements('.media-column');
    observeElements('.info-column');
  }, []);

  const getTimeAgo = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày trước`;
  };

  const handleDownload = async () => {
  if (!product?.file || !id) {
    console.error('No product file or ID');
    return;
  }

  try {
    // 1. Gọi API để tăng lượt tải TRƯỚC khi download
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    const incrementUrl = `${apiBaseUrl}/api/products/${id}/download`; // Sử dụng route PATCH hiện có
    
    console.log('Incrementing download count...');
    const incrementResponse = await fetch(incrementUrl, {
      method: 'PATCH', // Route incrementDownloadCount là PATCH
      headers: { 
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` nếu cần auth
      },
    });

    if (!incrementResponse.ok) {
      console.warn('Failed to increment download count:', incrementResponse.status);
      // Không throw error, vẫn cho tải file
    } else {
      // Optional: Update UI với count mới
      try {
        const data = await incrementResponse.json();
        setProduct(prev => prev ? { ...prev, downloadCount: data.product?.downloadCount || prev.downloadCount } : null);
        console.log('Download count updated:', data.product?.downloadCount);
      } catch (e) {
        console.log('Could not parse increment response');
      }
    }

    // 2. GIỮ NGUYÊN CÁCH TẢI TRỰC TIẾP
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = product.file; // URL Cloudinary
      downloadLinkRef.current.download = `${product.name}.${product.fileType}` || 'file';
      downloadLinkRef.current.click();
      console.log('Direct download initiated');
    }

  } catch (error: any) {
    console.error('Download increment error:', error);
    // Fallback: vẫn tải trực tiếp nếu API fail
    console.warn('API failed, proceeding with direct download');
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = product.file;
      downloadLinkRef.current.download = `${product.name}.${product.fileType}` || 'file';
      downloadLinkRef.current.click();
    }
  }
};

  if (loading) return <p style={{ textAlign: 'center' }}>Đang tải...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'var(--warning)' }}>{error}</p>;
  if (!product) return <p style={{ textAlign: 'center', color: 'var(--warning)' }}>Không tìm thấy tệp tin.</p>;

  return (
    <section id="detail-section" className="files-section">
      <div className="container">
        <h2 className="section-title">Chi tiết tệp tin</h2>
        <div className="file-detail">
          <div className="file-card detail-card">
            <div className="detail-layout">
              <div className="media-column">
                <div className="media-carousel">
                  {mediaContent}
                  <button className="carousel-btn prev-btn" onClick={handlePrev}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="carousel-btn next-btn" onClick={handleNext}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <div className="thumbnail-container">{thumbnailContent}</div>
              </div>
              <div className="info-column">
                <div className="file-info">
                  <h3 className="file-name">{product.name}</h3>
                  <p className="file-type-detail">
                    <i className="fas fa-file-alt"></i> Loại file: <span>{product.fileType.toUpperCase()}</span>
                  </p>
                  <p className="file-size">
                    <i className="fas fa-weight-hanging"></i> Dung lượng: <span>{product.fileSize} MB</span>
                  </p>
                  <p className="file-category">
                    <i className="fas fa-tags"></i> Danh mục: <span>{product.category.name}</span>
                  </p>
                  <p className="file-downloads">
                    <i className="fas fa-download"></i> Lượt tải: <span>{product.downloadCount}</span>
                  </p>
                  <p className="file-uploaded">
                    <i className="far fa-clock"></i> Thời gian tải lên: <span>{getTimeAgo(product.createdAt)}</span>
                  </p>
                  <p className="file-description">
                    <i className="fas fa-info-circle"></i> Mô tả: <br />
                    <span>{product.description || 'Không có mô tả'}</span>
                  </p>
                  <button
                    className="download-btn"
                    onClick={handleDownload}
                  >
                    Tải xuống
                  </button>
                  <a ref={downloadLinkRef} style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="#/files-section"
          className="back-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <i className="fas fa-arrow-left"></i> Quay lại danh sách
        </a>
      </div>
    </section>
  );
};

export default Detail;
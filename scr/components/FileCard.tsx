import React from 'react';

interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  fileType: string;
  fileSize: number;
  downloadCount: number;
  createdAt: string;
  category: { name: string };
}

interface FileCardProps {
  product: Product;
  onViewDetail?: (id: string) => void; // Optional cho App.tsx
  isDetail?: boolean; // Để phân biệt chế độ chi tiết
}

const FileCard: React.FC<FileCardProps> = ({ product, onViewDetail, isDetail = false }) => {
  const getTimeAgo = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày trước`;
  };

  return (
    <div className="file-card">
      <div className="file-icon">
        <img src={product.thumbnail} alt={product.name} style={{ maxHeight: '150px', objectFit: 'contain' }} />
      </div>
      <div className="file-info">
        <h3>{product.name}</h3>
        <p>
          <span>{product.fileType.toUpperCase()}</span>
          <span>{product.fileSize} MB</span>
        </p>
        <div className="file-meta">
          <span><i className="fas fa-download"></i> {product.downloadCount}</span>
          <span><i className="far fa-clock"></i> {getTimeAgo(product.createdAt)}</span>
        </div>
        {!isDetail && onViewDetail && (
          <button
            className="view-detail-btn"
            onClick={() => onViewDetail(product._id)}
          >
            <i className="fas fa-eye"></i> Xem chi tiết
          </button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
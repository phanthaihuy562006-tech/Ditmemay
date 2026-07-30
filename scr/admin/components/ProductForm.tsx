import React, { useState, useEffect } from 'react';
import { Product } from '../utils/adminApi';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category._id || '',
    fileType: product?.fileType || '',
    fileSize: product?.fileSize || 0
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(product?.thumbnail || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    submitData.append('fileType', formData.fileType);
    submitData.append('fileSize', formData.fileSize.toString());

    if (thumbnail) submitData.append('thumbnail', thumbnail);
    if (mainFile) submitData.append('file', mainFile);
    
    mediaFiles.forEach(file => {
      submitData.append('media', file);
    });

    await onSubmit(submitData);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Tên Sản Phẩm *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      <div className="form-group">
        <label>Mô Tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          placeholder="Nhập mô tả sản phẩm"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Danh Mục *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Chọn danh mục</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div className="form-group">
          <label>Loại File *</label>
          <select
            value={formData.fileType}
            onChange={(e) => setFormData({...formData, fileType: e.target.value})}
            required
          >
            <option value="">Chọn loại file</option>
            <option value="pdf">PDF</option>
            <option value="zip">ZIP</option>
            <option value="psd">PSD</option>
            <option value="ai">AI</option>
            <option value="figma">Figma</option>
          </select>
        </div>

        <div className="form-group">
          <label>Kích Thước (MB) *</label>
          <input
            type="number"
            value={formData.fileSize}
            onChange={(e) => setFormData({...formData, fileSize: Number(e.target.value)})}
            required
            min="0"
            step="0.1"
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>File Chính {!product && '*'}</label>
        <input
          type="file"
          onChange={handleFileChange}
          required={!product}
          accept=".pdf,.zip,.psd,.ai,.figma,.mp4,.avi,.jpg,.jpeg,.png"
        />
        <small>Chấp nhận: PDF, ZIP, PSD, AI, Figma, video, hình ảnh</small>
      </div>

      <div className="form-group">
        <label>Ảnh Thumbnail</label>
        <input
          type="file"
          onChange={handleThumbnailChange}
          accept="image/*"
        />
        {thumbnailPreview && (
          <div className="thumbnail-preview">
            <img src={thumbnailPreview} alt="Thumbnail preview" />
          </div>
        )}
        <small>Ảnh đại diện cho sản phẩm</small>
      </div>

      <div className="form-group">
        <label>Media Files (Hình ảnh/Video)</label>
        <input
          type="file"
          onChange={handleMediaChange}
          multiple
          accept="image/*,video/*"
        />
        <small>Có thể chọn nhiều file hình ảnh hoặc video</small>
        {mediaFiles.length > 0 && (
          <div className="media-files-count">
            Đã chọn {mediaFiles.length} file
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'ĐANG LƯU...' : (product ? 'CẬP NHẬT' : 'THÊM SẢN PHẨM')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
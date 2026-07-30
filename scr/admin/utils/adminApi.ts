
export interface Product {
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const adminApi = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Products response:', data);
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Product response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  createProduct: async (productData: FormData): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        body: productData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Create product response:', data);
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        body: productData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update product: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Update product response:', data);
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }
      
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      const products = await adminApi.getProducts();
      
      const totalDownloads = products.reduce((sum, product) => sum + product.downloadCount, 0);
      const categories = [...new Set(products.map(p => p.category.name))];
      
      return {
        totalProducts: products.length,
        totalDownloads,
        totalCategories: categories.length,
        recentProducts: products
          .sort((a, b) => b.downloadCount - a.downloadCount)
          .slice(0, 5)
          .map(p => ({
            name: p.name,
            downloads: p.downloadCount,
            category: p.category.name
          })),
        downloadsByCategory: categories.map(cat => ({
          category: cat,
          count: products.filter(p => p.category.name === cat).reduce((sum, p) => sum + p.downloadCount, 0)
        })),
        monthlyDownloads: [
          { month: 'Jan', downloads: Math.floor(Math.random() * 500) },
          { month: 'Feb', downloads: Math.floor(Math.random() * 500) },
          { month: 'Mar', downloads: Math.floor(Math.random() * 500) },
          { month: 'Apr', downloads: Math.floor(Math.random() * 500) },
          { month: 'May', downloads: Math.floor(Math.random() * 500) },
          { month: 'Jun', downloads: Math.floor(Math.random() * 500) }
        ]
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};
import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API
    if (email === 'admin@dtn.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        username: 'Admin',
        email: email
      };
      setAdmin(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminUser');
  };

  return {
    admin,
    login,
    logout,
    isAuthenticated: !!admin,
    loading
  };
};
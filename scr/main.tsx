import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Detail from './components/Detail.tsx'; 
import Contact from './components/Contact.tsx';
import About from './components/About.tsx';
import { AdminAuthProvider } from './admin/contexts/AdminAuthContext';
import AdminLogin from './admin/pages/AdminLogin.tsx';
import Dashboard from './admin/pages/Dashboard.tsx';
// import Products from './admin/pages/Products.tsx';
import AddProduct from './admin/pages/AddProduct.tsx';
import EditProduct from './admin/pages/EditProduct.tsx';

// Layout cho trang người dùng (có Header & Footer)
const UserLayout = () => (
  <div className="user-layout">
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/detail/:id" element={<Detail />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

// Layout cho admin (không có Header & Footer của user)
const AdminLayout = () => (
  <div className="admin-layout">
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      {/* <Route path="/admin/products" element={<Products />} /> */}
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
  </div>
);

// Protected Route Component đơn giản
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const admin = JSON.parse(localStorage.getItem('adminUser') || 'null');
  return admin ? <>{children}</> : <AdminLogin />;
};

// Admin Routes với protected routes
const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route 
      path="/admin/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin/products/add" 
      element={
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/admin/products/edit/:id" 
      element={
        <ProtectedRoute>
          <EditProduct />
        </ProtectedRoute>
      } 
    />
    <Route path="/admin" element={<AdminLogin />} />
  </Routes>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* User Routes với Header & Footer */}
          <Route path="/*" element={<UserLayout />} />
          
          {/* Admin Routes không có Header & Footer của user */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Reservar from '../pages/Reservar';
import Dashboard from '../pages/Dashboard';

/**
 * Componente que protege rutas que requieren autenticación
 * Solo administradores pueden acceder a rutas admin
 */
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

/**
 * AppRoutes - Define todas las rutas de la aplicación
 */
function AppRoutes() {

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/reservar" element={<Reservar />} />

      {/* Rutas protegidas - Solo para administradores */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

/**
 * AppRouter - Componente raíz con BrowserRouter y AuthProvider
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
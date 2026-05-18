/**
 * AuthContext - Contexto global de autenticación
 * Maneja el estado de autenticación y proporciona funciones para login/logout/register
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Crear el contexto
const AuthContext = createContext(null);

/**
 * AuthProvider - Proveedor del contexto de autenticación
 * Envuelve la aplicación para dar acceso al estado de autenticación
 */
export function AuthProvider({ children }) {
  // Estado del usuario autenticado
  const [user, setUser] = useState(null);
  
  // Estado de carga (mientras se verifica sesión)
  const [loading, setLoading] = useState(true);
  
  // Estado de errores
  const [error, setError] = useState('');

  // Efecto que se ejecuta al montar el componente
  // Verifica si hay una sesión activa en localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const session = authService.getCurrentSession();
        if (session) {
          setUser(session);
        }
      } catch (err) {
        console.error('Error al inicializar sesión:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Función de Login
   */
  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const session = await authService.login(email, password);
      setUser(session);
      
      return { success: true, user: session };
    } catch (err) {
      const errorMsg = err.message || 'Error al iniciar sesión';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función de Logout
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError('');
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Error al cerrar sesión';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función de Registro
   */
  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      
      const session = await authService.register(userData);
      setUser(session);
      
      return { success: true, user: session };
    } catch (err) {
      const errorMsg = err.message || 'Error al registrarse';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = !!user;

  /**
   * Verifica si el usuario es administrador
   */
  const isAdmin = user?.rol === 'admin';

  // Valor del contexto que se proporciona a todos los componentes
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para usar el contexto de autenticación
 * @returns {Object} - Objeto con user, login, logout, etc.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
}

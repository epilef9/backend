/**
 * Servicio de Autenticación Mock
 * simula un servicio de backend sin base de datos
 * usa localStorage para persistencia de datos
 */

//  Cuentas mockeadas hardcodeadas
const MOCK_USERS = [
  {
    id: '1',
    nombre: 'Administrador',
    email: 'admin@barberia.com',
    password: 'admin123',
    rol: 'admin',
    telefono: '099 123 456',
  },
  {
    id: '2',
    nombre: 'Usuario Cliente',
    email: 'usuario@barberia.com',
    password: 'usuario123',
    rol: 'usuario',
    telefono: '099 789 012',
  }
];

const STORAGE_KEY = 'barberia_session_v1';

/**
 * Login - Autentica un usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} - Usuario autenticado con token mock
 * 
 * 
 */
export const authService = {
  login: async (email, password) => {
    // Simula delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Busca el usuario en la lista de cuentas mockeadas
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Crea un objeto de sesión sin incluir la contraseña
    const session = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      telefono: user.telefono,
      token: `mock_token_${user.id}_${Date.now()}`, // Mock token
      loginTime: new Date().toISOString()
    };

    // Guarda la sesión en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

    return session;
  },

  /**
   * Logout - Cierra la sesión del usuario
   */
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Register - Simula registro de nuevo usuario
   * @param {Object} userData - Datos del nuevo usuario
   * @returns {Promise<Object>} - Usuario registrado con sesión activa
   */
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: 'usuario', // Nuevos usuarios son clientes
      telefono: userData.telefono || ''
    };

    // 
    // Por ahora, solo lo guardamos en memoria (se pierde al recargar)
    MOCK_USERS.push(newUser);

    // Auto-login después del registro
    const session = {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      rol: newUser.rol,
      telefono: newUser.telefono,
      token: `mock_token_${newUser.id}_${Date.now()}`,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

    return session;
  },

  /**
   * GetCurrentSession - Obtiene la sesión actual del localStorage
   * @returns {Object|null} - Sesión si existe, null si no hay sesión activa
   */
  getCurrentSession: () => {
    const sessionData = localStorage.getItem(STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  },

  /**
   * IsAuthenticated - Verifica si hay una sesión activa
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return authService.getCurrentSession() !== null;
  }
};

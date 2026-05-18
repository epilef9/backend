import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/images/logo.jpeg';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Componente de icono SVG para Google
// Representa el logo de Google para el botón de login social
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Componente de icono SVG para Facebook
// Representa el logo de Facebook para el botón de login social
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();

  // Estado para almacenar los datos del formulario de login
  // Incluye: email y contraseña
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Estado para controlar la visibilidad de la contraseña
  // Se usa para mostrar/ocultar el icono del ojo en el campo de contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para almacenar los errores de validación del formulario
  // Ejemplo: { email: "Email no válido" }
  const [errors, setErrors] = useState({});

  // Estado para mostrar mensajes de éxito después de enviar el formulario
  const [success, setSuccess] = useState('');

  // Función que se ejecuta cuando el usuario escribe en cualquier campo del formulario
  // Actualiza el estado de formData y limpia el error del campo si existía
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualiza el valor del campo correspondiente en formData
    setFormData({
      ...formData,
      [name]: value
    });

    // Si había un error en este campo, lo limpia cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Función que se ejecuta cuando el usuario intenta enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Objeto para almacenar los errores encontrados
    const newErrors = {};

    // Validación del email
    // Verifica que el email no esté vacío y que tenga un formato válido
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    // Validación de la contraseña
    // Verifica que la contraseña no esté vacía y que tenga al menos 6 caracteres
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener a    l menos 6 caracteres';
    }

    // Si hay errores, los guarda en el estado y detiene el envío
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Intenta hacer login con el contexto de autenticación
    handleLoginSubmit();
  };

  const handleLoginSubmit = async () => {
    const result = await login(formData.email, formData.password);

    if (result.success) {
      setSuccess('¡Inicio de sesión exitoso!');
      
      // Redirige al usuario después de 1.5 segundos
      setTimeout(() => {
        // Si es admin, va al dashboard; si no, va al home
        const redirectTo = result.user.rol === 'admin' ? '/dashboard' : '/home';
        navigate(redirectTo);
      }, 1500);
    } else {
      // Muestra el error del contexto si el login falla
      setErrors({ submit: result.error });
    }
  };

  return (
    // Contenedor principal con fondo oscuro y animaciones de entrada
    <div className="min-h-screen bg-[#0E0E0E] font-dm relative overflow-hidden flex items-center justify-center p-4 pt-24">
      {/* Navbar con navegación */}
      <Navbar />

      {/* Fondos decorativos con efecto de brillo */}
      <div className="glow-red" />
      <div className="glow-blue" />
      <div className="stripe-texture" />

      {/* Contenedor de contenido principal */}
      <div className="relative z-10 w-full max-w-sm mx-auto">
        
        {/* Logo de la barbería con animación de entrada */}
        <div className="animate-slide-up delay-1 flex justify-center mb-8">
          <div className="relative w-28 h-28 rounded-full border-2 border-white/20 bg-black flex items-center justify-center ring-4 ring-white/5 shadow-lg overflow-hidden">
            <img 
              src={logoImage} 
              alt="Barbería Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Encabezado con título y subtítulo */}
        <div className="animate-slide-up delay-2 text-center mb-6">
          <h1 className="font-bebas text-5xl tracking-widest text-white leading-tight">
            BIENVENIDO
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Línea divisora decorativa con colores de gradiente */}
        <div className="animate-slide-up delay-3 flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
        </div>

        {/* Tarjeta del formulario con efecto de vidrio y animación */}
        <div className="animate-slide-up delay-4 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl">
          {/* Formulario de login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo de entrada: Email */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {/* Muestra mensaje de error si existe */}
              {errors.email && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.email}</p>
              )}
            </div>

            {/* Campo de entrada: Contraseña con toggle para mostrar/ocultar */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
                />
                {/* Botón para mostrar/ocultar contraseña */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Muestra mensaje de error si existe */}
              {errors.password && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.password}</p>
              )}
            </div>

            {/* Enlace para recuperar contraseña olvidada */}
            <div className="text-right">
              <a href="#" className="text-xs text-white/30 hover:text-[#2AACE8] transition">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Mensaje de éxito que se muestra después de enviar el formulario */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300 text-center">{success}</p>
              </div>
            )}

            {/* Mensaje de error del servidor */}
            {errors.submit && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300 text-center">{errors.submit}</p>
              </div>
            )}

            {/* Botón de envío del formulario */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bebas text-lg tracking-[0.15em] text-white bg-[#E8362A] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,54,42,0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'INGRESANDO...' : 'ENTRAR'}
            </button>
          </form>

          {/* Divisor con texto para separar login y login social */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/25">o continúa con</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Botones de login con redes sociales (Google y Facebook) */}
          <div className="flex gap-3">
            {/* Botón de Google */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/4 text-white/50 text-xs hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <GoogleIcon />
              Google
            </button>

            {/* Botón de Facebook */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/4 text-white/50 text-xs hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <FacebookIcon />
              Facebook
            </button>
          </div>
        </div>

        {/* Enlace para ir a la página de registro */}
        <div className="animate-slide-up delay-5 text-center mt-6">
          <p className="text-xs text-white/40">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-[#2AACE8] font-medium hover:opacity-75 transition">
              Regístrate gratis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

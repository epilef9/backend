import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/images/logo.jpeg';
import Navbar from '../components/Navbar';

export default function Register() {
  // Estado para almacenar los datos del formulario de registro
  // Incluye: nombre, email, teléfono, contraseña y confirmación de contraseña
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  // Estado para controlar la visibilidad de la contraseña
  // Se usa para mostrar/ocultar el icono del ojo en el campo de contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para controlar la visibilidad de la confirmación de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para almacenar los errores de validación del formulario
  // Ejemplo: { nombre: "El nombre es requerido" }
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
    
    // Limpia los errores previos
    setErrors({});
    
    // Muestra mensaje de que el registro está deshabilitado
    setSuccess('Registro deshabilitado por el momento.');
    
    // Después de 2 segundos, limpia el formulario y los mensajes
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      setSuccess('');
    }, 2000);
  };

  return (
    // Contenedor principal con fondooscuro y animaciones de entrada
    <div className="min-h-screen bg-[#0E0E0E] font-dm relative overflow-hidden flex items-center justify-center p-4 pt-24">
      {/* Navbar con navegación */}
      <Navbar />

      {/* Fondos decorativos con efecto de brillo */}
      <div className="glow-red" />
      <div className="glow-blue" />
      <div className="stripe-texture" />

      {/* Contenedor de contenido principal */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
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
            REGISTRO
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">
            Crea tu cuenta
          </p>
        </div>

        {/* Línea divisora decorativa con colores de gradiente */}
        <div className="animate-slide-up delay-3 flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
        </div>

        {/* Tarjeta del formulario con efecto de vidrio y animación */}
        <div className="animate-slide-up delay-4 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl max-h-[85vh] overflow-y-auto hide-scrollbar">
          {/* Formulario de registro */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo de entrada: Nombre completo */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {/* Muestra mensaje de error si existe */}
              {errors.nombre && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.nombre}</p>
              )}
            </div>

            {/* Campo de entrada: Email (deshabilitado) */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@barberia.com"
                
                className="w-full bg-zinc-500/20 border border-zinc-400/30 rounded-xl px-4 py-3 text-zinc-300 placeholder-zinc-400 text-sm "
              />
              {/* Muestra mensaje de error si existe */}
              {errors.email && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.email}</p>
              )}
            </div>

            {/* Campo de entrada: Teléfono */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="099 123 456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {/* Muestra mensaje de error si existe */}
              {errors.telefono && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.telefono}</p>
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

            {/* Campo de entrada: Confirmación de contraseña con toggle */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
                />
                {/* Botón para mostrar/ocultar confirmación de contraseña */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Muestra mensaje de error si existe */}
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Mensaje de éxito que se muestra después de enviar el formulario */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300 text-center">{success}</p>
              </div>
            )}

            {/* Botón de envío del formulario */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bebas text-lg tracking-[0.15em] text-white bg-[#E8362A] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,54,42,0.45)] transition-all mt-2"
            >
              REGISTRARSE
            </button>
          </form>
        </div>

        {/* Enlace para ir a la página de login */}
        <div className="animate-slide-up delay-5 text-center mt-6">
          <p className="text-xs text-white/40">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-[#2AACE8] font-medium hover:opacity-75 transition">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, HelpCircle, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    // nav arriba, lo puse fixed asi te persigue
    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 flex items-center justify-between border-b border-zinc-800/30 bg-[#050505]/70 backdrop-blur-xl">
            {/* logo  fachero con link para volver al inicio */}
            <Link to="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                <Scissors size={26} className="text-cyan-400 -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hidden sm:block" />
                BARBER<span className="text-red-500">.</span>
            </Link>
            
            {/* links centrales */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-10 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                <a href="/" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Inicio</a>
                <a href="/reservar" className="hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300">Reservar</a>
            </div>

            {/* zona derecha: botonera de sesion o modo anonimo  */}
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    // si inicio sesion, mostramos nombre, botones de accion y cerrar sesion
                    <div className="flex items-center gap-3">
                        {/* Perfil del usuario */}
                        <Link to="/perfil" className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all cursor-pointer group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-1 flex items-center justify-center border border-zinc-700 overflow-hidden font-bold text-white text-xs">
                                {user?.nombre?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                                {isAdmin ? 'Administrador' : (user?.nombre || 'Usuario')}
                            </span>
                        </Link>

                        {/* Botón Dashboard si es Admin */}
                        {isAdmin && (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="hidden sm:flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 px-4 py-2 rounded-lg text-cyan-300 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/30 hover:border-cyan-400 transition-all"
                                title="Ir al Dashboard"
                            >
                                <LayoutDashboard size={16} />
                                <span>Dashboard</span>
                            </button>
                        )}

                        {/* Botón Cerrar Sesión */}
                        <button
                            onClick={async () => {
                                await logout();
                                navigate('/home');
                            }}
                            className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 px-4 py-2 rounded-lg text-red-300 text-xs font-bold uppercase tracking-widest hover:bg-red-500/30 hover:border-red-400 transition-all"
                            title="Cerrar sesión"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Salir</span>
                        </button>
                    </div>
                ) : (
                    // si no inicio sesion mostramos el modo anonimo con un iconito y el boton de login
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-zinc-500 bg-zinc-900/40 border border-zinc-800 px-3 py-1.5 rounded-full" title="Usted no ha iniciado sesión">
                            <HelpCircle size={18} className="text-zinc-600" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Anónimo</span>
                        </div>
                        <Link to="/login" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-none text-xs font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all">
                            <LogIn size={16} />
                            Acceder
                        </Link>
                    </div>
                )}

                {/* boton */}
                <div className="flex md:hidden text-white cursor-pointer group ml-3">
                    <div className="space-y-1.5 flex flex-col items-end">
                        <div className="w-8 h-[2px] bg-white group-hover:bg-cyan-400 transition-colors"></div>
                        <div className="w-6 h-[2px] bg-white group-hover:bg-cyan-400 transition-colors"></div>
                        <div className="w-4 h-[2px] bg-red-500 group-hover:w-8 transition-all"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

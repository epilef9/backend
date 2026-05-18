import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Perfil() {
    // Datos de ejemplo del usuario
    const [usuario] = useState({
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '+34 612 345 678',
        imagen: 'https://via.placeholder.com/150',
        miembro_desde: '2024-01-15'
    });
    
    // Ejemplo de turnos reservados
    const [turnosReservados] = useState([
        {
            id: 1,
            fecha: '2026-04-25',
            hora: '10:00',
            servicio: 'Corte de cabello',
            peluquero: 'Carlos'
        },
        {
            id: 2,
            fecha: '2026-05-02',
            hora: '14:30',
            servicio: 'Afeitado y barba',
            peluquero: 'Miguel'
        }
    ]);

    // Datos de ejemplo de historial de turnos
    const [historialTurnos] = useState([
        {
            id: 101,
            fecha: '2026-04-18',
            hora: '11:00',
            servicio: 'Corte de cabello',
            peluquero: 'Carlos',
            estado: 'Completado'
        },
        {
            id: 102,
            fecha: '2026-04-11',
            hora: '15:00',
            servicio: 'Tratamiento capilar',
            peluquero: 'Sofia',
            estado: 'Completado'
        },
        {
            id: 103,
            fecha: '2026-04-04',
            hora: '09:30',
            servicio: 'Corte fade',
            peluquero: 'Miguel',
            estado: 'Completado'
        }
    ]);

    return (
        <div className="min-h-screen bg-[#050505] font-sans relative overflow-hidden">
            <Navbar />
            
            {/* Luces de fondo */}
            <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-l from-red-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
            <div className="absolute top-0 left-0 w-[50vw] h-[100vh] bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0 fixed"></div>

            {/* Contenido */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 pt-28">
                {/* Header */}
                <header className="animate-slide-up delay-1 mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="h-[2px] w-12 bg-cyan-500"></span>
                        <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm">Perfil Personal</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase">
                        Gestiona tus datos y reservas
                    </p>
                </header>

                {/* Linea divisora  */}
                <div className="animate-slide-up delay-2 flex items-center gap-3 mb-12 hidden">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
                </div>

                {/* Sección de Datos del Usuario */}
                <section className="animate-slide-up delay-3 bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-8 mb-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/20 rounded-full blur-[50px] -z-10 pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row items-start gap-8 justify-between">
                        <div className="flex items-start gap-8 flex-1">
                            <div className="flex-shrink-0">
                                <img
                                    src={usuario.imagen}
                                    className="h-40 w-40 rounded-full object-cover border-4 border-[#2AACE8] ring-4 ring-[#2AACE8]/20 shadow-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-black text-2xl md:text-3xl tracking-tight text-white mb-8 uppercase">
                                    Mi Perfil
                                </h2>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Nombre</p>
                                            <p className="text-white font-semibold">{usuario.nombre}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Teléfono</p>
                                            <p className="text-white font-semibold">{usuario.telefono}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Email</p>
                                            <p className="text-white font-semibold">{usuario.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Miembro desde</p>
                                            <p className="text-white font-semibold">{new Date(usuario.miembro_desde).toLocaleDateString('es-ES')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 self-end">
                            <button className="px-8 py-3 rounded-none font-black text-sm tracking-[0.15em] text-white bg-[#2AACE8] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,172,232,0.45)] transition-all uppercase whitespace-nowrap">
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </section>

                {/* Sección de Turnos Reservados */}
                <section className="animate-slide-up delay-4 bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-8 mb-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <h3 className="font-black text-xl md:text-2xl tracking-tight text-white mb-6 uppercase">
                        Próximos Turnos
                    </h3>
                    {turnosReservados.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {turnosReservados.map((turno) => (
                                <div 
                                    key={turno.id} 
                                    className="bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-6 hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-all relative"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="font-black text-lg text-white tracking-tight uppercase">{turno.servicio}</p>
                                        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-none border border-cyan-500/30 font-black uppercase tracking-wide">
                                            Reservado
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-white/70 text-sm font-semibold">
                                            📅 {new Date(turno.fecha).toLocaleDateString('es-ES')} a las {turno.hora}
                                        </p>
                                        <p className="text-white/70 text-sm font-semibold">
                                            💈 Peluquero: <span className="text-white font-black">{turno.peluquero}</span>
                                        </p>
                                    </div>
                                    <button className="mt-4 w-full py-2 text-xs text-red-500 hover:text-white hover:bg-red-500/20 rounded-none transition border border-transparent hover:border-red-500 font-black uppercase tracking-wider">
                                        Cancelar Turno
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/40">No tienes turnos reservados</p>
                    )}
                </section>

                {/* Historial de Turnos */}
                <section className="animate-slide-up delay-5 bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <h3 className="font-black text-xl md:text-2xl tracking-tight text-white mb-6 uppercase">
                        Historial de Turnos
                    </h3>
                    {historialTurnos.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-black">Fecha</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-black">Hora</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-black">Servicio</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-black">Peluquero</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-black">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historialTurnos.map((turno) => (
                                        <tr 
                                            key={turno.id} 
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-4 py-4 text-white font-semibold">
                                                {new Date(turno.fecha).toLocaleDateString('es-ES')}
                                            </td>
                                            <td className="px-4 py-4 text-white font-semibold">{turno.hora}</td>
                                            <td className="px-4 py-4 text-white font-semibold">{turno.servicio}</td>
                                            <td className="px-4 py-4 text-white font-semibold">{turno.peluquero}</td>
                                            <td className="px-4 py-4">
                                                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-none border border-cyan-500/30 font-black uppercase tracking-wide">
                                                    {turno.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-white/40">No hay historial de turnos</p>
                    )}
                </section>
            </div>
        </div>
    );
}
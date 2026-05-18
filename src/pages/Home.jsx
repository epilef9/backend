import { Link } from 'react-router-dom';
import React from 'react';
import maquinitaImg from '../assets/images/maquinita.png';
import tijerasImg from '../assets/images/tijeras.png';
import cepilloImg from '../assets/images/cepillo.png';
import { Star, Calendar, Sparkles, MoveRight, User, Scissors } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div className="home-container bg-[#050505] min-h-screen font-sans overflow-hidden relative">
            
            {/* Navbar - Componente reutilizable que maneja autenticación */}
            <Navbar />

            <header className="hero-banner relative w-full min-h-screen flex items-center justify-center pt-20">

                {/* luces  que le dan ese toquecito de neón, mejor no tocar mucho los valores o se rompe todo */}
                <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-l from-red-900/10 via-transparent to-transparent pointer-events-none z-0"></div>
                <div className="absolute top-0 left-0 w-[50vw] h-[100vh] bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent pointer-events-none z-0"></div>
                
                {/* las rayitas horizontales de fondo pa q parezca matrix */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0"></div>

                {/* --- division de pantalla en dos--- */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-12 h-screen items-center">
                    
                    {/* aca meti a la fuerza todos los textos del titulo a la izquierda */}
                    <div className="flex flex-col justify-center space-y-8 pr-10">
                        
                        <div className="flex items-center gap-4">
                            <span className="h-[2px] w-12 bg-cyan-500"></span>
                            <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm">Estilo & Perfección</span>
                        </div>

                        <style>
                            {`
                                @keyframes barber-pole {
                                    0% { background-position: 0 0; }
                                    100% { background-position: -1000px 0; }
                                }
                            `}
                        </style>
                        <h1 className="text-[4rem] md:text-[5rem] xl:text-[7rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
                            Corte. <br/>
                            <span 
                                className="text-transparent bg-clip-text drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(-45deg, #ef4444, #ef4444 20px, #ffffff 20px, #ffffff 40px, #22d3ee 40px, #22d3ee 60px)',
                                    backgroundSize: '200% auto',
                                    animation: 'barber-pole 30s linear infinite'
                                }}
                            >
                                Degradado.
                            </span> <br/>
                            Actitud.
                        </h1>

                        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-md leading-relaxed border-l-4 border-zinc-800 pl-4">
                            No es solo un corte de pelo, es la declaración de tu mejor versión. Descubre el máximo nivel de detalle con nuestras herramientas de élite.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 pt-4 relative z-50">
                            <a href="/reservar" className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-none font-bold text-sm uppercase tracking-widest hover:bg-cyan-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-full sm:w-auto">
                                <Calendar size={18} />
                                Agendar
                            </a>
                            <a href="/perfil" className="flex items-center justify-center gap-3 border border-zinc-700 bg-transparent text-white px-8 py-4 rounded-none font-bold text-sm uppercase tracking-widest hover:border-red-500 hover:text-red-500 hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-full sm:w-auto">
                                <User size={18} /> Perfil <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                        
                        {/* cuadro para que si no tienen cuenta q se registren y si tienen cuenta q se logueen*/}
                        <div className="flex flex-col mt-8 p-4 border-l-2 border-zinc-800/80 bg-gradient-to-r from-zinc-900/40 to-transparent w-fit">
                            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2">
                                Acceso Exclusivo
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                                <a href="/register" className="text-cyan-400 font-bold hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">
                                    Crear Cuenta
                                </a>
                                <span className="text-zinc-700 text-xs">/</span>
                                <a href="/login" className="text-white font-medium hover:text-red-400 transition-colors">
                                    Iniciar Sesión
                                </a>
                            </div>
                        </div>

                    </div>


                    {/* esta es la columna derecha con las imagenes gigantes q se cruzan y cambian de lugar cuando pasas mouse */}
                    <div className="relative h-full flex items-center justify-center w-full min-h-[500px] lg:min-h-0">
                        
                        {/* bola  azul brillosa para que la maquina de atras contraste */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[100px]"></div>

                        {/* maquinita gigante metida mas o menos cerca de la mitad */}
                        <img 
                            src={maquinitaImg} 
                            alt="Máquina" 
                            className="absolute z-30 w-[300px] md:w-[450px] lg:w-[500px] 
                                       top-[20%] left-[10%] -rotate-[10deg] 
                                       drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                                       hover:scale-105 hover:-translate-y-2 hover:-rotate-[5deg] transition-all duration-500 ease-out"
                        />

                        {/* tijera tirada asomando x atras  */}
                        <img 
                            src={tijerasImg} 
                            alt="Tijeras" 
                            className="absolute z-20 w-[400px] md:w-[400px] lg:w-[400px] 
                                       top-[0%] right-[5%] rotate-[185deg] 
                                       drop-shadow-[20px_20px_30px_rgba(0,0,0,0.9)] opacity-90
                                       hover:rotate-[170deg] hover:scale-110 hover:-translate-x-2 transition-all duration-500 ease-out"
                        />

                        {/* el cepillo ahi nomas cruzando medio escondido por adelante q estorba poco pero queda facha */}
                        <img 
                            src={cepilloImg} 
                            alt="Cepillo" 
                            className="absolute z-40 w-[180px] md:w-[250px] lg:w-[360px] 
                                       bottom-[0%] right-[5%] -rotate-[30deg] 
                                       drop-shadow-[-20px_30px_40px_rgba(0,0,0,0.9)]
                                       hover:rotate-20 hover:-translate-y-4 hover:scale-110 transition-all duration-500 ease-out"
                        />
                        
                        {/* tarjeta diciendo info de tijera*/}
                        <div className="absolute top-[15%] right-[56%] z-50 flex items-center group hidden md:flex">
                            {/* el cuadro de la tarjeta*/}
                            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 p-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.1)] flex items-center gap-3 relative z-10 group-hover:border-cyan-400/60 transition-colors duration-300">
                                <div className="w-8 h-8 rounded bg-cyan-950/50 border border-cyan-800/50 flex justify-center items-center text-cyan-400">
                                    <Scissors size={16} />
                                </div>
                                <div>
                                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Corte Exacto</p>
                                    <p className="text-zinc-400 text-[10px]">Técnica a Tijera</p>
                                </div>
                            </div>
                            
                            <div className="relative w-16 lg:w-24 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] flex items-center justify-end">
                                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
                            </div>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}
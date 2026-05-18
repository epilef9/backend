import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Reservar() {
    const today = useMemo(() => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const adjusted = new Date(now.getTime() - offset * 60 * 1000);
        return adjusted.toISOString().split('T')[0];
    }, []);

    const [selectedDate, setSelectedDate] = useState(today);

    const hours = useMemo(
        () => Array.from({ length: 13 }, (_, index) => `${String(8 + index).padStart(2, '0')}:00`),
        []
    );

    const reservedHours = ['09:00', '12:00', '16:00', '19:00'];

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white relative overflow-hidden px-4 py-10 pt-28 font-dm">
            <Navbar />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

                .glow-red {
                    position: fixed;
                    top: -210px;
                    right: -210px;
                    width: 620px;
                    height: 620px;
                    border-radius: 50%;
                    background: #E8362A;
                    filter: blur(125px);
                    opacity: 0.14;
                    pointer-events: none;
                    z-index: 0;
                }

                .glow-blue {
                    position: fixed;
                    bottom: -210px;
                    left: -210px;
                    width: 620px;
                    height: 620px;
                    border-radius: 50%;
                    background: #2AACE8;
                    filter: blur(125px);
                    opacity: 0.14;
                    pointer-events: none;
                    z-index: 0;
                }

                .stripe-texture {
                    position: fixed;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        -55deg,
                        transparent 0px,
                        transparent 1px,
                        rgba(255, 255, 255, 0.02) 1px,
                        rgba(255, 255, 255, 0.02) 2px
                    );
                    pointer-events: none;
                    z-index: 0;
                }

                .barber-pole {
                    background: repeating-linear-gradient(
                        -45deg,
                        #e8362a 0px,
                        #e8362a 8px,
                        #f4f4f5 8px,
                        #f4f4f5 16px,
                        #2aace8 16px,
                        #2aace8 24px,
                        #f4f4f5 24px,
                        #f4f4f5 32px
                    );
                }

                .slot-blue {
                    position: relative;
                    overflow: hidden;
                    background: rgba(42, 172, 232, 0.2);
                    border-color: rgba(42, 172, 232, 0.5);
                }

                .slot-red {
                    position: relative;
                    overflow: hidden;
                    background: rgba(232, 54, 42, 0.2);
                    border-color: rgba(232, 54, 42, 0.52);
                }

                .slot-time {
                    text-shadow: 0 0 16px rgba(255, 255, 255, 0.18);
                }
            `}</style>

            <div className="glow-red" />
            <div className="glow-blue" />
            <div className="stripe-texture" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-3 py-2 backdrop-blur-xl">
                            <div className="h-10 w-2 rounded-full barber-pole shadow-[0_0_12px_rgba(42,172,232,0.35)]" />
                            <div className="h-12 w-12 rounded-full border border-white/25 bg-black/35 flex items-center justify-center shadow-[0_0_18px_rgba(232,54,42,0.25)]">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="6" cy="6" r="2.5" />
                                    <circle cx="18" cy="6" r="2.5" />
                                    <path d="M8 8L16 16" />
                                    <path d="M16 8L8 16" />
                                    <path d="M3.5 20L10.5 13" />
                                    <path d="M20.5 20L13.5 13" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Barberia Premium</p>
                                <p className="font-bebas text-xl leading-none tracking-[0.12em]">Classic Cuts</p>
                            </div>
                        </div>

                        <h1 className="font-bebas text-5xl tracking-[0.12em] leading-none mt-4">Reservar Turno</h1>
                        <p className="text-sm text-white/70 mt-3">Turnos disponibles de 08:00 a 20:00 con intervalo de 1 hora.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xl shadow-xl">
                        <label htmlFor="reservationDate" className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-2">
                            Fecha
                        </label>
                        <input
                            id="reservationDate"
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                            className="bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                        />
                    </div>
                </header>

                <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {hours.map((time) => {
                            const isReserved = reservedHours.includes(time);
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    disabled={isReserved}
                                    className={`rounded-2xl px-3 py-4 text-sm border transition-all ${
                                        isReserved
                                            ? 'slot-red text-white cursor-not-allowed'
                                            : 'slot-blue text-white hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(42,172,232,0.28)]'
                                    }`}
                                >
                                    <p className="slot-time font-semibold tracking-wide">{time}</p>
                                    <p className="text-[11px] mt-1 opacity-90">{isReserved ? 'No disponible' : 'Disponible'}</p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/70">
                        <span className="uppercase tracking-[0.2em] text-white/45">Referencias</span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#2AACE8]/40 bg-[#2AACE8]/20 px-3 py-1">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#2AACE8]" />
                            Disponible
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/25 bg-zinc-500/30 px-3 py-1">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#E8362A]" />
                            No disponible
                        </span>
                    </div>
                </section>

                <div className="mt-6">
                    <Link
                        to="/home"
                        className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
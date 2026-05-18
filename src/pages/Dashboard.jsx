import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';

// datos falsos para tener algo visual
const ESTADOS = ['Pendiente', 'Confirmado', 'Completado', 'Cancelado'];
const SERVICIOS = ['Corte clásico', 'Fade', 'Barba', 'Corte + Barba', 'Tratamiento capilar'];
const PELUQUEROS = ['Carlos', 'Miguel', 'Sofía', 'Lucía'];

const initialTurnos = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    telefono: '099 123 456',
    fecha: '2026-05-02',
    hora: '10:00',
    servicio: 'Fade',
    peluquero: 'Carlos',
    estado: 'Pendiente'
  },
  {
    id: 2,
    cliente: 'Ana Gómez',
    telefono: '098 222 111',
    fecha: '2026-05-02',
    hora: '11:00',
    servicio: 'Corte + Barba',
    peluquero: 'Miguel',
    estado: 'Confirmado'
  }
];

const emptyForm = {
  cliente: '',
  telefono: '',
  fecha: '',
  hora: '',
  servicio: SERVICIOS[0],
  peluquero: PELUQUEROS[0],
  estado: 'Pendiente'
};

export default function Dashboard() {
  // estados principales de la vista y crud
  const [turnos, setTurnos] = useState(initialTurnos);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // filtra turnos por texto y select de estado
  const turnosFiltrados = useMemo(() => {
    const term = search.trim().toLowerCase();

    return turnos.filter((t) => {
      const matchSearch =
        term.length === 0 ||
        t.cliente.toLowerCase().includes(term) ||
        t.telefono.toLowerCase().includes(term) ||
        t.servicio.toLowerCase().includes(term) ||
        t.peluquero.toLowerCase().includes(term);

      const matchEstado = filtroEstado === 'Todos' || t.estado === filtroEstado;

      return matchSearch && matchEstado;
    });
  }, [turnos, search, filtroEstado]);

  // calcula los contadores para las tarjetas superiores
  const resumen = useMemo(() => {
    return {
      total: turnos.length,
      pendientes: turnos.filter((t) => t.estado === 'Pendiente').length,
      confirmados: turnos.filter((t) => t.estado === 'Confirmado').length,
      completados: turnos.filter((t) => t.estado === 'Completado').length
    };
  }, [turnos]);

  // limpia alertas de éxito o error
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // sincroniza inputs con el estado del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    clearMessages();
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // validación rápida antes de enviar
  const validateForm = () => {
    if (!formData.cliente.trim()) return 'El nombre del cliente es obligatorio.';
    if (!formData.telefono.trim()) return 'El teléfono es obligatorio.';
    if (!formData.fecha) return 'La fecha es obligatoria.';
    if (!formData.hora) return 'La hora es obligatoria.';
    return '';
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditId(null);
  };

  // procesa la creación o actualización de turnos
  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (editId) {
      setTurnos((prev) =>
        prev.map((t) =>
          t.id === editId
            ? {
                ...t,
                ...formData,
                cliente: formData.cliente.trim(),
                telefono: formData.telefono.trim()
              }
            : t
        )
      );
      setSuccess('Turno actualizado correctamente.');
    } else {
      const nuevoTurno = {
        id: Date.now(),
        ...formData,
        cliente: formData.cliente.trim(),
        telefono: formData.telefono.trim()
      };
      setTurnos((prev) => [nuevoTurno, ...prev]);
      setSuccess('Turno creado correctamente.');
    }

    resetForm();
  };

  // carga el turno seleccionado en el formulario para editar
  const handleEdit = (turno) => {
    clearMessages();
    setEditId(turno.id);
    setFormData({
      cliente: turno.cliente,
      telefono: turno.telefono,
      fecha: turno.fecha,
      hora: turno.hora,
      servicio: turno.servicio,
      peluquero: turno.peluquero,
      estado: turno.estado
    });
  };

  // elimina el turno de la lista local
  const handleDelete = (id) => {
    clearMessages();
    setTurnos((prev) => prev.filter((t) => t.id !== id));
    if (editId === id) resetForm();
    setSuccess('Turno eliminado.');
  };

  // actualiza el select de estado directamente desde la tabla
  const handleEstadoChange = (id, nuevoEstado) => {
    clearMessages();
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans relative overflow-hidden px-4 py-10 pt-28">
      <Navbar />

      <style>{`
        .status-pendiente { color: #fbbf24; }
        .status-confirmado { color: #2AACE8; }
        .status-completado { color: #34d399; }
        .status-cancelado { color: #f87171; }
      `}</style>

      {/* luces y rayas idénticas al home */}
      <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-l from-red-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
      <div className="absolute top-0 left-0 w-[50vw] h-[100vh] bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0 fixed"></div>

      <div className="relative z-10 max-w-7xl mx-auto mt-10">
        <header className="mb-12 text-center sm:text-left">
          <div className="flex items-center gap-4 mb-4 justify-center sm:justify-start">
              <span className="h-[2px] w-12 bg-cyan-500"></span>
              <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm">Administración</span>
          </div>
          <h1 className="text-[2.5rem] md:text-[3.5rem] xl:text-[4.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
            Dashboard <br/>
            <span>
                Turnos<span className="text-red-500">.</span>
            </span>
          </h1>
          <p className="text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase mt-6">
            Control de citas y servicios
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-white">
          <div className="bg-[#0A0A0A]/80 border border-zinc-800/50 hover:border-zinc-700 rounded-none p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Total Turnos</p>
            <p className="text-4xl font-black tracking-tighter mt-2">{resumen.total}</p>
          </div>
          <div className="bg-[#0A0A0A]/80 border border-yellow-500/20 hover:border-yellow-500/50 rounded-none p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/80">Pendientes</p>
            <p className="text-4xl font-black tracking-tighter mt-2 text-yellow-500">{resumen.pendientes}</p>
          </div>
          <div className="bg-[#0A0A0A]/80 border border-cyan-500/20 hover:border-cyan-500/50 rounded-none p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">Confirmados</p>
            <p className="text-4xl font-black tracking-tighter mt-2 text-cyan-400">{resumen.confirmados}</p>
          </div>
          <div className="bg-[#0A0A0A]/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-none p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/80">Completados</p>
            <p className="text-4xl font-black tracking-tighter mt-2 text-emerald-400">{resumen.completados}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-1 bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-6 text-white backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-fit relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/20 rounded-full blur-[50px] -z-10 pointer-events-none"></div>
            
            <h2 className="text-xl font-black tracking-widest uppercase mb-6 flex items-center gap-3">
              {editId ? 'Editar Turno' : 'Nuevo Turno'}
              <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Cliente</label>
                <input
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  placeholder="Nombre y apellido"
                  className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Teléfono</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="099 000 000"
                  className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Servicio</label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                >
                  {SERVICIOS.map((servicio) => (
                    <option key={servicio} value={servicio} className="bg-[#0A0A0A]">
                      {servicio}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Peluquero</label>
                <select
                  name="peluquero"
                  value={formData.peluquero}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                >
                  {PELUQUEROS.map((peluquero) => (
                    <option key={peluquero} value={peluquero} className="bg-[#0A0A0A]">
                      {peluquero}
                    </option>
                  ))}
                </select>
              </div>

              {editId && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado} className="bg-[#0A0A0A]">
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {error && <p className="text-xs font-bold uppercase tracking-wide text-red-500 mt-2">{error}</p>}
              {success && <p className="text-xs font-bold uppercase tracking-wide text-emerald-400 mt-2">{success}</p>}

              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  {editId ? 'Guardar' : 'Agendar'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 text-xs font-black uppercase tracking-[0.2em] bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </article>

          <article className="lg:col-span-2 bg-[#0A0A0A]/80 border border-zinc-800/50 rounded-none p-6 text-white backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col relative">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cliente o teléfono..."
                className="w-full md:flex-1 bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
              />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full md:w-56 bg-[#050505] border border-zinc-800/80 text-white rounded-none px-4 py-3 text-xs outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
              >
                <option value="Todos" className="bg-[#0A0A0A]">Todos los estados</option>
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado} className="bg-[#0A0A0A]">
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto border border-zinc-800/50 bg-[#050505]/50 flex-1">
              <table className="w-full text-left text-sm min-w-[750px]">
                <thead className="bg-[#111] border-b border-zinc-800/80">
                  <tr>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Cliente</th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Fecha/Hora</th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Servicio & Staff</th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Estado</th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {turnosFiltrados.length === 0 ? (
                    <tr>
                      <td className="px-5 py-10 text-center text-zinc-600 font-bold text-xs uppercase tracking-widest" colSpan={5}>
                        Sin resultados.
                      </td>
                    </tr>
                  ) : (
                    turnosFiltrados.map((turno) => (
                      <tr key={turno.id} className="hover:bg-zinc-900/50 transition-colors group">
                        <td className="px-5 py-4">
                          <p className="font-bold text-white uppercase text-xs tracking-wider">{turno.cliente}</p>
                          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">{turno.telefono}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-zinc-300 font-bold text-xs tracking-wider">{turno.fecha}</p>
                          <p className="text-cyan-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full inline-block"></span>
                            {turno.hora}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-zinc-300 font-bold text-xs tracking-wider">{turno.servicio}</p>
                          <p className="text-red-500 text-[10px] uppercase font-black tracking-widest mt-1">x {turno.peluquero}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={turno.estado}
                            onChange={(e) => handleEstadoChange(turno.id, e.target.value)}
                            className={`bg-black border rounded-none px-3 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:opacity-80 transition-colors ${
                              turno.estado === 'Pendiente'
                                ? 'border-yellow-500/40 text-yellow-500 hover:border-yellow-500'
                                : turno.estado === 'Confirmado'
                                ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-500'
                                : turno.estado === 'Completado'
                                ? 'border-emerald-500/40 text-emerald-400 hover:border-emerald-500'
                                : 'border-red-500/40 text-red-500 hover:border-red-500'
                            }`}
                          >
                            {ESTADOS.map((estado) => (
                              <option key={estado} value={estado} className="bg-[#0A0A0A] font-bold text-white">
                                {estado}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex gap-2 justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(turno)}
                              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-cyan-500/30 text-cyan-400 bg-cyan-950/10 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(turno.id)}
                              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-red-500/30 text-red-500 bg-red-950/10 hover:bg-red-500/20 hover:border-red-500 transition-all"
                            >
                              Borrar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

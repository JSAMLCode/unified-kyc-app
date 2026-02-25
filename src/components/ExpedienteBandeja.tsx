import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, ShieldCheck, Check, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ExpedienteBandeja: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [isScreening, setIsScreening] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data, error } = await supabase
                    .from('clientes')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Map the DB data to match the UI expectations (for now we simulate some states based on the score)
                const mappedData = data?.map(c => ({
                    id: c.id,
                    displayId: `EXP-${c.id.substring(0, 6).toUpperCase()}`,
                    name: c.nombre,
                    risk: c.score_medios_adversos > 50 ? 'ALTO' : c.score_medios_adversos > 15 ? 'MEDIO' : 'BAJO',
                    score: c.score_medios_adversos.toFixed(2),
                    status: 'PENDIENTE',
                    raw: c
                })) || [];

                setClients(mappedData);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients();
    }, []);

    const runScreening = async () => {
        if (!selected) return;
        setIsScreening(true);
        try {
            // Configure n8n webhook call for manual screening
            await fetch('http://localhost:5678/webhook-test/aml-screening', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientId: selected.displayId,
                    clientName: selected.name
                })
            });
            // In a real app we'd update state here based on webhook response logic
            console.log("Webhook triggered successfully for", selected.name);
        } catch (error) {
            console.error("Error connecting to n8n webhook:", error);
        } finally {
            setTimeout(() => setIsScreening(false), 1500); // simulate delay if webhook fails
        }
    };

    const filtered = clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in pb-12">

            <div className={`xl:col-span-${selected ? '2' : '3'} space-y-6 transition-all`}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Bandeja de Cumplimiento</h2>
                            <p className="text-xs text-slate-500 font-medium mt-1">Expedientes bajo monitoreo activo</p>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar cliente..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-xl transition-colors">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                                    <th className="px-6 py-4">Identidad del Cliente</th>
                                    <th className="px-6 py-4">Riesgo Calculado</th>
                                    <th className="px-6 py-4">Avance</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map(c => (
                                    <tr
                                        key={c.id}
                                        onClick={() => setSelected(c)}
                                        className={`hover:bg-indigo-50/50 transition-colors cursor-pointer ${selected?.id === c.id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                                                    {c.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{c.name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">EXP: {c.displayId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                                                    ${c.risk === 'ALTO' ? 'bg-red-100 text-red-700' :
                                                        c.risk === 'MEDIO' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-emerald-100 text-emerald-700'}`}
                                                >
                                                    {c.risk}
                                                </span>
                                                <span className="text-xs font-bold text-slate-500">{c.score} pt</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-24 space-y-1.5">
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${c.status === 'COMPLETADO' ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: c.status === 'COMPLETADO' ? '100%' : '45%' }}></div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{c.status === 'COMPLETADO' ? '100%' : '45%'}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold uppercase ${c.status === 'COMPLETADO' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Audit Panel (Right Sidebar) */}
            {selected && (
                <div className="xl:col-span-1 border border-slate-200 bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in flex flex-col h-[600px]">
                    <div className="p-6 border-b border-slate-100 bg-slate-800 text-white flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base leading-tight">Auditoría Ley 23</h3>
                            <p className="text-[10px] text-indigo-200 mt-1 uppercase tracking-wider">{selected.name}</p>
                        </div>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto space-y-8">
                        {/* Checklists */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verificación KYC</h4>
                            <div className="space-y-2">
                                {['ID / Cédula Vigente', 'Recibo de Utilidad', 'Declaración PEP', 'Beneficiario Final'].map((lbl, idx) => (
                                    <label key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                                        <div className={`w-4 h-4 rounded text-white flex items-center justify-center ${idx < 2 || selected.status === 'COMPLETADO' ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{lbl}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Screening Status */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Motor OFAC / ONU</h4>
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <Globe className={`w-6 h-6 ${selected.risk === 'ALTO' ? 'text-red-500' : 'text-emerald-500'}`} />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-xs font-bold ${selected.risk === 'ALTO' ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {selected.risk === 'ALTO' ? 'HIT DETECTADO' : 'LIMPIO / NO HIT'}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1">Último escaneo: Hoy</p>
                                    </div>
                                </div>

                                <button
                                    onClick={runScreening}
                                    disabled={isScreening}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold rounded-lg transition-colors flex justify-center items-center h-9"
                                >
                                    {isScreening ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'EJECUTAR ESCANEO N8N'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

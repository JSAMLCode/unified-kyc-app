import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldAlert, CheckCircle, ChevronRight, Filter } from 'lucide-react';

const MOCK_ALERTAS = [
    {
        id: 'ALT-9921',
        cliente_nombre: 'Inversiones Púrpura LLC',
        descripcion: 'Desviación Estadística Transaccional: Monto $45,000 supera umbral $12k',
        estado: 'NUEVA',
        nivel_riesgo_cliente: 'ALTO',
        eslabon_actual: 'Negocios',
        dias_transcurridos: 2,
        fecha_limite: '2023-10-15',
        sla_status: 'ok' // ok, warning, breached
    },
    {
        id: 'ALT-9922',
        cliente_nombre: 'Miguel Mosquera',
        descripcion: 'Cruce positivo en Medios Adversos (Moderado)',
        estado: 'EN_REVISION',
        nivel_riesgo_cliente: 'MEDIO',
        eslabon_actual: 'Cumplimiento',
        dias_transcurridos: 14,
        fecha_limite: '2023-10-20',
        sla_status: 'warning'
    },
    {
        id: 'ALT-9905',
        cliente_nombre: 'Corporación Horizonte S.A.',
        descripcion: 'Estructuración fraccionada detectada en sucursales múltiples',
        estado: 'ESCALADA',
        nivel_riesgo_cliente: 'ALTO',
        eslabon_actual: 'Comité de Ética',
        dias_transcurridos: 65,
        fecha_limite: '2023-09-01',
        sla_status: 'breached'
    }
];

const COLUMNAS = [
    { id: 'NUEVA', title: 'Nuevas Alertas', icon: <AlertTriangle className="text-amber-500" size={18} /> },
    { id: 'EN_REVISION', title: 'En Revisión', icon: <ShieldAlert className="text-blue-500" size={18} /> },
    { id: 'ESCALADA', title: 'Escaladas (Comité)', icon: <AlertTriangle className="text-red-500" size={18} /> }
];

const getSlaColor = (status: string) => {
    switch (status) {
        case 'ok': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'breached': return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
        default: return 'bg-slate-100 text-slate-700';
    }
};

const MonitoreoPage: React.FC = () => {
    const [alertas] = useState(MOCK_ALERTAS);

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in pb-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Centro de Monitoreo SLA</h1>
                    <p className="text-slate-500 mt-1">Gestión de Alertas Inusuales y Tiempos de Respuesta (Ley 23)</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                        <Filter size={16} /> Filtros
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 transition-colors">
                        Generar Reporte ROS
                    </button>
                </div>
            </header>

            {/* SLA KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard title="Total Activas" value="24" icon={<AlertTriangle size={20} className="text-slate-600" />} />
                <MetricCard title="Dentro de SLA (< 30 días)" value="15" icon={<CheckCircle size={20} className="text-emerald-500" />} color="emerald" />
                <MetricCard title="Riesgo de SLA (30-60 días)" value="7" icon={<Clock size={20} className="text-amber-500" />} color="amber" />
                <MetricCard title="SLA Vencido (> 60 días)" value="2" icon={<ShieldAlert size={20} className="text-red-500" />} color="red" />
            </div>

            {/* Kanban Board */}
            <div className="flex flex-col lg:flex-row gap-6 mt-8 overflow-x-auto pb-4">
                {COLUMNAS.map(col => (
                    <div key={col.id} className="flex-1 min-w-[320px] max-w-[450px] bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                {col.icon} {col.title}
                            </h3>
                            <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm">
                                {alertas.filter(a => a.estado === col.id).length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {alertas.filter(a => a.estado === col.id).map(alerta => (
                                <div key={alerta.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                                {alerta.id}
                                            </span>
                                            {alerta.nivel_riesgo_cliente === 'ALTO' && (
                                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Cliente Alto Riesgo"></span>
                                            )}
                                        </div>
                                        <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-transparent ${getSlaColor(alerta.sla_status)}`}>
                                            SLA: {alerta.dias_transcurridos} días
                                        </div>
                                    </div>

                                    <h4 className="font-bold text-slate-800 text-sm leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                                        {alerta.cliente_nombre}
                                    </h4>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                        {alerta.descripcion}
                                    </p>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span>Trámite:</span>
                                            <span className="text-indigo-600">{alerta.eslabon_actual}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            ))}
                            {alertas.filter(a => a.estado === col.id).length === 0 && (
                                <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-medium">
                                    Sin alertas en esta fase
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, color = 'slate' }: any) => {
    const colorClasses = {
        slate: 'bg-white border-slate-200 text-slate-800',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
        amber: 'bg-amber-50 border-amber-100 text-amber-800',
        red: 'bg-red-50 border-red-100 text-red-800'
    };

    return (
        <div className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 ${(colorClasses as any)[color]}`}>
            <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm border border-black/5 shadow-sm">
                {icon}
            </div>
            <div>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60 mt-0.5">{title}</div>
            </div>
        </div>
    );
};

export default MonitoreoPage;

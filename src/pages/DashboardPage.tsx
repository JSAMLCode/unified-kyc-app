import React, { useState } from 'react';
import {
    Users, Shield, AlertTriangle, Radiation, PieChart,
    Globe, MapPin, Plane, Bell, UserX, RefreshCw
} from 'lucide-react';
import {
    PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

// --- MOCK DATA ---
const MOCK_STATS = {
    total: 12450,
    low: 10890,
    medium: 1240,
    high: 320
};

const RISK_DATA = [
    { name: 'Riesgo Bajo', value: MOCK_STATS.low, color: '#10b981' },
    { name: 'Riesgo Medio', value: MOCK_STATS.medium, color: '#f59e0b' },
    { name: 'Riesgo Alto', value: MOCK_STATS.high, color: '#ef4444' }
];

const DashboardPage: React.FC = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProcess = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-secondary">Panel de Control de Riesgo</h1>
                    <p className="text-slate-500 mt-1">Monitoreo de cartera y alertas tempranas AML/FT</p>
                </div>
                <button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-orange-600 transition shadow-lg shadow-indigo-200 disabled:opacity-75"
                >
                    <RefreshCw size={20} className={isProcessing ? "animate-spin" : ""} />
                    {isProcessing ? "Procesando Engine..." : "Procesar Cartera"}
                </button>
            </header>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard label="Clientes Evaluados" value={MOCK_STATS.total} icon={<Users size={32} />} color="border-indigo-500" textColor="text-brand-primary" />
                <KpiCard label="Riesgo Bajo" value={MOCK_STATS.low} icon={<Shield size={32} />} color="border-emerald-500" textColor="text-emerald-600" />
                <KpiCard label="Riesgo Medio" value={MOCK_STATS.medium} icon={<AlertTriangle size={32} />} color="border-amber-500" textColor="text-amber-600" />
                <KpiCard label="Riesgo Alto" value={MOCK_STATS.high} icon={<Radiation size={32} />} color="border-red-500" textColor="text-red-600" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Doughnut Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-brand-secondary mb-6 flex items-center gap-2">
                        <PieChart className="text-slate-400" size={20} />
                        Distribución de la Cartera
                    </h3>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={RISK_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {RISK_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    itemStyle={{ color: '#333', fontWeight: 'bold' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
                            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total</span>
                            <span className="text-2xl font-black text-brand-secondary">12.4k</span>
                        </div>
                    </div>
                </div>

                {/* Jurisdiction Map (Progress Bars) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="text-lg font-bold text-brand-secondary mb-8 flex items-center gap-2">
                        <Globe className="text-slate-400" size={20} />
                        Mapa de Calor: Jurisdicción
                    </h3>
                    <div className="flex-1 flex flex-col justify-center space-y-8">
                        <div>
                            <div className="flex justify-between font-semibold mb-2">
                                <span className="flex items-center gap-2 text-text-main">
                                    <MapPin size={18} className="text-emerald-500" />
                                    Panamá (Local)
                                </span>
                                <span className="text-slate-600">11,200 (90%)</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between font-semibold mb-2">
                                <span className="flex items-center gap-2 text-text-main">
                                    <Plane size={18} className="text-amber-500" />
                                    Extranjero
                                </span>
                                <span className="text-slate-600">1,250 (10%)</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Section */}
            <div>
                <h3 className="text-xl font-bold text-brand-secondary mt-4 mb-6">Alertas Críticas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0">
                            <Bell size={32} />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-rose-600 mb-1">42</h4>
                            <p className="font-semibold text-rose-900/80">Operaciones Inusuales (Riesgo Alto &gt; $2k)</p>
                        </div>
                    </div>

                    <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-2xl flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0">
                            <UserX size={32} />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-rose-600 mb-1">15</h4>
                            <p className="font-semibold text-rose-900/80">Clientes PEP Detectados en Cartera</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ label, value, icon, color, textColor }: { label: string, value: number | string, icon: React.ReactNode, color: string, textColor: string }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${color} relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
        <div className="flex flex-col gap-2 relative z-10">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</span>
            <span className={`text-4xl font-black ${textColor}`}>{value.toLocaleString()}</span>
        </div>
        <div className="absolute top-6 right-6 opacity-10 text-brand-secondary group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
    </div>
);

export default DashboardPage;

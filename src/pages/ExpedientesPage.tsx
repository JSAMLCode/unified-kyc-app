import React, { useState } from 'react';
import { ExpedienteForm } from '../components/ExpedienteForm';
import { ExpedienteBandeja } from '../components/ExpedienteBandeja';
import { AdverseMediaFeed } from '../components/AdverseMediaFeed';
import { LayoutList, UserPlus, Newspaper } from 'lucide-react';

const ExpedientesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'bandeja' | 'nuevo' | 'medios'>('bandeja');

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Centro de Expedientes</h1>
                    <p className="text-slate-500 mt-1">Gestión de Onboarding y Monitoreo Continuo</p>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
                <TabButton
                    active={activeTab === 'bandeja'}
                    onClick={() => setActiveTab('bandeja')}
                    icon={<LayoutList size={18} />}
                    label="Bandeja de Entrada"
                />
                <TabButton
                    active={activeTab === 'nuevo'}
                    onClick={() => setActiveTab('nuevo')}
                    icon={<UserPlus size={18} />}
                    label="Nuevo Expediente"
                />
                <TabButton
                    active={activeTab === 'medios'}
                    onClick={() => setActiveTab('medios')}
                    icon={<Newspaper size={18} />}
                    label="Medios Adversos"
                />
            </div>

            {/* Tab Content */}
            <div className="pt-4">
                {activeTab === 'bandeja' && <ExpedienteBandeja />}
                {activeTab === 'nuevo' && <ExpedienteForm />}
                {activeTab === 'medios' && <AdverseMediaFeed />}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-t-xl transition-all ${active
            ? 'bg-white text-indigo-600 border-t border-l border-r border-slate-200 translate-y-px'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-t border-l border-r border-transparent'
            }`}
    >
        {icon}
        {label}
    </button>
);

export default ExpedientesPage;

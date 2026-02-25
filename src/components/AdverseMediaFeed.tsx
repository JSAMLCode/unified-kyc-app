import React, { useState } from 'react';
import { ExternalLink, AlertOctagon, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

const MOCK_NEWS = [
    {
        id: '1',
        cliente_nombre: 'Inversiones Púrpura LLC',
        titular_noticia: 'Investigación abierta por supuestos vínculos offshore y evasión fiscal en Panamá',
        url_fuente: 'https://news-example.com/offshore-investigation',
        resumen_ia: 'El artículo menciona a Inversiones Púrpura LLC en relación a una reciente filtración de documentos financieros, sugiriendo posibles usos de empresas fachada para ofuscar el origen de capitales.',
        nivel_riesgo_noticia: 'Crítico',
        created_at: 'Hace 2 horas'
    },
    {
        id: '2',
        cliente_nombre: 'Miguel Mosquera',
        titular_noticia: 'Ex-funcionario Miguel M. mencionado en auditoría de contratos públicos',
        url_fuente: 'https://news-example.com/auditoria-contratos',
        resumen_ia: 'Una auditoría estatal reveló presuntas irregularidades en adjudicaciones donde figura el nombre de Miguel Mosquera como consultor. No hay cargos formales, pero se sugiere precaución.',
        nivel_riesgo_noticia: 'Moderado',
        created_at: 'Ayer'
    },
    {
        id: '3',
        cliente_nombre: 'Corporación Horizonte S.A.',
        titular_noticia: 'Horizonte S.A. anuncia fusión estratégica en el sector salud',
        url_fuente: 'https://news-example.com/fusion-salud',
        resumen_ia: 'Anuncio corporativo estándar sobre la fusión de Horizonte S.A. No se detectan indicadores de riesgo o criminalidad financiera en la publicación.',
        nivel_riesgo_noticia: 'Descartado',
        created_at: 'Hace 3 días'
    }
];

export const AdverseMediaFeed: React.FC = () => {
    const [filter, setFilter] = useState<'Todos' | 'Crítico' | 'Moderado' | 'Descartado'>('Todos');

    const filteredNews = MOCK_NEWS.filter(n => filter === 'Todos' || n.nivel_riesgo_noticia === filter);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h2 className="text-xl font-bold text-brand-secondary tracking-tight flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-brand-primary" />
                        Radar de Medios Adversos
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Escaneo continuo en fuentes abiertas y bases de datos periodísticas globales</p>
                </div>

                <div className="flex bg-slate-100 rounded-2xl p-1 w-full sm:w-auto overflow-x-auto">
                    {['Todos', 'Crítico', 'Moderado', 'Descartado'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex-1 sm:flex-none uppercase tracking-wider
                                ${filter === f
                                    ? 'bg-white text-brand-primary shadow-sm'
                                    : 'text-slate-500 hover:text-text-main hover:bg-slate-200/50'
                                }
                            `}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredNews.map((news) => (
                    <div key={news.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-indigo-300 transition-colors">

                        {/* Risk Indicator Ribbon */}
                        <div className={`absolute top-0 left-0 bottom-0 w-1.5 
                            ${news.nivel_riesgo_noticia === 'Crítico' ? 'bg-red-500' :
                                news.nivel_riesgo_noticia === 'Moderado' ? 'bg-amber-500' : 'bg-slate-300'}
                        `}></div>

                        <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100">
                            {news.nivel_riesgo_noticia === 'Crítico' ? <AlertOctagon className="w-8 h-8 text-red-500" /> :
                                news.nivel_riesgo_noticia === 'Moderado' ? <AlertTriangle className="w-8 h-8 text-amber-500" /> :
                                    <CheckCircle2 className="w-8 h-8 text-slate-400" />}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md
                                        ${news.nivel_riesgo_noticia === 'Crítico' ? 'bg-risk-high/10 text-risk-high border border-risk-high/20' :
                                            news.nivel_riesgo_noticia === 'Moderado' ? 'bg-risk-medium/10 text-risk-medium border border-risk-medium/20' : 'bg-slate-100 text-slate-500'}
                                    `}>
                                        {news.nivel_riesgo_noticia}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium">{news.created_at}</span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-secondary leading-snug">{news.titular_noticia}</h3>
                                <p className="text-sm font-bold text-brand-primary mt-1">Match: {news.cliente_nombre}</p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-clip-text">RESUMEN IA</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed italic">{news.resumen_ia}</p>
                            </div>
                        </div>

                        <div className="flex md:flex-col justify-between md:justify-start gap-3 w-full md:w-32 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                            <a href={news.url_fuente} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-brand-primary transition-colors w-full">
                                <ExternalLink size={14} /> Leer
                            </a>
                            <div className="flex gap-2 w-full">
                                {news.nivel_riesgo_noticia !== 'Descartado' && (
                                    <>
                                        <button title="Descartar (Falso Positivo)" className="flex-1 p-3 bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-colors flex justify-center">
                                            <CheckCircle2 size={16} />
                                        </button>
                                        <button title="Escalar a Investigación" className="flex-1 p-3 bg-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors flex justify-center">
                                            <AlertOctagon size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

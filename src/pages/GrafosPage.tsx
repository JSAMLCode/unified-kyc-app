import React, { useState } from 'react';
import { Brain, ChevronRight, Network, Share2 } from 'lucide-react';

const GrafosPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'Hola, soy Nexus AI. Puedo analizar patrones transaccionales complejos y visualizar redes de vínculos. ¿Qué deseas investigar hoy?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!query.trim()) return;
        const newMsg = { role: 'user' as const, content: query };
        setMessages([...messages, newMsg]);
        setQuery('');
        setIsTyping(true);

        setTimeout(() => {
            const response = { role: 'ai' as const, content: 'He analizado la red de vínculos de "Inversiones del Norte S.A." y detecté una conexión indirecta con una entidad sancionada en la lista OFAC a través de dos empresas fantasma intermediarias. Se recomienda elevar el nivel de riesgo a ALTO.' };
            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-bold text-brand-secondary flex items-center gap-3">
                        <Brain className="text-brand-primary" size={32} />
                        Nexus AI & Graph
                    </h2>
                    <p className="text-slate-500 mt-1">Inteligencia Generativa aplicada a la detección de delitos financieros mediante grafos direccionales.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
                {/* Chat Interface */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    <div className="p-4 bg-orange-50/50 border-b border-indigo-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-brand-secondary">Asistente Virtual Nexus</span>
                        <div className="flex gap-2 items-center">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">En Línea</span>
                        </div>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 text-sm ${m.role === 'user'
                                    ? 'bg-brand-primary text-white rounded-2xl rounded-br-sm shadow-md'
                                    : 'bg-white text-text-main border border-slate-200 shadow-sm rounded-2xl rounded-bl-sm'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="flex gap-2">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Consultar a Nexus sobre relaciones..."
                                className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                            <button onClick={handleSend} className="bg-brand-primary text-white p-3 rounded-2xl shadow-lg shadow-soft hover:bg-orange-600 transition-all flex items-center justify-center">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Graph Visualization */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <div className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2 shadow-xl">
                            <Network size={14} className="text-indigo-400" /> Vista de Red
                        </div>
                        <div className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2 shadow-xl">
                            <Share2 size={14} className="text-emerald-400" /> 4 Nodos Críticos
                        </div>
                    </div>

                    {/* Simulated Graph Area */}
                    <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
                        {/* Interactive Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        {/* Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                            <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite_reverse]" />
                            <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
                            <line x1="30%" y1="30%" x2="20%" y2="50%" stroke="#475569" strokeWidth="1" />
                            <line x1="70%" y1="30%" x2="85%" y2="40%" stroke="#475569" strokeWidth="1" />
                        </svg>

                        {/* Nodes */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-primary rounded-full border-4 border-indigo-400/50 shadow-[0_0_40px_rgba(79,70,229,0.7)] flex items-center justify-center z-10 text-white font-bold text-xs text-center leading-tight cursor-pointer hover:scale-110 transition-transform">
                            Target<br />Entity
                            <div className="absolute -bottom-6 whitespace-nowrap text-[10px] text-indigo-300 font-medium">Inversiones del Norte S.A.</div>
                        </div>

                        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-700 rounded-full border-2 border-slate-500 flex items-center justify-center z-10 text-white text-[10px] font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                            Shell A
                            <div className="absolute -bottom-5 whitespace-nowrap text-[9px] text-slate-400">Offshore Corp 1</div>
                        </div>

                        <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-700 rounded-full border-2 border-slate-500 flex items-center justify-center z-10 text-white text-[10px] font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                            Shell B
                            <div className="absolute -bottom-5 whitespace-nowrap text-[9px] text-slate-400">Logistics Corp 2</div>
                        </div>

                        <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center z-10 text-slate-300 text-[8px] font-bold shadow-md">
                            Dir 1
                        </div>

                        <div className="absolute top-[40%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center z-10 text-slate-300 text-[8px] font-bold shadow-md">
                            Acct 2
                        </div>

                        {/* Red Threat Node */}
                        <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-600 rounded-full border-4 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-pulse flex items-center justify-center z-10 text-white font-bold text-[10px] text-center cursor-pointer hover:scale-110 transition-transform">
                            OFAC<br />Match
                            <div className="absolute -bottom-6 whitespace-nowrap text-[10px] text-red-400 font-medium bg-red-950/80 px-2 py-0.5 rounded backdrop-blur">Sancionado SDNTK</div>
                        </div>

                    </div>

                    <div className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-md">
                        <div className="flex flex-col sm:flex-row justify-between items-center text-slate-400 text-xs gap-4">
                            <span className="font-medium bg-slate-800 px-3 py-1 rounded-lg">Profundidad de análisis: <strong className="text-white">3 niveles</strong></span>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_#6366f1]"></div> Cliente</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-500 rounded-full shadow-[0_0_10px_#64748b]"></div> Intermediario</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] animate-pulse"></div> Riesgo Hit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </div>
    );
};

export default GrafosPage;

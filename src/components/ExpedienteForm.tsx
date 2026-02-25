import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, User, Briefcase, FileText, Lock, ChevronRight } from 'lucide-react';

const SectionHeader = ({ icon: Icon, step, title, subtitle }: { icon: any, step: string, title: string, subtitle: string }) => (
    <div className="flex items-center gap-4 pb-4 mb-6 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0 bg-indigo-600 shadow-lg shadow-indigo-600/20">{step}</div>
        <div className="flex items-center gap-2 flex-1">
            <Icon className="w-5 h-5 text-indigo-600" />
            <div>
                <p className="font-bold text-sm text-slate-800 leading-none">{title}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{subtitle}</p>
            </div>
        </div>
    </div>
);

const InputField = ({ label, id, type = 'text', placeholder, required, prefix }: any) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            {prefix && <span className="px-4 text-sm font-bold border-r border-slate-200 text-slate-500">{prefix}</span>}
            <input
                id={id} name={id} type={type} placeholder={placeholder} required={required}
                className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
            />
        </div>
    </div>
);

export const ExpedienteForm: React.FC = () => {
    const [pep, setPep] = useState('no');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        setFiles(f => [...f, ...Array.from(e.dataTransfer.files)]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center border-2 border-emerald-100 shadow-xl shadow-emerald-500/10 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">¡Expediente Recibido!</h2>
                    <p className="text-slate-500 max-w-md mx-auto">Su expediente ha sido ingresado al núcleo de cumplimiento. El Oficial asignado revisará la documentación en breve.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                    ACTUALIZAR OTRO EXPEDIENTE
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Portal de Remediación / Onboarding</h2>
                    <p className="text-slate-500 text-sm">Actualización de Expedientes KYC para ASRIEL S.A.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl text-white shadow-md">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Conexión Encriptada TLS 1.3</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400"></div>
                <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                    {/* Step 1 */}
                    <div className="space-y-6">
                        <SectionHeader icon={User} step="1" title="Identificación del Cliente" subtitle="PERFIL IDENTITARIO ASOCIADO" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputField id="name" label="Nombre Completo / Razón Social" placeholder="Ej. Corporación Horizonte S.A." required />
                            </div>
                            <InputField id="idNumber" label="Documento de Identificación" placeholder="Cédula, RUC o Pasaporte" required />
                            <InputField id="phone" label="Línea de Contacto" placeholder="+507 XXXX-XXXX" />
                            <div className="md:col-span-2">
                                <InputField id="email" label="Dirección de Correo Electrónico" type="email" placeholder="cliente@dominio.com" />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-6">
                        <SectionHeader icon={Briefcase} step="2" title="Marco Económico" subtitle="ACTIVIDAD Y ORIGEN DE FONDOS" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField id="profession" label="Sector / Actividad Principal" placeholder="Ej. Logística, Servicios, Agro" />
                            <InputField id="salary" label="Volumen Mensual Estimado" type="number" prefix="USD" placeholder="0.00" />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="space-y-6">
                        <SectionHeader icon={FileText} step="3" title="Declaración Juratoria PEP" subtitle="PERSONA EXPUESTA POLÍTICAMENTE" />
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
                            <p className="text-xs text-slate-600 leading-relaxed">
                                En cumplimiento con la <span className="font-bold text-slate-800">Ley 23 de 2015</span>, declare si usted o algún beneficiario final ha ocupado cargos públicos de alto nivel o mantiene vínculos con personas en dichas posiciones.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {['no', 'si'].map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setPep(val)}
                                        className={`flex-1 py-4 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-3 ${pep === val
                                            ? 'bg-slate-800 border-slate-800 text-white shadow-md'
                                            : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${pep === val ? 'border-indigo-400' : 'border-slate-300'}`}>
                                            {pep === val && <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>}
                                        </div>
                                        {val === 'si' ? 'Vínculo PEP Detectado' : 'Sin Referencias PEP'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="space-y-6">
                        <SectionHeader icon={Upload} step="4" title="Evidencia Documental" subtitle="RESPALDO DIGITAL ENCRIPTADO" />
                        <div
                            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                            className={`group border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer relative ${dragActive
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-slate-200 hover:border-indigo-400 bg-slate-50'
                                }`}
                        >
                            <input ref={inputRef} type="file" multiple className="hidden" onChange={e => {
                                if (e.target.files) {
                                    setFiles(f => [...f, ...Array.from(e.target.files!)]);
                                }
                            }} />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                    <Upload className={`w-8 h-8 ${dragActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800">Cargar Expediente Digital</h4>
                                <p className="text-xs text-slate-500 mt-1">Arrastre archivos o haga clic para explorar</p>
                            </div>

                            {files.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2 justify-center relative z-10">
                                    {files.map((f, i) => (
                                        <div key={i} className="px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg flex items-center gap-2 shadow-sm">
                                            <FileText className="w-3 h-3 text-indigo-400" />
                                            {f.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-8">
                        <button type="submit" disabled={submitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all">
                            {submitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>PROCESAR EXPEDIENTE EN NÚCLEO</span>
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

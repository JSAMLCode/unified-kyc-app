import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Layout, Users, Network, Activity, ShieldCheck, Bell } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import ExpedientesPage from './pages/ExpedientesPage';
import GrafosPage from './pages/GrafosPage';
import MonitoreoPage from './pages/MonitoreoPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
        {/* Sidebar Navigation - Nave Nodriza */}
        <nav className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col gap-8 shadow-2xl z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              AS
            </div>
            <span className="text-xl font-bold text-white tracking-tight">AML Suite</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <NavItem to="/dashboard" icon={<Layout size={20} />} label="Visión Gerencial" />
            <NavItem to="/expedientes" icon={<Users size={20} />} label="Expedientes" />
            <NavItem to="/grafos" icon={<Network size={20} />} label="Análisis de Red" />
            <NavItem to="/monitoreo" icon={<Activity size={20} />} label="Monitoreo SLA" />
          </div>

          <div className="mt-auto pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Ley 23 Panamá Compliant</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Tu Plan</p>
              <p className="text-white font-semibold">Enterprise KYC</p>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 w-full">
            <h2 className="text-lg font-semibold text-slate-700 capitalize">
              Plataforma KYC/AML
            </h2>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition"><Bell size={20} /></button>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">UAF</div>
                <span className="text-sm font-medium text-slate-600 hidden sm:inline">Oficial de Cumplimiento</span>
              </div>
            </div>
          </header>

          <div className="w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/expedientes" element={<ExpedientesPage />} />
              <Route path="/grafos" element={<GrafosPage />} />
              <Route path="/monitoreo" element={<MonitoreoPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`
    }
  >
    {({ isActive }) => (
      <>
        <span className={`${isActive ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`}>{icon}</span>
        <span className="font-medium">{label}</span>
      </>
    )}
  </NavLink>
);

export default App;

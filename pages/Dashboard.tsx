
import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { 
  Users, 
  BarChart3, 
  Disc, 
  TrendingUp,
  ExternalLink,
  ChevronRight,
  DownloadCloud,
  Plus,
  Zap,
  Rocket,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_RELEASES } from '../constants';
import { Page } from '../types';

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const data = [
  { name: 'Jan', streams: 4000 },
  { name: 'Fev', streams: 3000 },
  { name: 'Mar', streams: 2000 },
  { name: 'Abr', streams: 2780 },
  { name: 'Mai', streams: 5890 },
  { name: 'Jun', streams: 8390 },
  { name: 'Jul', streams: 12490 },
];

const barData = [
  { name: 'Spotify', value: 65 },
  { name: 'Apple', value: 45 },
  { name: 'Boomplay', value: 90 },
  { name: 'Audiomack', value: 120 },
  { name: 'YouTube', value: 75 },
];

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Principal CTA - Welcome & Launch */}
      <div className="bg-white p-8 sm:p-12 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="relative z-10 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
            <Rocket size={14} className="text-blue-400" /> Distribuição Mundial
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9] max-w-md">
            Envie a sua música <br/> para o mundo.
          </h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-tight max-w-xs mx-auto md:mx-0">
            Mais de 150 lojas digitais. Receba 100% dos seus royalties.
          </p>
          <button 
            onClick={() => setActivePage('upload')}
            className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-gray-200 hover:scale-105 hover:bg-gray-800 transition-all active:scale-95"
          >
            <Plus size={20} /> Começar Lançamento
          </button>
        </div>
        
        <div className="relative z-10 hidden lg:flex items-center justify-center">
           <div className="relative">
              <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400" className="w-64 h-64 rounded-[3rem] object-cover shadow-2xl border-8 border-white -rotate-6 group-hover:rotate-0 transition-transform duration-700" />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 animate-bounce duration-[3s]">
                 <TrendingUp size={24} className="text-green-500" />
              </div>
           </div>
        </div>

        {/* Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Novas Músicas', icon: <Disc size={20}/>, page: 'upload', color: 'text-blue-500' },
          { label: 'Ver Royalties', icon: <DollarSign size={20}/>, page: 'royalties', color: 'text-green-500' },
          { label: 'Meu Perfil', icon: <Users size={20}/>, page: 'artists', color: 'text-purple-500' },
          { label: 'Ajuda', icon: <ShieldCheck size={20}/>, page: 'support', color: 'text-orange-500' },
        ].map(item => (
          <button 
            key={item.label}
            onClick={() => setActivePage(item.page as Page)}
            className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all flex flex-col items-center gap-3 group"
          >
            <div className={`p-4 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-black">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Streams Totais" 
          value="15.2M" 
          trend={24} 
          icon={<BarChart3 size={20} />} 
          onViewMore={() => setActivePage('analytics')}
        />
        <StatCard 
          label="Ganhos Acumulados" 
          value="$4,500" 
          trend={12} 
          icon={<TrendingUp size={20} />} 
          onViewMore={() => setActivePage('royalties')}
        />
        <StatCard 
          label="Obras Ativas" 
          value="18" 
          icon={<Disc size={20} />} 
          onViewMore={() => setActivePage('catalog')}
        />
        <StatCard 
          label="Crescimento Fãs" 
          value="3.2K" 
          trend={5}
          icon={<Users size={20} />} 
          onViewMore={() => setActivePage('analytics')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Desempenho da Rede</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Crescimento orgânico mensal</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.05}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 'bold'}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 'bold'}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="streams" 
                  stroke="#000000" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorStreams)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-8">Top Plataformas</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fontSize: 10, fill: '#4b5563', fontWeight: 'bold'}}
                  width={80}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '16px', border: 'none'}}
                />
                <Bar 
                  dataKey="value" 
                  fill="#000000" 
                  radius={[0, 8, 8, 0]} 
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

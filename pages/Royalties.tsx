
import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  Calendar, 
  Download,
  CreditCard,
  PieChart as PieChartIcon,
  X,
  Send,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Smartphone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const revenueData = [
  { name: 'Feb', amount: 8400 },
  { name: 'Mar', amount: 12500 },
  { name: 'Apr', amount: 9800 },
  { name: 'May', amount: 15600 },
  { name: 'Jun', amount: 21000 },
  { name: 'Jul', amount: 18500 },
];

const pieData = [
  { name: 'Spotify', value: 4500, color: '#111827' },
  { name: 'Apple Music', value: 3200, color: '#374151' },
  { name: 'Boomplay', value: 5800, color: '#6b7280' },
  { name: 'Others', value: 1500, color: '#9ca3af' },
];

const Royalties: React.FC = () => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPayoutModal(false);
      setSuccessMessage("Pedido de levantamento enviado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 2000);
  };

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAddMethodModal(false);
      setSuccessMessage("Novo método de pagamento adicionado!");
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1500);
  };

  const handleExport = () => {
    alert("A preparar relatório financeiro para exportação (PDF/CSV)...");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      {/* Toast Feedback */}
      {successMessage && (
        <div className="fixed bottom-24 right-8 z-[110] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-xs font-bold uppercase tracking-widest">{successMessage}</span>
        </div>
      )}

      {/* Modal: Solicitar Payout */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Solicitar Levantamento</h3>
              <button onClick={() => setShowPayoutModal(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleRequestPayout} className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Saldo Disponível</p>
                <p className="text-2xl font-black text-gray-900">$24,582.45</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Valor a Levantar ($)</label>
                <input 
                  type="number" 
                  required
                  placeholder="0.00" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-gray-100 transition-all" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Método de Destino</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none appearance-none cursor-pointer">
                  <option>Bank Transfer (USD) •••• 9012</option>
                  <option>Multicaixa Express (KZ)</option>
                </select>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Confirmar Solicitação</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Adicionar Método */}
      {showAddMethodModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Novo Método</h3>
              <button onClick={() => setShowAddMethodModal(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddMethod} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="p-4 border-2 border-black rounded-2xl flex flex-col items-center gap-2">
                  <CreditCard size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Banco / IBAN</span>
                </button>
                <button type="button" className="p-4 border border-gray-100 bg-gray-50 rounded-2xl flex flex-col items-center gap-2 text-gray-400">
                  <Smartphone size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Mobile Money</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IBAN Completo (Angola)</label>
                <input 
                  type="text" 
                  required
                  placeholder="AO06 0000 ..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Titular da Conta</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome do beneficiário" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none" 
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Plus size={18} /> Guardar Método</>}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Earnings Card */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Saldo Disponível</p>
                  <h2 className="text-5xl font-black tracking-tighter">$24,582.45</h2>
                </div>
                <button 
                  onClick={() => setShowPayoutModal(true)}
                  className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all active:scale-95"
                >
                  Solicitar Saque
                </button>
              </div>
              <div className="flex gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black mb-1">Ganhos Totais</p>
                  <p className="text-xl font-black">$142,900.00</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black mb-1">Próximo Pagamento</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <p className="text-xl font-black">15 Ago, 2024</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Abstract decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24"></div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Evolução Mensal</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Dados de vendas globais</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleExport} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-black transition-all border border-transparent hover:border-gray-200"><Download size={18} /></button>
                <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-black transition-all border border-transparent hover:border-gray-200"><Calendar size={18} /></button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 'bold'}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 'bold'}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  />
                  <Bar dataKey="amount" fill="#111827" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Distribution by Platform */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8">Receita por Loja</h3>
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              {/* Fix: changed closing tag from RefreshContainer to ResponsiveContainer */}
              </ResponsiveContainer>
            </div>
            <div className="space-y-5">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: item.color}}></div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-black transition-colors">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Métodos de Levantamento</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Gerencie suas contas bancárias</p>
          </div>
          <button 
            onClick={() => setShowAddMethodModal(true)}
            className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <Plus size={14} /> Adicionar Método
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100 flex items-center justify-between group hover:border-black/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-900 border border-gray-50 group-hover:scale-105 transition-transform">
                <CreditCard size={28} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Transferência Bancária (USD)</p>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest">BCI ANGOLA •••• 9012</p>
              </div>
            </div>
            <span className="text-[8px] font-black text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm uppercase tracking-widest">Principal</span>
          </div>
          <div className="p-6 border border-gray-50 rounded-[1.5rem] flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-200 border border-gray-100 grayscale">
                <Smartphone size={28} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-300">Multicaixa Express</p>
                <p className="text-[10px] text-gray-300 font-bold tracking-widest">NÃO CONFIGURADO</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddMethodModal(true)}
              className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline"
            >
              Ativar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Royalties;

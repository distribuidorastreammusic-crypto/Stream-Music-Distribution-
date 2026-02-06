
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  X,
  Send
} from 'lucide-react';
import { Ticket } from '../types';

interface SupportProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  onNewTicket: (t: Ticket) => void;
}

const Support: React.FC<SupportProps> = ({ tickets, setTickets, onNewTicket }) => {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const handleCreateTicket = () => {
    if (!subject) return;
    const newTicket: Ticket = {
      id: `T-${Math.floor(Math.random() * 10000)}`,
      subject,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      priority,
      user: 'Artista Stream',
      userPhone: '+244957729023'
    };
    setTickets(prev => [newTicket, ...prev]);
    onNewTicket(newTicket);
    setShowModal(false);
    setSubject('');
  };

  const handleWhatsAppSupport = () => {
    // Número atualizado: +244 957729023
    window.open('https://wa.me/244957729023', '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Create Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Novo Chamado</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black transition-all"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assunto do Ticket</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Problema com pagamento de royalties" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-black focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prioridade</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-black outline-none font-bold appearance-none cursor-pointer"
                >
                  <option value="Low">Baixa</option>
                  <option value="Medium">Média</option>
                  <option value="High">Alta (Urgente)</option>
                </select>
              </div>
              <button 
                onClick={handleCreateTicket}
                className="w-full bg-black text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-gray-200 hover:bg-gray-800 transition-all mt-4 active:scale-95 uppercase text-xs tracking-widest"
              >
                <Send size={18} /> Abrir Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Como podemos ajudar?</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setShowModal(true)}
                className="w-full flex items-center gap-4 p-5 bg-black text-white rounded-[1.5rem] shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <span className="font-black text-[11px] uppercase tracking-widest">Novo Ticket</span>
              </button>
              <button 
                onClick={handleWhatsAppSupport}
                className="w-full flex items-center gap-4 p-5 bg-gray-50 text-gray-900 rounded-[1.5rem] border border-gray-100 hover:bg-gray-100 transition-all active:scale-95 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-green-500 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <span className="font-black text-[11px] uppercase tracking-widest">Suporte WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Perguntas Frequentes</h3>
            <div className="space-y-3">
              {['Direitos de Autor', 'Ciclos de Pagamento', 'Nome Artístico', 'Lojas e Plataformas'].map(topic => (
                <button key={topic} className="w-full text-left p-4 hover:bg-gray-50 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="text-xs font-bold text-gray-500 group-hover:text-black">{topic}</span>
                  <HelpCircle size={14} className="text-gray-300 group-hover:text-black" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Meus Chamados Ativos</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Acompanhe o estado do seu suporte</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Pesquisar..." className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-xs text-black font-bold outline-none focus:ring-4 focus:ring-gray-100 transition-all" />
              </div>
            </div>
            
            <div className="divide-y divide-gray-50">
              {tickets.length > 0 ? tickets.map(ticket => (
                <div key={ticket.id} className="p-8 hover:bg-gray-50/50 transition-all group">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        ticket.status === 'Resolved' ? 'bg-green-50 text-green-500' : 
                        ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'
                      }`}>
                        {ticket.status === 'Resolved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 group-hover:text-black transition-colors uppercase text-sm tracking-tight mb-1">{ticket.subject}</h4>
                        <div className="flex items-center gap-3">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">ID: #{ticket.id}</p>
                          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{ticket.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border ${
                        ticket.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-gray-400 border-gray-100'
                      }`}>
                        {ticket.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="py-24 text-center">
                  <HelpCircle size={40} className="text-gray-100 mx-auto mb-4" />
                  <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Nenhum chamado aberto</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

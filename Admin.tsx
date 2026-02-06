
import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  DollarSign, 
  Clock, 
  Users, 
  ShieldCheck,
  Search,
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Music,
  AlertCircle,
  FileEdit,
  Info,
  MessageSquare,
  Send,
  X,
  Rocket,
  Globe,
  Database,
  Smartphone
} from 'lucide-react';
import { MOCK_ARTISTS } from '../constants';
import StatCard from '../components/StatCard';
import { Release, PayoutRequest, Ticket } from '../types';

type AdminTab = 'moderation' | 'payouts' | 'tickets' | 'crm' | 'launch';

interface AdminPageProps {
  releases: Release[];
  setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
  payouts: PayoutRequest[];
  setPayouts: React.Dispatch<React.SetStateAction<PayoutRequest[]>>;
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  onAction: (msg: string, type: 'admin' | 'artist') => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ 
  releases, setReleases, 
  payouts, setPayouts, 
  tickets, setTickets,
  onAction 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('moderation');
  const [notifications, setLocalNotifications] = useState<{id: number, message: string, type: 'success' | 'error' | 'warning'}[]>([]);
  
  // Chat state
  const [activeChat, setActiveChat] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const addLocalToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const id = Date.now();
    setLocalNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setLocalNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleApproveRelease = (id: string, title: string) => {
    setReleases(prev => prev.map(r => r.id === id ? { ...r, status: 'Distribuído' } : r));
    addLocalToast("Lançamento aprovado!");
    onAction(`Seu lançamento "${title}" foi aprovado e está sendo enviado para as lojas!`, 'artist');
  };

  const handleRejectRelease = (id: string, title: string) => {
    setReleases(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejeitado' } : r));
    addLocalToast("Lançamento rejeitado.", 'error');
    onAction(`Infelizmente seu lançamento "${title}" foi rejeitado. Consulte seu e-mail para detalhes técnicos.`, 'artist');
  };

  const handleRequestCorrection = (id: string, title: string) => {
    setReleases(prev => prev.map(r => r.id === id ? { ...r, status: 'Correção Necessária' } : r));
    addLocalToast("Correção solicitada.", 'warning');
    onAction(`Atenção: Seu lançamento "${title}" requer correção nos metadados antes de prosseguir.`, 'artist');
  };

  const handleProcessPayout = (id: string, artist: string, amount: number) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Completed' } : p));
    addLocalToast(`Pagamento de $${amount} processado.`);
    onAction(`O seu pedido de saque de $${amount.toFixed(2)} foi processado e o valor já está a caminho da sua conta!`, 'artist');
  };

  const handleSendReply = () => {
    if (!activeChat || !replyMessage.trim()) return;
    setTickets(prev => prev.map(t => t.id === activeChat.id ? { ...t, status: 'In Progress' } : t));
    addLocalToast("Resposta enviada.");
    onAction(`Nova resposta administrativa para o ticket "${activeChat.subject}": ${replyMessage}`, 'artist');
    setActiveChat(null);
    setReplyMessage('');
  };

  const handleResolveTicket = (id: string, subject: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    addLocalToast("Ticket resolvido!");
    onAction(`O seu chamado sobre "${subject}" foi marcado como resolvido.`, 'artist');
  };

  const handleWhatsAppSupport = (phone?: string) => {
    const targetPhone = phone ? phone.replace(/\D/g, '') : '244957729023';
    window.open(`https://wa.me/${targetPhone}`, '_blank');
  };

  const renderModeration = () => {
    const pending = releases.filter(r => r.status === 'Em análise' || r.status === 'Correção Necessária');
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        {pending.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Obra</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pending.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={r.cover} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                      <div>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{r.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{r.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm ${
                      r.status === 'Correção Necessária' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleRejectRelease(r.id, r.title)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Rejeitar"><XCircle size={18} /></button>
                      <button onClick={() => handleRequestCorrection(r.id, r.title)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-xl transition-all" title="Pedir Ajuste"><FileEdit size={18} /></button>
                      <button onClick={() => handleApproveRelease(r.id, r.title)} className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all" title="Aprovar"><CheckCircle size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-16 text-center text-gray-400 font-black uppercase text-[10px] tracking-widest">Nenhum lançamento pendente.</div>
        )}
      </div>
    );
  };

  const renderPayouts = () => (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm animate-in fade-in duration-500">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Artista</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Valor</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {payouts.map(p => (
            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-xs font-black text-gray-900 uppercase">{p.artist}</td>
              <td className="px-6 py-4 text-sm font-black text-gray-900">${p.amount.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm ${
                  p.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {p.status === 'Completed' ? 'Pago' : 'Pendente'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {p.status === 'Pending' && (
                  <button 
                    onClick={() => handleProcessPayout(p.id, p.artist, p.amount)}
                    className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                  >
                    Efetuar Pagamento
                  </button>
                )}
                {p.status === 'Completed' && <CheckCircle size={18} className="text-green-500 ml-auto" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTickets = () => (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
       {tickets.filter(t => t.status !== 'Resolved').map(t => (
         <div key={t.id} className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between group gap-4">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                  <MessageSquare size={24} />
               </div>
               <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{t.subject}</h4>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">De: {t.user} • {t.date}</p>
               </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => handleWhatsAppSupport(t.userPhone || '244957729023')} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-5 py-2.5 rounded-xl hover:bg-green-100 border border-green-100"><Phone size={14} /> WhatsApp</button>
              <button onClick={() => setActiveChat(t)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-100 border border-blue-100"><MessageCircle size={14} /> Responder</button>
              <button onClick={() => handleResolveTicket(t.id, t.subject)} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black bg-gray-50 px-5 py-2.5 rounded-xl border border-transparent hover:border-gray-200">Resolver</button>
            </div>
         </div>
       ))}
    </div>
  );

  const renderLaunchGuide = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Rocket size={14} /> Pronto para o Lançamento
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Guia de Deploy Final</h3>
          <p className="text-gray-400 text-sm max-w-lg font-medium">Siga estes passos para colocar o aplicativo no ar e permitir que seus artistas se cadastrem hoje mesmo.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100"><Globe size={24} /></div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">1. Domínio & DNS</h4>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Adquira um domínio profissional (.ao ou .com). Configure os registros CNAME na Vercel ou Netlify para apontar para o seu novo endereço.</p>
          </div>
          <a href="https://vercel.com/docs/concepts/projects/domains" target="_blank" className="flex items-center justify-between text-[9px] font-black uppercase text-blue-500 hover:underline">Ver Tutorial <ChevronRight size={14} /></a>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100"><Database size={24} /></div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">2. Banco de Dados</h4>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Conecte o arquivo 'lib/database.ts' a um serviço real como Supabase ou Firebase para que os dados dos artistas sejam salvos permanentemente.</p>
          </div>
          <a href="https://supabase.com" target="_blank" className="flex items-center justify-between text-[9px] font-black uppercase text-blue-500 hover:underline">Configurar Supabase <ChevronRight size={14} /></a>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-6">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100"><Smartphone size={24} /></div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">3. Mobile PWA</h4>
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Certifique-se de que o 'sw.js' está ativo. Isso permitirá que seus artistas instalem o App no Android/iPhone diretamente do navegador.</p>
          </div>
          <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase text-green-500 bg-green-50 px-3 py-1 rounded-full border border-green-100"><CheckCircle size={12} /> PWA Configurado</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100">
        <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Passos para o Deploy na Vercel:</h4>
        <div className="space-y-4">
          {[
            "Crie um repositório privado no GitHub e envie os arquivos.",
            "Acesse vercel.com e clique em 'Add New Project'.",
            "Importe o repositório da Stream Music.",
            "O build será automático. Em 1 minuto o site estará online!",
            "Envie o link do seu painel master para começar a operar."
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all">
              <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center shrink-0">{i+1}</span>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {activeChat && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Responder Ticket</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Assunto: {activeChat.subject}</p>
              </div>
              <button onClick={() => setActiveChat(null)} className="text-gray-400 hover:text-black transition-all"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <textarea 
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-black outline-none h-32 resize-none font-bold"
              />
              <button onClick={handleSendReply} disabled={!replyMessage.trim()} className="w-full flex items-center justify-center gap-2 p-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-gray-800 disabled:opacity-50 transition-all"><Send size={16} /> Enviar Resposta</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 right-8 z-[110] flex flex-col gap-3">
        {notifications.map(n => (
          <div key={n.id} className={`${n.type === 'success' ? 'bg-black' : n.type === 'error' ? 'bg-red-600' : 'bg-orange-500'} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full`}>
            {n.type === 'success' ? <CheckCircle size={18} className="text-green-400" /> : <AlertCircle size={18} />}
            <span className="text-[10px] font-black uppercase tracking-widest">{n.message}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Receita Geral" value="$1.2M" trend={15} icon={<TrendingUp size={20} />} />
        <StatCard label="Review Pendente" value={releases.filter(r => r.status === 'Em análise').length.toString()} icon={<Clock size={20} />} />
        <StatCard label="Total Artistas" value={MOCK_ARTISTS.length.toString()} icon={<Users size={20} />} />
        <StatCard label="Suporte Aberto" value={tickets.filter(t => t.status !== 'Resolved').length.toString()} icon={<MessageCircle size={20} />} />
      </div>

      <div className="flex items-center gap-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
        {[
          { id: 'moderation', label: 'Moderação', icon: <Music size={16} /> },
          { id: 'payouts', label: 'Pagamentos', icon: <DollarSign size={16} /> },
          { id: 'tickets', label: 'Tickets', icon: <MessageSquare size={16} /> },
          { id: 'crm', label: 'Artistas', icon: <Users size={16} /> },
          { id: 'launch', label: 'Lançamento & Deploy', icon: <Rocket size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`flex items-center gap-2 px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'}`}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'moderation' && renderModeration()}
        {activeTab === 'payouts' && renderPayouts()}
        {activeTab === 'tickets' && renderTickets()}
        {activeTab === 'launch' && renderLaunchGuide()}
        {activeTab === 'crm' && (
          <div className="bg-white rounded-[2rem] p-24 text-center border border-gray-100 shadow-sm">
            <Users size={48} className="text-gray-100 mx-auto mb-4" />
            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Base de dados completa em atualização</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

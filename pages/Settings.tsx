
import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Loader2, 
  Mail, 
  Smartphone, 
  Lock,
  Zap,
  ShieldCheck,
  Camera,
  MapPin,
  FileText
} from 'lucide-react';
import { User } from '../types';

type SettingsModal = 'profile' | 'notifications' | 'security' | 'billing' | 'logout' | 'upgrade' | null;

interface SettingsProps {
  onLogout: () => void;
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ onLogout, user }) => {
  const [activeModal, setActiveModal] = useState<SettingsModal>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false });

  const handleAction = (message: string, duration = 3000) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveModal(null);
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), duration);
    }, 1500);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative group cursor-pointer">
                <img src={user.photo || "https://picsum.photos/seed/user1/200/200"} className="w-24 h-24 rounded-3xl object-cover border-4 border-gray-50 shadow-md group-hover:brightness-75 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={20} />
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alterar Foto de Avatar</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Artístico</label>
                <div className="relative">
                   <UserIcon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                   <input type="text" defaultValue={user.artistName} className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Província</label>
                <div className="relative">
                   <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                   <input type="text" defaultValue={user.province} className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bilhete de Identidade</label>
                <div className="relative">
                   <FileText size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                   <input type="text" defaultValue={user.idNumber} className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
            </div>
            <button onClick={() => handleAction("Perfil atualizado com sucesso!")} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 mt-4">
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Guardar Alterações"}
            </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4 uppercase tracking-tighter">Escolha como deseja receber alertas de royalties e moderação.</p>
            <div className="space-y-3">
              {[
                { id: 'email', label: 'Notificações por E-mail', icon: <Mail size={16} /> },
                { id: 'push', label: 'Alertas no Telemóvel', icon: <Bell size={16} /> },
                { id: 'sms', label: 'Mensagens SMS', icon: <Smartphone size={16} /> }
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 group-hover:text-black transition-colors">{item.icon}</div>
                    <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{item.label}</span>
                  </div>
                  <button 
                    onClick={() => setNotifs(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifs] }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${notifs[item.id as keyof typeof notifs] ? 'bg-black' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifs[item.id as keyof typeof notifs] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => handleAction("Preferências de notificação salvas!")} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 mt-4">
               Confirmar Configuração
            </button>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
               <ShieldCheck className="text-blue-500 shrink-0" size={24} />
               <p className="text-[10px] text-blue-700 font-black uppercase tracking-tight leading-relaxed">A autenticação de dois fatores (2FA) está ativa para a sua segurança.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha Atual</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input type="password" placeholder="Mínimo 8 caracteres" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-4 text-sm font-bold outline-none" />
                </div>
              </div>
            </div>
            <button onClick={() => handleAction("Senha alterada com sucesso!")} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 mt-4">
               Actualizar Credenciais
            </button>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-gray-900 rounded-[2rem] text-white">
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Plano Actual</p>
               <h4 className="text-xl font-black uppercase tracking-tight mb-4">Artist Gold Pro</h4>
               <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Próxima Cobrança</span>
                  <span className="text-sm font-black">12 Set, 2024</span>
               </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cartões Guardados</p>
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm"><CreditCard size={18} /></div>
                    <p className="text-xs font-black text-gray-900 uppercase">Visa •••• 4242</p>
                 </div>
                 <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-1 rounded-md">Padrão</span>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full py-5 border-2 border-black text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all mt-4">
               Gerir Subscrição
            </button>
          </div>
        );
      case 'logout':
        return (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-50">
               <LogOut size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Terminar Sessão?</h3>
            <p className="text-xs text-gray-400 font-bold uppercase mb-8">Terá de introduzir as suas credenciais novamente para aceder ao painel.</p>
            <div className="flex gap-4">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">Cancelar</button>
              <button onClick={onLogout} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-red-600 transition-all">Sim, Sair</button>
            </div>
          </div>
        );
      case 'upgrade':
        return (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-gray-900 text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
               <Zap size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Evolua para Enterprise</h3>
            <p className="text-xs text-gray-400 font-bold uppercase mb-8 leading-relaxed">Aceda a ferramentas de marketing avançadas e suporte prioritário 24/7 via WhatsApp direto.</p>
            <button onClick={() => handleAction("Pedido de upgrade enviado para a equipa comercial!", 5000)} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Solicitar Proposta"}
            </button>
          </div>
        );
      default: return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'profile': return 'Informações do Perfil';
      case 'notifications': return 'Definições de Alerta';
      case 'security': return 'Segurança de Acesso';
      case 'billing': return 'Faturação e Pagamentos';
      case 'logout': return 'Log Out';
      case 'upgrade': return 'Plano Enterprise';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      {/* Settings Modal Layer */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{getModalTitle()}</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            {renderModalContent()}
          </div>
        </div>
      )}

      {/* Global Success Feedback */}
      {successMessage && (
        <div className="fixed bottom-24 right-8 z-[110] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-xs font-black uppercase tracking-widest">{successMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row items-center gap-8 bg-gray-50/30">
          <div className="relative group cursor-pointer" onClick={() => setActiveModal('profile')}>
            <img src={user.photo || "https://picsum.photos/seed/user1/200/200"} className="w-28 h-28 rounded-[2.5rem] object-cover shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-500" alt="Profile" />
            <div className="absolute -bottom-2 -right-2 bg-gray-900 text-white p-2.5 rounded-2xl shadow-lg border-2 border-white">
              <Camera size={16} />
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">{user.artistName}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.fullName} • {user.province}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <span className="bg-green-500/10 text-green-600 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-green-500/20 shadow-sm">
                <ShieldCheck size={12} /> Conta Verificada
              </span>
              <span className="bg-gray-900 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">{user.role === 'admin' ? 'Painel Master' : 'Artist Pro'}</span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'profile' as SettingsModal, icon: <UserIcon size={20} />, label: 'Informações do Perfil', sub: 'Dados pessoais e residência' },
            { id: 'notifications' as SettingsModal, icon: <Bell size={20} />, label: 'Notificações', sub: 'Gerir alertas e canais de contacto' },
            { id: 'security' as SettingsModal, icon: <Shield size={20} />, label: 'Segurança & Senha', sub: 'Gestão de acessos e 2FA' },
            { id: 'billing' as SettingsModal, icon: <CreditCard size={20} />, label: 'Faturação & Pagamentos', sub: 'Métodos de pagamento e histórico' }
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => setActiveModal(item.id)}
              className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-3xl transition-all group border border-transparent hover:border-gray-100 shadow-sm sm:shadow-none hover:shadow-xl hover:shadow-gray-100"
            >
              <div className="flex items-center gap-5 text-left">
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-200 group-hover:text-black transition-colors" />
            </button>
          ))}
        </div>

        <div className="p-10 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button 
            onClick={() => setActiveModal('logout')}
            className="flex items-center gap-3 text-[10px] font-black text-red-500 hover:text-red-600 transition-all uppercase tracking-widest bg-red-50 px-6 py-3 rounded-xl active:scale-95 border border-red-100 shadow-sm"
          >
            <LogOut size={16} />
            Terminar Sessão
          </button>
          <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest">Stream Music v3.1.0 (Build: 2024-AO)</p>
        </div>
      </div>

      {/* Upgrade Banner Interaction */}
      <div className="bg-gray-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-gray-200 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 leading-none">Upgrade para Enterprise</h3>
          <p className="text-sm text-gray-500 font-bold max-w-md uppercase tracking-tighter leading-relaxed">Relatórios white-label, contas ilimitadas e entrega prioritária global.</p>
        </div>
        <button 
          onClick={() => setActiveModal('upgrade')}
          className="relative z-10 whitespace-nowrap bg-white text-gray-900 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl hover:scale-105 transition-all active:scale-95 shadow-white/10"
        >
          Solicitar Upgrade
        </button>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24"></div>
      </div>
    </div>
  );
};

export default Settings;

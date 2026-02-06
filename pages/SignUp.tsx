
import React, { useState } from 'react';
import { Music, User, Shield, Phone, MapPin, Lock, ArrowRight, Loader2, FileText } from 'lucide-react';
import { User as UserType } from '../types';

interface SignUpProps {
  onSignUp: (user: UserType) => void;
  onNavigateToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    artistName: '',
    province: '',
    idNumber: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignUp({
        id: 'user-' + Math.random().toString(36).substr(2, 5),
        fullName: formData.fullName,
        artistName: formData.artistName,
        province: formData.province,
        idNumber: formData.idNumber,
        phone: formData.phone,
        email: formData.artistName.toLowerCase().replace(/\s/g, '') + '@stream.ao',
        role: 'artist',
        photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.artistName}`
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex w-14 h-14 bg-black rounded-[1.25rem] items-center justify-center shadow-2xl">
            <Music className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Cadastro de Artista</h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Angola Music Scene</p>
          </div>
        </div>

        <div className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Próprio</label>
                <div className="relative group">
                  <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="Seu nome real"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome de Artista</label>
                <div className="relative group">
                  <Music size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="Como é conhecido"
                    value={formData.artistName}
                    onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Província</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <select 
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="">Onde reside?</option>
                    {['Luanda', 'Benguela', 'Huambo', 'Cabinda', 'Uíge', 'Malanje', 'Huíla', 'Namibe', 'Cuanza Sul', 'Cuanza Norte', 'Zaire', 'Lunda Norte', 'Lunda Sul', 'Bengo', 'Moxico', 'Bié', 'Cunene', 'Cuando Cubango'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nº do Bilhete</label>
                <div className="relative group">
                  <FileText size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: 008391115B043"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nº de Telefone (Angola)</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="tel" 
                    required
                    placeholder="9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Finalizar Cadastro <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Já possui uma conta?{' '}
            <button onClick={onNavigateToLogin} className="text-black font-black hover:underline">Fazer Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Fix for default export consistency
export default SignUp;

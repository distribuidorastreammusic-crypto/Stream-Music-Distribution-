
import React, { useState } from 'react';
import { Zap, Lock, Phone, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToSignup }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = identifier === '957729023' || identifier === '957709023';

      if (isAdmin) {
        onLogin({
          id: 'admin-master',
          fullName: 'Ibrahim Rabiu',
          artistName: 'Master Admin',
          province: 'Luanda',
          idNumber: '008391115B043',
          phone: identifier,
          email: 'suporte@stream.ao',
          role: 'admin',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });
        return;
      }

      if (identifier && password.length >= 4) {
        onLogin({
          id: 'user-' + Math.random().toString(36).substr(2, 5),
          fullName: 'Artista Premium',
          artistName: identifier,
          province: 'Luanda',
          idNumber: '000000000LA000',
          phone: identifier,
          email: 'user@stream.ao',
          role: 'artist',
          photo: `https://api.dicebear.com/7.x/initials/svg?seed=${identifier}`
        });
      } else {
        setError('Acesso inválido. Verifique os seus dados.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex w-24 h-24 bg-gradient-to-tr from-yellow-700 via-yellow-500 to-yellow-300 rounded-full items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.2)] animate-pulse">
            <Zap className="text-black fill-black" size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Stream Music</h1>
            <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.5em]">Distribution Portal</p>
          </div>
        </div>

        <div className="bg-white/5 p-10 rounded-[3.5rem] border border-white/10 space-y-10 backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Área do Artista</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500">
              <AlertCircle size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Contacto ou E-mail</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-500 transition-colors">
                  {identifier.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
                </div>
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Seu número"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:border-yellow-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Senha</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:border-yellow-500/50 transition-all"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-6 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Entrar Agora <ArrowRight size={20} /></>}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
            Ainda não é um artista Stream?{' '}
            <button onClick={onNavigateToSignup} className="text-yellow-500 hover:underline">Cadastre-se aqui</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Fix for default export error
export default Login;

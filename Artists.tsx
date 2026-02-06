
import React, { useState, useRef } from 'react';
import { 
  User, 
  Globe, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Save, 
  ShieldCheck, 
  Camera,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { MOCK_ARTISTS } from '../constants';

const ArtistProfile: React.FC = () => {
  const [artist, setArtist] = useState(MOCK_ARTISTS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArtist(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtist(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulação de chamada API
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      {/* Toast de Sucesso */}
      {showSuccess && (
        <div className="fixed bottom-24 right-8 z-[110] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-xs font-black uppercase tracking-widest">Perfil atualizado com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Branding */}
        <div className="h-40 bg-gray-900 relative">
          <div className="absolute -bottom-14 left-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative group">
              <img 
                src={artist.photo} 
                className="w-36 h-36 rounded-[2.5rem] object-cover border-8 border-white shadow-2xl transition-transform group-hover:scale-105 duration-500" 
                alt={artist.name} 
              />
              <button 
                type="button"
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center cursor-pointer"
              >
                <Camera className="text-white" size={28} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">{artist.name}</h2>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                 <ShieldCheck size={16} className="text-green-500" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Artista Verificado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-24 px-8 sm:px-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informações Pessoais */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Identidade Artística</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Artístico</label>
                  <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 focus-within:ring-4 focus-within:ring-gray-100/50 transition-all">
                    <User size={18} className="text-gray-300" />
                    <input 
                      type="text" 
                      name="name"
                      value={artist.name}
                      onChange={handleChange}
                      className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Legal (Completo)</label>
                  <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                    <ShieldCheck size={18} className="text-gray-300" />
                    <input 
                      type="text" 
                      name="legalName"
                      value={artist.legalName}
                      onChange={handleChange}
                      className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">País de Origem</label>
                  <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 relative">
                    <Globe size={18} className="text-gray-300" />
                    <select 
                      name="country"
                      value={artist.country}
                      onChange={handleChange}
                      className="bg-transparent border-none outline-none text-sm text-black w-full font-bold appearance-none cursor-pointer"
                    >
                      <option>Angola</option>
                      <option>Portugal</option>
                      <option>Brasil</option>
                      <option>Moçambique</option>
                      <option>Cabo Verde</option>
                      <option>Nigéria</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Telefone</label>
                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                      <Phone size={18} className="text-gray-300" />
                      <input 
                        type="text" 
                        name="phone"
                        value={artist.phone}
                        onChange={handleChange}
                        className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                      <Mail size={18} className="text-gray-300" />
                      <input 
                        type="email" 
                        name="email"
                        value={artist.email}
                        onChange={handleChange}
                        className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Presença Digital */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Presença Digital</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Facebook Profile/Page</label>
                  <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                    <Facebook size={18} className="text-gray-300" />
                    <input 
                      type="text" 
                      name="facebook"
                      value={artist.facebook}
                      onChange={handleChange}
                      placeholder="facebook.com/seuperfil" 
                      className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Instagram Handle</label>
                  <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                    <Instagram size={18} className="text-gray-300" />
                    <input 
                      type="text" 
                      name="instagram"
                      value={artist.instagram}
                      onChange={handleChange}
                      placeholder="@username" 
                      className="bg-transparent border-none outline-none text-sm text-black w-full font-bold" 
                    />
                  </div>
                </div>

                <div className="p-8 bg-gray-900 rounded-3xl border border-black shadow-xl shadow-gray-200 mt-10">
                   <div className="flex items-center gap-3 mb-4">
                     <ShieldCheck className="text-blue-400" size={20} />
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Informação Importante</p>
                   </div>
                   <p className="text-xs text-gray-400 leading-relaxed font-medium">
                     Estes dados são essenciais para a solicitação de perfis verificados no <span className="text-white">Spotify for Artists</span> e <span className="text-white">Apple Music for Artists</span>. Mantenha os seus links sociais atualizados para acelerar o processo.
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between pt-10 border-t border-gray-50">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Última atualização: Hoje às 14:32</p>
            <button 
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArtistProfile;

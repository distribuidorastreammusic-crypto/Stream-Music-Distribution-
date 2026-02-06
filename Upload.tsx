
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload as UploadIcon, 
  CheckCircle2, 
  Image as ImageIcon, 
  Search, 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  FileText,
  CreditCard,
  PenTool,
  ShieldCheck,
  User,
  Loader2,
  UserPlus,
  ArrowLeft,
  Trash2,
  Check,
  Zap,
  PartyPopper
} from 'lucide-react';
import { Release } from '../types';

const MAIN_GENRES = ['Alternativa', 'Afrobeat', 'Hip Hop Rap/ R&B', 'Pop', 'Amapiano', 'Funk', 'Jazz'];
const SUBGENRES = ['Tecno', 'Rap', 'Trap', 'Kizomba', 'Semba', 'Gueto Zouk', 'Afro House', 'Kuduro', 'Gospel'];
const LANGUAGES = ['Português', 'Inglês', 'Francês'];
const PLATFORMS = ['Spotify', 'Apple Music', 'YouTube music', 'Shazam', 'Tik tok', 'Facebook', 'Instagram', 'SoundCloud', 'Bloomplay', 'Amazon Music', 'WhatsApp'];

interface ArtistEntry {
  name: string;
  id: string;
  img: string;
  isNew?: boolean;
}

interface UploadProps {
  onComplete?: () => void;
  onSubmitRelease?: (release: Release) => void;
}

const Upload: React.FC<UploadProps> = ({ onComplete, onSubmitRelease }) => {
  const [step, setStep] = useState(1);
  const [activeSearchIndex, setActiveSearchIndex] = useState<{idx: number, type: 'primary' | 'featured'} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [primaryArtists, setPrimaryArtists] = useState<ArtistEntry[]>([{name: '', id: '', img: ''}]);
  const [featuredArtists, setFeaturedArtists] = useState<ArtistEntry[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(PLATFORMS);
  
  // Form Metadata state
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('');
  const [genre, setGenre] = useState(MAIN_GENRES[0]);
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [upc, setUpc] = useState('');
  const [releaseType, setReleaseType] = useState<'Single' | 'Album' | 'EP'>('Single');

  // Plan Selection
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // File States
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  // Refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Spotify Search Simulation
  const [searchResults, setSearchResults] = useState<{name: string, id: string, followers: string, img: string}[]>([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const results = [
          { name: searchQuery, id: `sp-${Math.random()}`, followers: `${(Math.random() * 500).toFixed(1)}K`, img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchQuery}` },
          { name: `${searchQuery} Official`, id: `sp-${Math.random()}`, followers: `${(Math.random() * 50).toFixed(1)}K`, img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchQuery}2` },
          { name: `${searchQuery} Beats`, id: `sp-${Math.random()}`, followers: `${(Math.random() * 10).toFixed(1)}K`, img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchQuery}3` },
        ];
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Canvas Logic
  const startDrawing = (e: any) => {
    if (e.cancelable) e.preventDefault();
    setIsDrawing(true);
    draw(e);
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };
  const draw = (e: any) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX))) - rect.left;
    const y = ((e.clientY || (e.touches && e.touches[0].clientY))) - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step - 1);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'audio' | 'proof') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'cover') {
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else if (type === 'audio') {
      setAudioFile(file);
    } else if (type === 'proof') {
      setProofFile(file);
    }
  };

  const selectProfile = (profile: any) => {
    if (!activeSearchIndex) return;
    const list = activeSearchIndex.type === 'primary' ? [...primaryArtists] : [...featuredArtists];
    list[activeSearchIndex.idx] = { name: profile.name, id: profile.id, img: profile.img };
    if (activeSearchIndex.type === 'primary') setPrimaryArtists(list);
    else setFeaturedArtists(list);
    setActiveSearchIndex(null);
    setSearchQuery('');
  };

  const createNewArtist = () => {
    if (!activeSearchIndex) return;
    const entry = { name: searchQuery, id: 'new', img: `https://api.dicebear.com/7.x/initials/svg?seed=${searchQuery}`, isNew: true };
    const list = activeSearchIndex.type === 'primary' ? [...primaryArtists] : [...featuredArtists];
    list[activeSearchIndex.idx] = entry;
    if (activeSearchIndex.type === 'primary') setPrimaryArtists(list);
    else setFeaturedArtists(list);
    setActiveSearchIndex(null);
    setSearchQuery('');
  };

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleFinalSubmit = () => {
    if (!acceptedTerms) return;
    setIsSubmitting(true);
    
    // Construct real Release object
    const newRelease: Release = {
      id: Math.random().toString(36).substr(2, 9),
      title: title || 'Sem Título',
      artist: primaryArtists.map(a => a.name).filter(Boolean).join(' & ') || 'Artista Desconhecido',
      cover: coverPreview || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400',
      type: releaseType,
      status: 'Em análise',
      releaseDate: releaseDate,
      upc: upc || Math.floor(Math.random() * 1000000000000).toString(),
      genre: genre,
      platforms: selectedPlatforms,
      revenue: 0
    };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmitRelease) {
        onSubmitRelease(newRelease);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  // SUCCESS VIEW
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-50">
           <PartyPopper size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-black uppercase tracking-tight">Lançamento Enviado!</h2>
          <p className="text-gray-500 font-medium">Sua música foi enviada para a nossa equipa de moderação. Em até 24h ela será processada e enviada para as lojas selecionadas.</p>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4 text-left">
           <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-400 border-b border-gray-50 pb-4">
             <span>Status do Pedido</span>
             <span className="text-blue-500">Em Moderação</span>
           </div>
           <div className="flex items-center gap-4">
              {coverPreview && <img src={coverPreview} className="w-16 h-16 rounded-xl object-cover" />}
              <div>
                 <p className="text-sm font-black text-black">Aguardando aprovação técnica</p>
                 <p className="text-xs text-gray-400">Receberá uma notificação assim que for aprovado.</p>
              </div>
           </div>
        </div>
        <button 
          onClick={onComplete}
          className="w-full py-5 bg-black text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Ir para o Dashboard <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 px-4 sm:px-0">
      
      {/* Step Indicator */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1 justify-center last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= s ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {s}
            </div>
            <span className={`text-[10px] font-bold uppercase hidden md:block ${step >= s ? 'text-black' : 'text-gray-400'}`}>
              {s === 1 ? 'Metadados' : s === 2 ? 'Upload' : s === 3 ? 'Plano' : 'Checkout'}
            </span>
            {s < 4 && <div className={`h-px flex-1 mx-2 ${step > s ? 'bg-black' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1: METADADOS */}
      {step === 1 && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título da música</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome da faixa" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Versão (opcional)</label>
              <input 
                type="text" 
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Ex: Remix, Acoustic" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" 
              />
            </div>
          </div>

          {/* Artist Search Areas */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Artista Principal</label>
              <button onClick={() => setPrimaryArtists([...primaryArtists, {name: '', id: '', img: ''}])} className="text-[9px] font-bold text-blue-600 uppercase flex items-center gap-1"><Plus size={12}/> Adicionar</button>
            </div>
            {primaryArtists.map((artist, idx) => (
              <div key={idx} className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={activeSearchIndex?.idx === idx && activeSearchIndex.type === 'primary' ? searchQuery : artist.name}
                    placeholder="Pesquisar perfil no Spotify..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-black outline-none"
                    onChange={(e) => { setActiveSearchIndex({idx, type: 'primary'}); setSearchQuery(e.target.value); }}
                    onFocus={() => { setActiveSearchIndex({idx, type: 'primary'}); }}
                  />
                  {artist.img && !activeSearchIndex && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white p-1 pr-3 rounded-full border border-gray-100">
                      <img src={artist.img} className="w-6 h-6 rounded-full" />
                      <span className={`text-[8px] font-bold uppercase ${artist.isNew ? 'text-blue-500' : 'text-green-500'}`}>{artist.isNew ? 'Novo' : 'Spotify'}</span>
                    </div>
                  )}
                </div>
                {idx > 0 && <button onClick={() => setPrimaryArtists(primaryArtists.filter((_, i) => i !== idx))} className="p-4 bg-red-50 text-red-500 rounded-xl"><Trash2 size={16} /></button>}
              </div>
            ))}

            <div className="flex items-center justify-between mt-8">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Artista Participante</label>
              <button onClick={() => setFeaturedArtists([...featuredArtists, {name: '', id: '', img: ''}])} className="text-[9px] font-bold text-blue-600 uppercase flex items-center gap-1"><Plus size={12}/> Adicionar</button>
            </div>
            {featuredArtists.map((artist, idx) => (
              <div key={idx} className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={activeSearchIndex?.idx === idx && activeSearchIndex.type === 'featured' ? searchQuery : artist.name}
                    placeholder="Pesquisar perfil no Spotify..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-black outline-none"
                    onChange={(e) => { setActiveSearchIndex({idx, type: 'featured'}); setSearchQuery(e.target.value); }}
                    onFocus={() => { setActiveSearchIndex({idx, type: 'featured'}); }}
                  />
                </div>
                <button onClick={() => setFeaturedArtists(featuredArtists.filter((_, i) => i !== idx))} className="p-4 bg-red-50 text-red-500 rounded-xl"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          {/* Search Dropdown Mockup */}
          {activeSearchIndex && searchQuery.length > 0 && (
            <div className="absolute z-[100] left-8 right-8 top-32 bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <button onClick={() => setActiveSearchIndex(null)} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase"><ArrowLeft size={14} /> Voltar</button>
                {isSearching && <Loader2 size={14} className="animate-spin text-gray-400" />}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map(p => (
                  <button key={p.id} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left border-b border-gray-50" onClick={() => selectProfile(p)}>
                    <img src={p.img} className="w-10 h-10 rounded-full" />
                    <div><p className="text-sm font-bold text-gray-900">{p.name}</p><p className="text-[9px] text-gray-400 font-bold uppercase">Artista • {p.followers} Seguidores</p></div>
                  </button>
                ))}
                <button onClick={createNewArtist} className="w-full p-6 bg-blue-50/20 hover:bg-blue-50 flex items-center gap-4 text-left group">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-500 group-hover:border-blue-500 transition-all"><UserPlus size={18} /></div>
                  <div><p className="text-sm font-bold text-blue-600">Criar novo perfil: "{searchQuery}"</p><p className="text-[9px] text-blue-400 font-bold uppercase">Usar este nome para o lançamento</p></div>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compositor</label>
              <input type="text" placeholder="Nome legal" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Produtor</label>
              <input type="text" placeholder="Nome do produtor" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gênero Musical</label>
              <select 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none appearance-none"
              >
                {MAIN_GENRES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subgênero</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none appearance-none">
                {SUBGENRES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Idioma</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none appearance-none">
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">País</label>
              <input type="text" placeholder="Ex: Angola" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data de Lançamento</label>
              <input 
                type="date" 
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Label / Editora</label>
              <input type="text" placeholder="Nome da editora" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ISRC (Opcional)</label>
              <input type="text" placeholder="Código ISRC" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">UPC (Opcional)</label>
              <input 
                type="text" 
                value={upc}
                onChange={(e) => setUpc(e.target.value)}
                placeholder="Código UPC" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" 
              />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Copyright (℗ e ©)</label>
              <p className="text-sm font-black text-black">2026 Stream Music Distribution</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 italic">Bloqueado para edição</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl flex flex-col justify-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Conteúdo Explícito</label>
              <div className="flex gap-6">
                {['Sim', 'Não'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="explicit" className="w-4 h-4 accent-black" defaultChecked={opt === 'Não'} />
                    <span className="text-xs font-bold text-gray-600 group-hover:text-black">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button onClick={handleNext} className="bg-black text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all shadow-xl shadow-gray-200">
              Próxima Página <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: UPLOAD & ASSETS */}
      {step === 2 && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10 animate-in slide-in-from-right-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tipo de Lançamento</label>
                <select 
                  value={releaseType}
                  onChange={(e) => setReleaseType(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none appearance-none"
                >
                  <option value="Single">Single</option>
                  <option value="EP">EP</option>
                  <option value="Album">Álbum</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Número de Faixas</label>
                <input type="number" defaultValue={1} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Letra (Opcional)</label>
                <textarea placeholder="Cole a letra aqui..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-black outline-none h-44 resize-none" />
              </div>
              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                <ShieldCheck size={24} className="text-blue-500" />
                <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight">Content ID Ativo: Sua música será protegida automaticamente no YouTube e Redes Sociais.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capa (Mínimo 3000x3000px)</label>
                <div onClick={() => coverInputRef.current?.click()} className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group hover:border-black transition-all">
                  {coverPreview ? <img src={coverPreview} className="absolute inset-0 w-full h-full object-cover" /> : <div className="text-center p-6"><ImageIcon size={40} className="mx-auto text-gray-300 group-hover:text-black mb-2" /><p className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-black">Upload JPG/PNG</p></div>}
                  <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleFile(e, 'cover')} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Áudio Master (Wav / Flac)</label>
                <div onClick={() => audioInputRef.current?.click()} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center gap-3 cursor-pointer hover:border-black transition-all">
                  <UploadIcon size={28} className={audioFile ? 'text-green-500' : 'text-gray-300'} />
                  <p className="text-[11px] font-bold text-black uppercase">{audioFile ? audioFile.name : 'Selecionar Áudio'}</p>
                  <input type="file" ref={audioInputRef} className="hidden" accept=".wav,.flac" onChange={(e) => handleFile(e, 'audio')} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 block">Selecionar Plataformas</label>
             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
               {PLATFORMS.map(p => (
                 <button key={p} onClick={() => togglePlatform(p)} className={`p-4 rounded-xl border text-[10px] font-bold uppercase transition-all ${selectedPlatforms.includes(p) ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}`}>
                   {p}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex justify-between pt-6">
            <button onClick={handleBack} className="bg-gray-100 text-gray-600 px-10 py-5 rounded-2xl font-bold flex items-center gap-2">
              <ChevronLeft size={18} /> Voltar
            </button>
            <button onClick={handleNext} disabled={!coverPreview || !audioFile} className="bg-black text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-900 shadow-xl disabled:opacity-30">
              Escolher Plano <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ESCOLHER PLANO */}
      {step === 3 && (
        <div className="space-y-8 animate-in slide-in-from-right-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'single', label: 'Single', price: '2.500 Kz', desc: '1 música em todas as plataformas' },
              { id: 'album', label: 'Álbum / EP', price: '13.000 Kz', desc: 'Até 25 músicas no mesmo lançamento' },
              { id: 'unlimited', label: 'Lançamentos Ilimitados', price: '30.000 Kz', desc: 'Lance quantas músicas quiser por 1 ano', promo: true }
            ].map(plan => (
              <button 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white p-8 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-80 group ${
                  selectedPlan === plan.id ? 'border-black shadow-2xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                {plan.promo && <div className="absolute -top-3 right-6 bg-blue-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg">Mais Vendido</div>}
                <div>
                  <div className={`p-3 rounded-2xl w-fit mb-6 ${selectedPlan === plan.id ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
                    <Zap size={20} />
                  </div>
                  <h3 className="text-xl font-black text-black uppercase mb-1">{plan.label}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase">{plan.desc}</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-black">{plan.price}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Taxa única de distribuição</p>
                </div>
                {selectedPlan === plan.id && <div className="absolute bottom-6 right-6 text-black"><CheckCircle2 size={24} /></div>}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between pt-6">
            <button onClick={handleBack} className="bg-gray-100 text-gray-600 px-10 py-5 rounded-2xl font-bold flex items-center gap-2">
              <ChevronLeft size={18} /> Voltar
            </button>
            <button onClick={handleNext} disabled={!selectedPlan} className="bg-black text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-900 shadow-xl disabled:opacity-30">
              Pagamento <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CHECKOUT & PAYMENT */}
      {step === 4 && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-10 animate-in slide-in-from-right-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="p-8 bg-black rounded-3xl text-white space-y-6 shadow-2xl">
                <div className="flex items-center gap-3"><CreditCard size={20} className="text-gray-400" /><h3 className="text-xs font-bold uppercase tracking-widest">Informações de Pagamento</h3></div>
                <div className="space-y-6 pt-2">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 group relative">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">IBAN Angola (BCI)</p>
                    <p className="text-sm font-mono font-bold select-all">0040 0000 6280 6554 101 92</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 group relative">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Multicaixa Express</p>
                    <p className="text-sm font-bold select-all">959492748</p>
                  </div>
                </div>
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter leading-tight italic">O processamento do lançamento inicia após a verificação do comprovativo pela nossa equipa de moderação.</p>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Comprovativo de Pagamento</label>
                <div onClick={() => proofInputRef.current?.click()} className="p-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-all">
                  <FileText size={32} className={proofFile ? 'text-green-500' : 'text-gray-300'} />
                  <p className="text-xs font-bold text-black mt-3 uppercase">{proofFile ? proofFile.name : 'Upload Foto / PDF'}</p>
                  <input type="file" ref={proofInputRef} className="hidden" accept=".pdf,.docx,.jpg,.png" onChange={(e) => handleFile(e, 'proof')} />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assinatura do Responsável</label>
                  <button onClick={() => canvasRef.current?.getContext('2d')?.clearRect(0,0,1000,1000)} className="text-[9px] font-bold text-red-500 uppercase hover:underline">Limpar</button>
                </div>
                <div className="h-48 bg-gray-50 rounded-3xl border border-gray-100 relative group overflow-hidden border-2">
                  <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={192} 
                    className="w-full h-full cursor-crosshair touch-none" 
                    onMouseDown={startDrawing} 
                    onMouseMove={draw} 
                    onMouseUp={stopDrawing} 
                    onMouseOut={stopDrawing} 
                    onTouchStart={startDrawing} 
                    onTouchMove={draw} 
                    onTouchEnd={stopDrawing} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 transition-opacity group-hover:opacity-10"><PenTool size={48} /></div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 accent-black cursor-pointer mt-1" 
                  />
                  <div>
                    <span className="text-xs font-bold uppercase text-black">Concordo com os Termos</span>
                    <p className="text-[9px] text-gray-500 mt-2 font-medium uppercase tracking-tighter leading-tight">Ao clicar em distribuir, declaro que possuo todos os direitos sobre a obra e que os dados fornecidos são verdadeiros sob pena de remoção imediata.</p>
                  </div>
                </label>
                <button 
                  onClick={handleFinalSubmit}
                  disabled={!acceptedTerms || isSubmitting}
                  className="w-full py-5 bg-black text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" /> Processando...
                    </div>
                  ) : (
                    <>Distribuir Agora <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-start pt-4">
            <button onClick={handleBack} disabled={isSubmitting} className="bg-gray-100 text-gray-600 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 disabled:opacity-30">
              <ChevronLeft size={16} /> Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;

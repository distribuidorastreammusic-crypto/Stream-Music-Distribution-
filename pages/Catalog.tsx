
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  X, 
  Eye, 
  ExternalLink,
  Music,
  Calendar,
  Layers,
  Globe,
  Share2
} from 'lucide-react';
import { Release, ReleaseStatus } from '../types';

interface CatalogProps {
  releases: Release[];
}

const Catalog: React.FC<CatalogProps> = ({ releases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | ReleaseStatus>('All');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Lógica de Filtragem e Busca
  const filterByStatusAndSearch = (items: Release[]) => {
    return items.filter(r => {
      const matchesSearch = 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.upc.includes(searchTerm);
      
      const matchesFilter = activeFilter === 'All' || r.status === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  };

  // Grupos de Status
  const approvedReleases = filterByStatusAndSearch(releases.filter(r => r.status === 'Distribuído' || r.status === 'Aprovado'));
  const pendingReleases = filterByStatusAndSearch(releases.filter(r => r.status === 'Em análise'));
  const rejectedReleases = filterByStatusAndSearch(releases.filter(r => r.status === 'Rejeitado' || r.status === 'Correção Necessária'));

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Titulo,Artista,Status,Data,UPC\n"
      + releases.map(r => `${r.id},${r.title},${r.artist},${r.status},${r.releaseDate},${r.upc}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "meu_catalogo_stream_music.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ReleaseCard: React.FC<{ release: Release }> = ({ release }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={release.cover} 
          alt={release.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => setSelectedRelease(release)}
            className="p-3 bg-white text-black rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
            title="Ver detalhes"
          >
            <Eye size={18} />
          </button>
          <button 
            className="p-3 bg-white text-black rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-gray-100"
            title="Partilhar"
          >
            <Share2 size={18} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-sm ${
            release.status === 'Distribuído' || release.status === 'Aprovado' ? 'bg-green-500 text-white' : 
            release.status === 'Em análise' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {release.status}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-black text-gray-900 line-clamp-1 text-xs uppercase mb-0.5 tracking-tight">{release.title}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-3">{release.artist}</p>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex -space-x-1.5">
            {release.platforms.slice(0, 3).map((p, i) => (
              <div key={i} title={p} className="w-5 h-5 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[7px] font-black text-gray-400 shadow-sm">
                {p[0]}
              </div>
            ))}
            {release.platforms.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-gray-900 border border-white flex items-center justify-center text-[7px] font-black text-white shadow-sm">
                +{release.platforms.length - 3}
              </div>
            )}
          </div>
          <button onClick={() => setSelectedRelease(release)} className="text-gray-300 hover:text-black transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const StatusSection: React.FC<{ items: Release[], title: string, icon: any, colorClass: string }> = ({ items, title, icon: Icon, colorClass }) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className={`p-2 rounded-xl ${colorClass} bg-opacity-10`}>
            <Icon size={18} className={colorClass.replace('bg-', 'text-')} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{title}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{items.length} Lançamentos</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {items.map(release => <ReleaseCard key={release.id} release={release} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Detalhes da Obra (Modal) */}
      {selectedRelease && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-square">
                <img src={selectedRelease.cover} className="w-full h-full object-cover" alt={selectedRelease.title} />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between relative bg-white">
                <button 
                  onClick={() => setSelectedRelease(null)} 
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-black"
                >
                  <X size={20} />
                </button>
                
                <div className="space-y-6">
                  <div>
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block ${
                      selectedRelease.status === 'Distribuído' || selectedRelease.status === 'Aprovado' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {selectedRelease.status}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{selectedRelease.title}</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wide">{selectedRelease.artist}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><Layers size={10}/> Tipo</p>
                      <p className="text-xs font-bold text-gray-900">{selectedRelease.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><Music size={10}/> Gênero</p>
                      <p className="text-xs font-bold text-gray-900">{selectedRelease.genre}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><Calendar size={10}/> Lançamento</p>
                      <p className="text-xs font-bold text-gray-900">{selectedRelease.releaseDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1"><Globe size={10}/> UPC</p>
                      <p className="text-xs font-mono font-bold text-gray-900">{selectedRelease.upc}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Lojas Ativas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRelease.platforms.map(p => (
                        <span key={p} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[8px] font-bold text-gray-500 uppercase tracking-tight">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-3">
                  <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
                    Metadados
                  </button>
                  <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 hover:text-black transition-all active:scale-95">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra Superior: Busca e Exportar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por título, artista ou UPC..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-50 transition-all shadow-sm placeholder:text-gray-300"
          />
        </div>
        <button 
          onClick={handleExport}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-500 hover:text-black transition-all shadow-sm active:scale-95"
        >
          <Download size={16} /> Exportar Catálogo (CSV)
        </button>
      </div>

      {/* Filtros de Status */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => setActiveFilter('All')}
          className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
            activeFilter === 'All' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
          }`}
        >
          Todos os Lançamentos
        </button>
        {(['Aprovado', 'Distribuído', 'Em análise', 'Rejeitado', 'Correção Necessária'] as ReleaseStatus[]).map((status) => (
          <button 
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
              activeFilter === status ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Filas de Lançamento em Grelha */}
      <div className="space-y-16">
        <StatusSection 
          items={approvedReleases} 
          title="Lançamentos Aprovados" 
          icon={CheckCircle} 
          colorClass="bg-green-500" 
        />
        
        <StatusSection 
          items={pendingReleases} 
          title="Lançamentos Pendentes" 
          icon={Clock} 
          colorClass="bg-blue-500" 
        />
        
        <StatusSection 
          items={rejectedReleases} 
          title="Não Aprovados / Correção" 
          icon={AlertCircle} 
          colorClass="bg-red-500" 
        />

        {(approvedReleases.length === 0 && pendingReleases.length === 0 && rejectedReleases.length === 0) && (
          <div className="py-32 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto text-gray-200 border border-gray-100">
              <Search size={32} />
            </div>
            <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Nenhum resultado encontrado</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveFilter('All');}}
              className="text-xs font-bold text-gray-900 underline uppercase tracking-tighter"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;


import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { Page, User as UserType } from '../types';
import { X, Zap } from 'lucide-react';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, onClose, user }) => {
  const filteredNavItems = NAVIGATION_ITEMS.filter(item => {
    if (item.id === 'admin' && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black transition-transform duration-500 lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="h-24 flex items-center px-8 justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)] overflow-hidden">
                <div className="w-full h-full bg-black/20 flex items-center justify-center">
                  <Zap size={22} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tighter text-white uppercase leading-none mb-1">Stream Music</span>
                <span className="text-[8px] text-yellow-500 font-black tracking-[0.3em] uppercase leading-none">Premium</span>
              </div>
            </div>
            <button className="lg:hidden text-white/50" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest
                  ${activePage === item.id 
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black shadow-lg shadow-yellow-600/20' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'}
                `}
              >
                <div className={`${activePage === item.id ? 'text-black' : 'text-white/40'}`}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-8">
            <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 text-center">
              <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-black mb-2">Sua Conta</p>
              <p className="text-xs font-black text-yellow-500 uppercase">Verificada ✅</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

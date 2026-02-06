
import React, { useState } from 'react';
import { Bell, Search, Menu, Check, LogOut, ChevronDown } from 'lucide-react';
import { AppNotification, User as UserType } from '../types';

interface TopbarProps {
  onMenuOpen: () => void;
  title: string;
  notifications: AppNotification[];
  onMarkRead: () => void;
  user: UserType | null;
  onLogout?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuOpen, title, notifications, onMarkRead, user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuOpen}
          className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl w-64 border border-gray-100 focus-within:ring-2 focus-within:ring-gray-200 transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-black font-medium"
          />
        </div>

        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              if (!showNotifications) onMarkRead();
            }}
            className={`p-2 rounded-xl transition-all ${showNotifications ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Notificações</h4>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{notifications.length}</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/30' : ''}`}>
                      <p className="text-xs font-bold text-gray-900 mb-1">{n.title}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{n.message}</p>
                      <span className="text-[9px] font-bold text-gray-300 uppercase">{n.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Check size={24} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-xs text-gray-400">Tudo limpo!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-3 sm:pl-6 sm:border-l border-gray-100 group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.artistName || 'Convidado'}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user?.role === 'admin' ? 'Painel Master' : 'Artista'}</p>
            </div>
            <img 
              src={user?.photo || "https://picsum.photos/seed/user/100/100"} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border border-gray-100 object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-2">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={16} /> Terminar Sessão
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

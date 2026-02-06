
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Catalog from './pages/Catalog';
import Royalties from './pages/Royalties';
import Support from './pages/Support';
import Settings from './pages/Settings';
import ArtistProfile from './pages/Artists';
import AdminPage from './pages/Admin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Page, Release, PayoutRequest, Ticket, AppNotification, User } from './types';
import { MOCK_RELEASES, MOCK_PAYOUTS, MOCK_TICKETS } from './constants';
import { Bell } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Global Shared State
  const [releases, setReleases] = useState<Release[]>(MOCK_RELEASES);
  const [payouts, setPayouts] = useState<PayoutRequest[]>(MOCK_PAYOUTS);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: '1', title: 'Boas-vindas', message: 'Bem-vindo à Stream Music Distribution!', time: 'Agora', read: false, type: 'artist' }
  ]);

  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activePage]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActivePage('dashboard');
    addNotification({
      title: 'Bem-vindo de volta!',
      message: `${user.artistName}, a sua música está à espera do mundo.`,
      type: 'artist'
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('login');
  };

  const handleSignUp = (user: User) => {
    setCurrentUser(user);
    setActivePage('dashboard');
    addNotification({
      title: 'Conta Criada!',
      message: 'A sua jornada com a Stream Music começa hoje.',
      type: 'artist'
    });
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      time: 'Agora',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    setTimeout(() => setActiveToast(null), 4000);
  };

  const addRelease = (newRelease: Release) => {
    setReleases(prev => [newRelease, ...prev]);
    addNotification({
      title: 'Lançamento Recebido',
      message: `"${newRelease.title}" foi enviado para moderação técnica.`,
      type: 'artist'
    });
  };

  const markTypeAsRead = () => {
    const currentType = activePage === 'admin' ? 'admin' : 'artist';
    setNotifications(prev => prev.map(n => n.type === currentType ? { ...n, read: true } : n));
  };

  // Auth Guard Logic
  if (!currentUser) {
    if (activePage === 'signup') {
      return <SignUp onSignUp={handleSignUp} onNavigateToLogin={() => setActivePage('login')} />;
    }
    return <Login onLogin={handleLogin} onNavigateToSignup={() => setActivePage('signup')} />;
  }

  const renderPage = () => {
    // Redirecionamento preventivo para não-admins tentando acessar área master
    if (activePage === 'admin' && currentUser.role !== 'admin') {
      setActivePage('dashboard');
      return null;
    }

    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'upload': return <Upload onComplete={() => setActivePage('dashboard')} onSubmitRelease={addRelease} />;
      case 'catalog': return <Catalog releases={releases} />;
      case 'royalties': return <Royalties />;
      case 'support': return (
        <Support 
          tickets={tickets} 
          setTickets={setTickets} 
          onNewTicket={(t) => {
            addNotification({ 
              title: 'Suporte Solicitado', 
              message: `Chamado #${t.id} aberto com sucesso.`, 
              type: 'artist' 
            });
          }}
        />
      );
      case 'settings': return <Settings onLogout={handleLogout} user={currentUser} />;
      case 'artists': return <ArtistProfile />;
      case 'admin': return (
        <AdminPage 
          releases={releases} 
          setReleases={setReleases}
          payouts={payouts}
          setPayouts={setPayouts}
          tickets={tickets}
          setTickets={setTickets}
          onAction={(msg, type) => addNotification({ title: 'Aviso do Sistema', message: msg, type: type })}
        />
      );
      default: return <Dashboard setActivePage={setActivePage} />;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'upload': return 'Novo Lançamento';
      case 'catalog': return 'Meu Catálogo';
      case 'royalties': return 'Financeiro';
      case 'support': return 'Suporte Técnico';
      case 'settings': return 'Definições';
      case 'admin': return 'Painel Master';
      default: return 'Stream Music';
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-['Inter']">
      
      {activeToast && (
        <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-full duration-300">
           <div className={`flex items-start gap-4 p-5 rounded-[1.5rem] shadow-2xl border border-gray-100 bg-white max-w-sm`}>
              <div className={`p-2 rounded-xl ${activeToast.type === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-tight mb-1">{activeToast.title}</p>
                <p className="text-[11px] text-gray-400 font-bold leading-tight">{activeToast.message}</p>
              </div>
           </div>
        </div>
      )}

      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={currentUser}
      />

      <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
        <Topbar 
          onMenuOpen={() => setIsSidebarOpen(true)} 
          title={getPageTitle()}
          notifications={notifications.filter(n => (activePage === 'admin' ? n.type === 'admin' : n.type === 'artist'))}
          onMarkRead={markTypeAsRead}
          user={currentUser}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;

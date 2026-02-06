
import React from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  Disc, 
  DollarSign, 
  BarChart3, 
  UserCircle, 
  Building2, 
  LifeBuoy, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { Page, Release, Artist, Ticket, PayoutRequest } from './types';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'upload' as Page, label: 'Lançar Música', icon: <Upload size={20} /> },
  { id: 'catalog' as Page, label: 'Catálogo', icon: <Disc size={20} /> },
  { id: 'royalties' as Page, label: 'Royalties', icon: <DollarSign size={20} /> },
  { id: 'analytics' as Page, label: 'Relatórios', icon: <BarChart3 size={20} /> },
  { id: 'artists' as Page, label: 'Perfil Artista', icon: <UserCircle size={20} /> },
  { id: 'labels' as Page, label: 'Editoras', icon: <Building2 size={20} /> },
  { id: 'support' as Page, label: 'Suporte', icon: <LifeBuoy size={20} /> },
  { id: 'settings' as Page, label: 'Definições', icon: <Settings size={20} /> },
  { id: 'admin' as Page, label: 'Painel Master', icon: <ShieldCheck size={20} /> },
];

export const MOCK_RELEASES: Release[] = [
  {
    id: '1',
    title: 'Minha Banda',
    artist: 'Gerilson Insra',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400',
    type: 'Single',
    status: 'Distribuído',
    releaseDate: '2024-05-12',
    upc: '123456789012',
    genre: 'Kizomba',
    platforms: ['Spotify', 'Apple', 'Boomplay', 'Audiomack'],
    revenue: 4500.00
  },
  {
    id: '2',
    title: 'Semba de Angola',
    artist: 'Puto Português',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
    type: 'Album',
    status: 'Em análise',
    releaseDate: '2024-06-15',
    upc: '098765432109',
    genre: 'Semba',
    platforms: ['Spotify', 'YouTube Music', 'Audiomack'],
    revenue: 0
  },
  {
    id: '3',
    title: 'Amapiano Vibe',
    artist: 'Scró Q Cuia',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400',
    type: 'EP',
    status: 'Rejeitado',
    releaseDate: '2024-08-01',
    upc: '556677889900',
    genre: 'Amapiano',
    platforms: ['Spotify', 'Apple', 'Tidal'],
    revenue: 0
  }
];

export const MOCK_PAYOUTS: PayoutRequest[] = [
  { id: 'P-101', artist: 'Gerilson Insra', amount: 1200.50, method: 'IBAN Angola', date: '2024-08-02', status: 'Pending' },
  { id: 'P-102', artist: 'Scró Q Cuia', amount: 850.00, method: 'PayPal', date: '2024-08-01', status: 'Completed' },
  { id: 'P-103', artist: 'Puto Português', amount: 3100.20, method: 'IBAN Portugal', date: '2024-07-28', status: 'Pending' },
];

export const MOCK_ARTISTS: Artist[] = [
  { 
    id: '1', 
    name: 'Gerilson Insra', 
    legalName: 'Gerilson Carvalho', 
    photo: 'https://picsum.photos/seed/gerilson/400/400', 
    country: 'Angola', 
    phone: '+244 923 000 000', 
    email: 'gerilson@music.ao',
    facebook: 'gerilsoninsra.oficial',
    instagram: '@gerilson_insra',
    streams: '15.2M', 
    monthlyListeners: '850K', 
    releasesCount: 24 
  },
  { 
    id: '2', 
    name: 'Scró Q Cuia', 
    legalName: 'Scró Carvalho', 
    photo: 'https://picsum.photos/seed/scro/400/400', 
    country: 'Angola', 
    phone: '+244 923 111 222', 
    email: 'scro@music.ao',
    streams: '8.4M', 
    monthlyListeners: '420K', 
    releasesCount: 12 
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1001',
    subject: 'Problema no pagamento de royalties (Junho)',
    status: 'In Progress',
    date: '2024-07-28',
    priority: 'High',
    user: 'Gerilson Insra'
  },
  {
    id: 'T-1002',
    subject: 'Alteração de nome artístico',
    status: 'Open',
    date: '2024-07-30',
    priority: 'Medium',
    user: 'Puto Português'
  },
  {
    id: 'T-1003',
    subject: 'Verificação de perfil no Spotify',
    status: 'Resolved',
    date: '2024-07-25',
    priority: 'Low',
    user: 'Gerilson Insra'
  }
];

export const GENRES = [
  'Alternativa', 'Afrobeat', 'Hip Hop Rap/ R&B', 'Pop', 'Amapiano', 'Funk', 'Jazz'
];

export const SUBGENRES = [
  'Tecno', 'Rap', 'Trap', 'Kizomba', 'Semba', 'Gueto Zouk', 'Afro House', 'Kuduro', 'Gospel'
];

export const PLATFORMS = [
  'Spotify', 'Apple Music', 'YouTube music', 'Shazam', 'Tik tok', 'Facebook', 'Instagram', 'SoundCloud', 'Bloomplay', 'Amazon Music', 'WhatsApp'
];

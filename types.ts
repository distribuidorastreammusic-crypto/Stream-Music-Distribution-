
import React from 'react';

export type Page = 
  | 'dashboard' 
  | 'upload' 
  | 'catalog' 
  | 'royalties' 
  | 'analytics' 
  | 'artists' 
  | 'labels' 
  | 'support' 
  | 'settings'
  | 'admin'
  | 'login'
  | 'signup';

export type ReleaseStatus = 'Em análise' | 'Aprovado' | 'Distribuído' | 'Rejeitado' | 'Correção Necessária';

export interface User {
  id: string;
  fullName: string;
  artistName: string;
  province: string;
  idNumber: string; // Bilhete de Identidade
  phone: string;
  email: string;
  role: 'admin' | 'artist';
  photo?: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  cover: string;
  type: 'Single' | 'Album' | 'EP';
  status: ReleaseStatus;
  releaseDate: string;
  upc: string;
  isrc?: string;
  platforms: string[];
  revenue: number;
  genre: string;
}

export interface Artist {
  id: string;
  name: string;
  legalName: string;
  photo: string;
  country: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  streams: string;
  monthlyListeners: string;
  releasesCount: number;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  user?: string;
  userPhone?: string;
}

export interface PayoutRequest {
  id: string;
  artist: string;
  amount: number;
  method: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'admin' | 'artist';
}

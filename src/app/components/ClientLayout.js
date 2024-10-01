'use client';

import React from 'react';
import containerStyles from '@/app/styles/Sections.module.css';

import { UserProvider } from '@/app/contexts/GameContext.jsx'; // Updated path
import Footer from './Footer';

export default function ClientLayout({ children }) {
  return (
    <UserProvider>
      <Footer/>
      {children}
    </UserProvider>
  );
}

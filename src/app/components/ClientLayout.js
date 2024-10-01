'use client';

import React from 'react';
import containerStyles from '@/app/styles/Sections.module.css';

import { UserProvider } from '@/app/contexts/GameContext.jsx'; // Updated path

export default function ClientLayout({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

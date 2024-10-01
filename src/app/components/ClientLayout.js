'use client';

import React from 'react';
import { UserProvider } from '@/app/contexts/GameContext.jsx'; // Updated path

export default function ClientLayout({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

'use client';

import React, { useEffect } from 'react';
import useModalStore from '@/lib/store/useModal';
import Menu from './components/Menu';
import Navbar from './components/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMenuOpen } = useModalStore();

  return (
    <>
      <Navbar />
      {isMenuOpen && <Menu />}
      {children}
    </>
  );
}

'use client';

import React from 'react';
import useModalStore from '@/lib/store/useModal';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Bottom from './components/Bottom';

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
      <Footer />
      <Bottom />
    </>
  );
}

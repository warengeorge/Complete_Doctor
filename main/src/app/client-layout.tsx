"use client";

import React from "react";
import useModalStore from "@/lib/store/ui/modal.store";
import Menu from "../components/layout/Menu";

import Footer from "../components/layout/Footer";
import Bottom from "../components/layout/Bottom";
import Navbar from "@/components/layout/Navbar";

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

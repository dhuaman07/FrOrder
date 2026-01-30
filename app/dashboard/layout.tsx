"use client";

import React, { useState } from 'react';
import { Navbar } from '@/src/presentation/shared/components/layout/Navbar';
import { Sidebar } from '@/src/presentation/shared/components/layout/Sidebar';
import { Footer } from '@/src/presentation/shared/components/layout/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
        {/* Sidebar */}
        <Sidebar 
          visible={sidebarVisible} 
          onToggle={() => setSidebarVisible(!sidebarVisible)} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar
            onMenuToggle={() => setSidebarVisible(!sidebarVisible)}
            sidebarVisible={sidebarVisible}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
  );
}
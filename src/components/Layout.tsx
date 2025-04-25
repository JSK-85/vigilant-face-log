
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white shadow-sm dark:bg-brand-dark border-t">
        <div className="container mx-auto px-4 py-3 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FaceLog Security System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

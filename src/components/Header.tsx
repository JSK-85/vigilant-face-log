
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { title: 'Dashboard', path: '/' },
    { title: 'Users', path: '/users' },
    { title: 'Logs', path: '/logs' },
    { title: 'Settings', path: '/settings' },
  ];

  return (
    <header className="bg-white shadow-sm dark:bg-brand-dark">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-brand-lightBlue flex items-center justify-center">
            <span className="text-white font-bold text-xl">FR</span>
          </div>
          <span className="text-xl font-bold text-brand-blue dark:text-white">FaceLog</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors hover:text-brand-lightBlue ${
                location.pathname === link.path ? 'text-brand-lightBlue' : 'text-gray-500'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-dark border-t dark:border-gray-800 animate-fade-in">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium py-2 px-4 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'bg-brand-lightBlue/10 text-brand-lightBlue'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

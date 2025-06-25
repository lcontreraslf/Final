import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, ShoppingCart, Key, Users, PlusCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const navItems: NavItem[] = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Comprar', path: '/comprar', icon: ShoppingCart },
    { name: 'Arrendar', path: '/arrendar', icon: Key },
    { name: 'Agentes', path: '/agentes', icon: Users },
    { name: 'Publicar', path: '/publicar', icon: PlusCircle },
  ];

  const handleNavClick = (path: string, name: string) => {
    if (path !== '/') {
      toast({
        title: "🚧 Esta función no está implementada aún",
        description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
        duration: 3000,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              ProPlus
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path, item.name)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                onClick={() => handleNavClick('/login', 'Login')}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Acceder
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-700"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      handleNavClick(item.path, item.name);
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              <Link
                to="/login"
                onClick={() => {
                  handleNavClick('/login', 'Login');
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Acceder</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
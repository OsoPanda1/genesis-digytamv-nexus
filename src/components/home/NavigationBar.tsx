/**
 * Navigation Bar - Barra de navegación inmersiva inteligente
 * Flotante, translúcida, adaptativa al contexto
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, Sparkles, GraduationCap, Music, Ticket,
  ShoppingBag, Shield, MessageCircle, Settings, Bell,
  Wallet, User, Menu, X, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
  highlight?: boolean;
}

const NavigationBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const mainItems: NavItem[] = [
    { id: 'home', icon: Home, label: 'Inicio', path: '/' },
    { id: 'community', icon: Users, label: 'Comunidad', path: '/community' },
    { id: 'dreamspaces', icon: Sparkles, label: 'XR', path: '/dreamspaces', highlight: true },
    { id: 'university', icon: GraduationCap, label: 'Universidad', path: '/university' },
    { id: 'music', icon: Music, label: 'Música', path: '/music' },
    { id: 'lottery', icon: Ticket, label: 'Lotería', path: '/lottery' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
    { id: 'governance', icon: Shield, label: 'Governance', path: '/governance' },
  ];

  const quickActions: NavItem[] = [
    { id: 'notifications', icon: Bell, label: 'Notificaciones', path: '/notifications', badge: 5 },
    { id: 'wallet', icon: Wallet, label: 'Wallet', path: '/wallet' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/chat' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/profile' },
    { id: 'settings', icon: Settings, label: 'Ajustes', path: '/settings' },
  ];

  // Control de visibilidad con scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsExpanded(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsExpanded(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="relative">
            {/* Barra principal */}
            <motion.div
              layout
              className="flex items-center gap-1 p-2 bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl shadow-black/20"
            >
              {/* Items principales */}
              {mainItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    } ${item.highlight ? 'ring-1 ring-cyan-400/50' : ''}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    
                    {/* Indicador de activo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      />
                    )}
                    
                    {/* Highlight glow */}
                    {item.highlight && (
                      <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-pulse pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}

              {/* Separador */}
              <div className="w-px h-8 bg-border/50 mx-1" />

              {/* Botón de expandir */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-10 w-10 rounded-xl"
              >
                {isExpanded ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </motion.div>

            {/* Panel expandido */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-3 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    {quickActions.map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigation(item.path)}
                        className="relative flex flex-col items-center justify-center p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] mt-1">{item.label}</span>
                        
                        {item.badge && item.badge > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Flecha */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 border-r border-b border-border/50 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicador de más contenido arriba */}
            {lastScrollY > 500 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute -top-12 left-1/2 -translate-x-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavigationBar;

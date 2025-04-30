
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="w-full bg-black/30 backdrop-blur-md border-b border-white/5 py-4 px-6 relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold tracking-tight text-gradient bg-gradient-crystal animate-text-shimmer">
            GÉNESIS
          </span>
          <span className="text-xl font-medium text-white/90">DIGYTAMV</span>
        </Link>
        
        <nav className="mt-4 sm:mt-0">
          <ul className="flex space-x-4 sm:space-x-6 items-center">
            <li>
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="/documentation" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Documentación
              </Link>
            </li>
            <li>
              <Link 
                to="/membership" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Membresía
              </Link>
            </li>
            <li>
              <a 
                href="https://orcid.org/0009-0008-5050-1539" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                ORCID
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Star, Coins } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      className="bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="text-3xl font-fredoka text-white"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ₹ FUNDay-Junior
            </motion.div>
            <motion.div 
              className="text-sm text-yellow-300 font-comic"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Where Money Meets Magic!
            </motion.div>
          </Link>

          {/* User Info & Navigation */}
          <div className="flex items-center space-x-4">
            {state.user && (
              <>
                {/* User Stats */}
                <div className="flex items-center space-x-4 bg-white/10 rounded-full px-4 py-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-white font-comic">{state.user.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-300 font-comic">₹</span>
                    <span className="text-white font-comic">{state.user.coins}</span>
                  </div>
                  <div className="text-xs text-yellow-300 font-comic">
                    Level: {state.user.level}
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-4">
                  <Link 
                    to="/modules" 
                    className={`px-3 py-2 rounded-full font-comic transition-colors ${
                      isActive('/modules') 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    📚 Learn
                  </Link>
                  <Link 
                    to="/games" 
                    className={`px-3 py-2 rounded-full font-comic transition-colors ${
                      isActive('/games') 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    🎮 Play
                  </Link>
                  <Link 
                    to="/books" 
                    className={`px-3 py-2 rounded-full font-comic transition-colors ${
                      isActive('/books') 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    📚 Books
                  </Link>
                  <Link 
                    to="/achievements" 
                    className={`px-3 py-2 rounded-full font-comic transition-colors ${
                      isActive('/achievements') 
                        ? 'bg-white text-primary-600' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    🏆 Achievements
                  </Link>
                  {state.user.isAdmin && (
                    <Link 
                      to="/admin" 
                      className={`px-3 py-2 rounded-full font-comic transition-colors ${
                        isActive('/admin') 
                          ? 'bg-white text-primary-600' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      ⚙️ Admin
                    </Link>
                  )}
                </nav>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{state.user.avatar}</div>
                  <div className="hidden sm:block text-white font-comic">
                    Hi, {state.user.username}!
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {!state.user && (
              <Link 
                to="/login"
                className="bg-yellow-400 text-primary-800 px-6 py-2 rounded-full font-comic font-bold hover:bg-yellow-300 transition-colors"
              >
                🚀 Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
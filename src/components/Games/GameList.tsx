import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const GameList = () => {
  const { state } = useApp();

  const handleGameClick = (gameUrl: string, gameIcon: string) => {
    window.open(gameUrl, '_blank', 'noopener,noreferrer');
    
    // Add special animation for the movie game
    if (gameIcon === '🎬') {
      // Create spotlight effect
      const spotlight = document.createElement('div');
      spotlight.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255,255,0,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        animation: spotlight 1s ease-out forwards;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spotlight {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(spotlight);
      
      setTimeout(() => {
        document.body.removeChild(spotlight);
        document.head.removeChild(style);
      }, 1000);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-green-400 to-green-500';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-red-500';
      default: return 'from-primary-400 to-primary-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-fredoka text-primary-600 mb-4">
          🎮 Game Zone
        </h1>
        <p className="text-xl font-comic text-gray-600">
          Learn through play! These games make financial education super fun!
        </p>
      </motion.div>

      {/* User Stats */}
      {state.user && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{state.user.avatar}</div>
              <div>
                <h3 className="text-xl font-fredoka text-gray-800">Ready to Play, {state.user.username}?</h3>
                <p className="font-comic text-gray-600">Let's earn some more coins and stars!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-fredoka text-yellow-500">{state.user.stars}</div>
                <div className="text-xs font-comic text-gray-500">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-fredoka text-primary-500">{state.user.coins}</div>
                <div className="text-xs font-comic text-gray-500">Coins</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {state.games.map((game, index) => (
          <motion.div
            key={game.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Game Header */}
            <div className={`bg-gradient-to-br ${getDifficultyColor(game.difficulty)} p-6`}>
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: game.icon === '🎬' ? [0, 5, -5, 0] : [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  style={{
                    filter: game.icon === '🎬' ? 'drop-shadow(0 0 10px rgba(255,255,0,0.5))' : 'none'
                  }}
                >
                  {game.icon}
                </motion.div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-comic">
                    {game.category}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-comic">
                    {game.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Game Content */}
            <div className="p-6">
              <h3 className="text-2xl font-fredoka text-gray-800 mb-3">
                {game.title}
              </h3>
              <p className="text-gray-600 font-comic mb-6 line-clamp-3">
                {game.description}
              </p>

              {/* Special highlight for new game */}
              {game.id === 'game-5' && (
                <div className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🆕</span>
                    <span className="font-comic text-yellow-700 font-bold">NEW GAME!</span>
                  </div>
                  <p className="text-sm font-comic text-yellow-600 mt-1">
                    Learn budget allocation and tradeoffs!
                  </p>
                </div>
              )}

              {/* Difficulty Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-comic text-gray-600">Difficulty:</span>
                  <span className={`text-sm font-comic font-bold ${
                    game.difficulty === 'Easy' ? 'text-green-600' :
                    game.difficulty === 'Medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getDifficultyColor(game.difficulty)} h-2 rounded-full`}
                    style={{
                      width: game.difficulty === 'Easy' ? '33%' : 
                             game.difficulty === 'Medium' ? '66%' : '100%'
                    }}
                  />
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => handleGameClick(game.url, game.icon)}
                className={`w-full text-white py-4 rounded-2xl font-fredoka text-lg transition-all shadow-lg flex items-center justify-center space-x-2 ${
                  game.icon === '🎬' 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-xl' 
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
                style={{
                  boxShadow: game.icon === '🎬' ? '0 4px 20px rgba(255,193,7,0.3)' : undefined
                }}
              >
                <span>🚀 Play Game</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ bounce: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💡
        </motion.div>
        <h3 className="text-2xl font-fredoka mb-4">Game Tips!</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-comic font-bold mb-2">Take Your Time</h4>
            <p className="text-sm font-comic">Read questions carefully and think before answering!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">🧠</div>
            <h4 className="font-comic font-bold mb-2">Apply What You Learned</h4>
            <p className="text-sm font-comic">Use knowledge from the learning modules!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-comic font-bold mb-2">Have Fun!</h4>
            <p className="text-sm font-comic">Remember, learning should be enjoyable!</p>
          </div>
        </div>
        
        {!state.user && (
          <div className="mt-8">
            <p className="font-comic text-lg mb-4">Want to track your game progress?</p>
            <a
              href="/login"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-fredoka hover:bg-gray-100 transition-colors"
            >
              🎯 Sign Up Now
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GameList;
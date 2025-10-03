import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, CheckCircle, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ModuleList = () => {
  const { state } = useApp();

  const getModuleStatus = (moduleId: number) => {
    if (!state.user) return 'locked';
    if (state.user.completedModules.includes(moduleId)) return 'completed';
    return 'available';
  };

  const getModuleIcon = (theme: string) => {
    const icons = {
      'Pet Adventure': '🐕',
      'Superhero World': '🦸',
      'Safari Adventure': '🦁',
      'Bridge Building': '🌉',
      'Medieval Kingdom': '👑'
    };
    return icons[theme as keyof typeof icons] || '📚';
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
          📚 Learning Modules
        </h1>
        <p className="text-xl font-comic text-gray-600">
          Discover the magical world of money through fun adventures!
        </p>
      </motion.div>

      {/* Progress Bar */}
      {state.user && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-fredoka text-gray-800">Your Progress</h3>
            <div className="text-lg font-comic text-primary-600">
              {state.user.completedModules.length}/5 Complete
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(state.user.completedModules.length / 5) * 100}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </motion.div>
      )}

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {state.modules.map((module, index) => {
          const status = getModuleStatus(module.id);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative ${isLocked ? 'opacity-75' : ''}`}
            >
              <div className={`bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl ${!isLocked ? 'hover:scale-105' : ''}`}>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {isCompleted && (
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  {isLocked && (
                    <div className="bg-gray-500 text-white p-2 rounded-full">
                      <Lock className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Module Header */}
                <div className={`p-6 ${getGradientForModule(module.theme)}`}>
                  <div className="text-center">
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {getModuleIcon(module.theme)}
                    </motion.div>
                    <h3 className="text-2xl font-fredoka text-white mb-2">
                      Module {module.id}
                    </h3>
                    <h4 className="text-xl font-comic text-white/90">
                      {module.title}
                    </h4>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <p className="text-gray-600 font-comic mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Concepts */}
                  <div className="mb-6">
                    <h5 className="text-sm font-comic font-bold text-gray-700 mb-2">
                      What you'll learn:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {module.concepts.slice(0, 2).map((concept, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-comic"
                        >
                          {concept}
                        </span>
                      ))}
                      {module.concepts.length > 2 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-comic">
                          +{module.concepts.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  {isCompleted && (
                    <div className="flex items-center mb-4">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-comic text-gray-600">
                        {module.stars} stars earned
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={isLocked ? '#' : `/module/${module.id}`}
                    className={`block w-full text-center py-3 rounded-2xl font-comic font-bold transition-colors ${
                      isLocked
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isCompleted
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    {isLocked ? (
                      <>🔒 Complete previous modules</>
                    ) : isCompleted ? (
                      <>🔄 Review Module</>
                    ) : (
                      <>🚀 Start Adventure</>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Help Section */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-center text-white"
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
        <h3 className="text-2xl font-fredoka mb-4">Need Help?</h3>
        <p className="font-comic text-lg mb-6">
          Complete modules in order to unlock new adventures! Each module has a fun video and quiz.
        </p>
        {!state.user && (
          <Link
            to="/login"
            className="bg-white text-orange-500 px-6 py-3 rounded-full font-fredoka hover:bg-gray-100 transition-colors"
          >
            🎯 Login to Start Learning
          </Link>
        )}
      </motion.div>
    </div>
  );
};

const getGradientForModule = (theme: string) => {
  const gradients = {
    'Pet Adventure': 'bg-gradient-to-br from-green-400 to-green-500',
    'Superhero World': 'bg-gradient-to-br from-blue-500 to-purple-600',
    'Safari Adventure': 'bg-gradient-to-br from-yellow-500 to-orange-600',
    'Bridge Building': 'bg-gradient-to-br from-teal-500 to-green-600',
    'Medieval Kingdom': 'bg-gradient-to-br from-purple-500 to-indigo-600'
  };
  return gradients[theme as keyof typeof gradients] || 'bg-gradient-to-br from-primary-500 to-primary-600';
};

export default ModuleList;
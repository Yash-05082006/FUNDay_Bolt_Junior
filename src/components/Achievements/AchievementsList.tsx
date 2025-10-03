import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AchievementsList = () => {
  const { state } = useApp();

  if (!state.user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-fredoka text-gray-600 mb-4">🔒 Login Required</h2>
        <p className="font-comic text-gray-500">Please log in to see your achievements!</p>
      </div>
    );
  }

  const earnedBadges = state.user.badges.filter(badge => badge.earned);
  const availableBadges = state.user.badges.filter(badge => !badge.earned);

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
          🏆 My Achievements
        </h1>
        <p className="text-xl font-comic text-gray-600">
          Look at all the amazing things you've accomplished!
        </p>
      </motion.div>

      {/* User Stats Overview */}
      <motion.div
        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 mb-12 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{state.user.avatar}</div>
            <div>
              <h2 className="text-2xl font-fredoka">{state.user.username}</h2>
              <p className="text-primary-100 font-comic">Level: {state.user.level}</p>
            </div>
          </div>
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <motion.div
              className="text-3xl font-fredoka mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {state.user.stars}
            </motion.div>
            <div className="text-sm font-comic text-primary-100">Total Stars</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-fredoka mb-1"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {state.user.coins}
            </motion.div>
            <div className="text-sm font-comic text-primary-100">Coins Earned</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-fredoka mb-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {state.user.completedModules.length}
            </motion.div>
            <div className="text-sm font-comic text-primary-100">Modules Done</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-fredoka mb-1"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {earnedBadges.length}
            </motion.div>
            <div className="text-sm font-comic text-primary-100">Badges Earned</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Journey */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-8 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-2xl font-fredoka text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-primary-600" />
          Your Learning Journey
        </h3>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-8 bottom-8 w-1 bg-gray-200"></div>
          <motion.div
            className="absolute left-6 top-8 w-1 bg-gradient-to-b from-primary-500 to-green-500"
            initial={{ height: 0 }}
            animate={{ height: `${(state.user.completedModules.length / 5) * 100}%` }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />

          {/* Journey Steps */}
          <div className="space-y-8">
            {[
              { step: 1, title: "Started Learning", completed: true, icon: "🎯" },
              { step: 2, title: "First Module Complete", completed: state.user.completedModules.length >= 1, icon: "📚" },
              { step: 3, title: "Quiz Master", completed: state.user.stars >= 20, icon: "🧠" },
              { step: 4, title: "Badge Collector", completed: earnedBadges.length >= 2, icon: "🏅" },
              { step: 5, title: "Finance Expert", completed: state.user.completedModules.length === 5, icon: "🌟" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 relative z-10 ${
                    item.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <span className="text-lg">{item.completed ? '✓' : item.icon}</span>
                </motion.div>
                <div>
                  <h4 className={`font-fredoka ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm font-comic ${item.completed ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.completed ? 'Completed!' : 'Keep going!'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Earned Badges */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-2xl font-fredoka text-gray-800 mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-500" />
          Earned Badges ({earnedBadges.length})
        </h3>
        
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-3"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {badge.icon}
                  </motion.div>
                  <h4 className="text-lg font-fredoka mb-2">{badge.name}</h4>
                  <p className="text-sm font-comic opacity-90">{badge.description}</p>
                  {badge.earnedAt && (
                    <p className="text-xs font-comic opacity-75 mt-2">
                      Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-3xl">
            <div className="text-4xl mb-4">🎯</div>
            <p className="font-comic text-gray-600">Complete modules and quizzes to earn your first badge!</p>
          </div>
        )}
      </motion.div>

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-2xl font-fredoka text-gray-800 mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-gray-400" />
            Badges to Earn ({availableBadges.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, borderColor: '#cbd5e1' }}
              >
                <div className="opacity-50">
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h4 className="text-lg font-fredoka text-gray-600 mb-2">{badge.name}</h4>
                  <p className="text-sm font-comic text-gray-500">{badge.description}</p>
                </div>
                <div className="mt-4 text-xs font-comic text-gray-400">
                  Keep learning to unlock!
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Motivation Section */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-8 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚀
        </motion.div>
        <h3 className="text-2xl font-fredoka mb-4">Keep Up the Great Work!</h3>
        <p className="font-comic text-lg mb-6">
          You're doing amazing! Every module you complete and every quiz you take makes you smarter about money.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/modules"
            className="bg-white text-green-600 px-6 py-3 rounded-full font-fredoka hover:bg-gray-100 transition-colors"
          >
            📚 Continue Learning
          </a>
          <a
            href="/games"
            className="bg-white/10 border-2 border-white text-white px-6 py-3 rounded-full font-fredoka hover:bg-white/20 transition-colors"
          >
            🎮 Play Games
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsList;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Trophy, HelpCircle, Shield, Book } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Homepage = () => {
  const { state } = useApp();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn Modules",
      description: "Fun videos and stories about money!",
      link: "/modules",
      emoji: "🎓",
      color: "from-green-400 to-green-500"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Play Games", 
      description: "Interactive games that teach finance!",
      link: "/games",
      emoji: "🎮",
      color: "from-orange-400 to-orange-500"
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Take Quizzes",
      description: "Test your knowledge and earn stars!",
      link: "/quiz",
      emoji: "❓",
      color: "from-purple-400 to-purple-500"
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Books to Read",
      description: "Fun-filled stories that teach you about money!",
      link: "/books",
      emoji: "📚",
      color: "from-pink-400 to-pink-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "My Achievements",
      description: "See your badges and progress!",
      link: "/achievements", 
      emoji: "🏆",
      color: "from-yellow-400 to-yellow-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-6xl md:text-8xl font-fredoka text-primary-600 mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ₹ FUNDay-Junior
        </motion.div>
        
        <motion.h2
          className="text-2xl md:text-4xl font-comic text-gray-700 mb-8"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Where Money Meets Magic! ✨
        </motion.h2>

        {state.user && (
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-3xl shadow-lg inline-block mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{state.user.avatar}</div>
              <div>
                <div className="text-xl font-comic">Welcome back, {state.user.username}!</div>
                <div className="text-sm opacity-90">
                  Level: {state.user.level} • ⭐ {state.user.stars} stars • ₹ {state.user.coins} coins
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={state.user ? feature.link : '/login'}>
              <div className={`bg-gradient-to-br ${feature.color} p-8 rounded-3xl shadow-lg text-white transform transition-all duration-300 hover:shadow-xl h-full`}>
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-4"
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
                    {feature.emoji}
                  </motion.div>
                  <h3 className="text-xl font-fredoka mb-2">{feature.title}</h3>
                  <p className="font-comic text-sm opacity-90">{feature.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Fun Stats Section */}
      {state.user && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-fredoka text-center mb-8 text-gray-800">
            🎯 Your Learning Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <motion.div
                className="text-4xl text-green-500 font-fredoka mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {state.user.completedModules.length}/5
              </motion.div>
              <div className="font-comic text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl text-yellow-500 font-fredoka mb-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.div>
              <div className="font-comic text-gray-600">{state.user.stars} Stars Earned</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl text-primary-500 font-fredoka mb-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {state.user.badges.filter(b => b.earned).length}
              </motion.div>
              <div className="font-comic text-gray-600">Badges Unlocked</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Call to Action for Non-logged Users */}
      {!state.user && (
        <motion.div
          className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 p-12 rounded-3xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ bounce: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀
          </motion.div>
          <h3 className="text-3xl font-fredoka text-white mb-4">Ready to Start Your Adventure?</h3>
          <p className="text-lg font-comic text-white/90 mb-8">
            Join thousands of kids learning about money the fun way!
          </p>
          <Link 
            to="/login"
            className="bg-white text-orange-500 px-8 py-4 rounded-full font-fredoka text-xl hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>🎯 Start Learning Now</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Homepage;
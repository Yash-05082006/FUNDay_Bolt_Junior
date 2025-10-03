import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowLeft, Star, Trophy, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Quiz from '../Quiz/Quiz';
import confetti from 'canvas-confetti';

const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showStoryline, setShowStoryline] = useState(true);

  const module = state.modules.find(m => m.id === parseInt(id || '0'));

  if (!module) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-fredoka text-gray-600">Module not found</h2>
      </div>
    );
  }

  const isCompleted = state.user?.completedModules.includes(module.id) || false;

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  const handleQuizComplete = (score: number, totalScore: number) => {
    const stars = Math.floor((score / totalScore) * 5);
    
    dispatch({ type: 'COMPLETE_MODULE', payload: { moduleId: module.id, stars } });
    
    // Award badges based on performance and module
    if (score === totalScore) {
      dispatch({ type: 'EARN_BADGE', payload: 'quiz-champ' });
    }
    
    // Module-specific badges
    if (module.id === 1) {
      dispatch({ type: 'EARN_BADGE', payload: 'insurance-expert' });
    } else if (module.id === 2) {
      dispatch({ type: 'EARN_BADGE', payload: 'investment-genius' });
    } else if (module.id === 3) {
      dispatch({ type: 'EARN_BADGE', payload: 'stock-safari-explorer' });
    } else if (module.id === 4) {
      dispatch({ type: 'EARN_BADGE', payload: 'bond-builder' });
    } else if (module.id === 5) {
      dispatch({ type: 'EARN_BADGE', payload: 'equity-knight' });
    }

    // Check if all modules completed for story master badge
    const completedCount = state.user?.completedModules.length || 0;
    if (completedCount + 1 === 5) {
      dispatch({ type: 'EARN_BADGE', payload: 'story-master' });
    }

    // Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setShowQuiz(false);
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

  const getGradientForModule = (theme: string) => {
    const gradients = {
      'Pet Adventure': 'from-green-400 to-green-500',
      'Superhero World': 'from-blue-500 to-purple-600',
      'Safari Adventure': 'from-yellow-500 to-orange-600',
      'Bridge Building': 'from-teal-500 to-green-600',
      'Medieval Kingdom': 'from-purple-500 to-indigo-600'
    };
    return gradients[theme as keyof typeof gradients] || 'from-primary-500 to-primary-600';
  };

  const getEmbedUrl = (url: string) => {
    // Convert Renderforest URLs to embeddable format
    if (url.includes('renderforest.com/watch-')) {
      const videoId = url.split('watch-')[1]?.split('?')[0];
      return `https://www.renderforest.com/embed/${videoId}`;
    }
    return url;
  };

  if (showQuiz) {
    return (
      <Quiz
        quiz={module.quiz}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
        moduleTitle={module.title}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/modules')}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-comic"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>
      </motion.div>

      {/* Module Header */}
      <motion.div
        className={`bg-gradient-to-br ${getGradientForModule(module.theme)} rounded-3xl p-8 mb-8 text-white text-center`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
        >
          {getModuleIcon(module.theme)}
        </motion.div>
        <h1 className="text-4xl font-fredoka mb-2">Module {module.id}</h1>
        <h2 className="text-2xl font-comic mb-4">{module.title}</h2>
        <p className="text-lg opacity-90">{module.description}</p>
        
        {isCompleted && (
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <span className="font-comic">Completed! {module.stars} stars earned</span>
          </div>
        )}
      </motion.div>

      {/* Storyline Section */}
      {showStoryline && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-fredoka text-gray-800 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-primary-600" />
              📖 Adventure Story
            </h3>
            <button
              onClick={() => setShowStoryline(false)}
              className="text-primary-600 hover:text-primary-700 font-comic text-sm"
            >
              Skip Story →
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-yellow-50 rounded-2xl p-6">
            <p className="font-comic text-gray-700 text-lg leading-relaxed">
              {module.storyline}
            </p>
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowStoryline(false)}
              className="bg-primary-500 text-white px-6 py-3 rounded-2xl font-comic hover:bg-primary-600 transition-colors"
            >
              🚀 Start Adventure!
            </button>
          </div>
        </motion.div>
      )}

      {/* Learning Concepts */}
      {!showStoryline && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-fredoka text-gray-800 mb-6">🎯 What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.concepts.map((concept, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 bg-primary-50 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <div className="text-2xl">💡</div>
                <span className="font-comic text-gray-700">{concept}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Educational Video Section */}
      {!showStoryline && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-fredoka text-gray-800 mb-6 flex items-center">
            <Play className="w-6 h-6 mr-2 text-primary-600" />
            🎬 Educational Video
          </h3>
          
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 text-center mb-6">
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎬
            </motion.div>
            <h4 className="text-xl font-fredoka text-gray-700 mb-2">Educational Video</h4>
            <p className="font-comic text-gray-600 mb-4">
              Watch the amazing story of {module.title}!
            </p>
            <a href={module.videoUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="bg-primary-500 text-white px-6 py-3 rounded-2xl font-comic hover:bg-primary-600 transition-colors"
                onClick={handleVideoEnd}
              >
                🎥 Watch Video
              </button>
            </a>
          </div>

          {videoWatched && (
            <motion.div
              className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-2xl mb-2">✅</div>
              <p className="font-comic text-green-700">Great job watching the video!</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Quiz Section */}
      {!showStoryline && (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-2xl font-fredoka text-gray-800 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            🧠 Test Your Knowledge
          </h3>
          
          <div className="text-center">
            {!videoWatched && !isCompleted ? (
              <div className="text-gray-500">
                <div className="text-4xl mb-4">🔒</div>
                <p className="font-comic">Watch the video first to unlock the quiz!</p>
              </div>
            ) : (
              <>
                <div className="text-4xl mb-4">🧠</div>
                <p className="font-comic text-gray-600 mb-6">
                  {isCompleted 
                    ? "You've already completed this quiz! Want to try again?"
                    : "Ready to test what you've learned? Let's see how much you remember!"
                  }
                </p>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
                  <p className="font-comic text-yellow-700 text-sm">
                    💡 This quiz has 5 questions with explanations to help you learn!
                  </p>
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-yellow-500 text-white px-8 py-4 rounded-2xl font-fredoka text-lg hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  {isCompleted ? '🔄 Retake Quiz' : '🚀 Start Quiz'}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleDetail;
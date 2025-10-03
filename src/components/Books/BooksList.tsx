import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

const BooksList = () => {
  const { state } = useApp();

  // Updated with correct Amazon URLs
  const books = [
    {
      id: 1,
      title: "One Cent, Two Cents, Old Cent, New Cent",
      author: "Dr. Seuss",
      emoji: "💰",
      whyRead: "Introduces kids to the history and concept of money in a fun rhyme.",
      color: "from-green-400 to-green-500",
      summaryUrl: "https://www.goodreads.com/book/show/245585.One_Cent_Two_Cents_Old_Cent_New_Cent",
      amazonUrl: "https://www.amazon.com/One-Cent-Two-Cents-Old/dp/0394800192"
    },
    {
      id: 2,
      title: "The Berenstain Bears' Trouble with Money",
      author: "Stan & Jan Berenstain",
      emoji: "🐻",
      whyRead: "Teaches the value of earning and saving through a relatable story.",
      color: "from-orange-400 to-orange-500",
      summaryUrl: "https://www.goodreads.com/book/show/134449.The_Berenstain_Bears_Trouble_with_Money",
      amazonUrl: "https://www.amazon.com/Berenstain-Bears-Trouble-Money-First/dp/0394859170"
    },
    {
      id: 3,
      title: "If You Made a Million",
      author: "David M. Schwartz",
      emoji: "🧮",
      whyRead: "Helps children understand saving, spending, and compound interest.",
      color: "from-purple-400 to-purple-500",
      summaryUrl: "https://www.goodreads.com/book/show/327795.If_You_Made_a_Million",
      amazonUrl: "https://www.amazon.com/You-Made-Million-David-Schwartz/dp/0688070175"
    },
    {
      id: 4,
      title: "Rock, Brock, and the Savings Shock",
      author: "Sheila Bair",
      emoji: "🐘",
      whyRead: "Shows the rewards of consistent saving in a story format.",
      color: "from-blue-400 to-blue-500",
      summaryUrl: "https://www.goodreads.com/book/show/2301257.Rock_Brock_and_the_Savings_Shock",
      amazonUrl: "https://www.amazon.com/Rock-Brock-Savings-Shock-Sheila/dp/0807570540"
    },
    {
      id: 5,
      title: "A Smart Girl's Guide: Money",
      author: "Nancy Holyoke",
      emoji: "📖",
      whyRead: "A comprehensive guide to understanding money management for young readers.",
      color: "from-pink-400 to-pink-500",
      summaryUrl: "https://www.goodreads.com/book/show/15997283-a-smart-girl-s-guide",
      amazonUrl: "https://www.amazon.com/Smart-Girls-Guide-Money-How/dp/1609580427"
    }
  ];

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
          📚 Books to Read
        </h1>
        <p className="text-xl font-comic text-gray-600">
          Fun-filled stories that teach you about money!
        </p>
      </motion.div>

      {/* User Welcome */}
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
                <h3 className="text-xl font-fredoka text-gray-800">Ready for Story Time, {state.user.username}?</h3>
                <p className="font-comic text-gray-600">Discover amazing books that make learning about money fun!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-fredoka text-yellow-500">{state.user.stars}</div>
                <div className="text-xs font-comic text-gray-500">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-fredoka text-primary-500">₹{state.user.coins}</div>
                <div className="text-xs font-comic text-gray-500">Coins</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Book Header */}
            <div className={`bg-gradient-to-br ${book.color} p-6`}>
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
                    delay: index * 0.3
                  }}
                >
                  {book.emoji}
                </motion.div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-comic mb-2">
                  Financial Literacy
                </div>
              </div>
            </div>

            {/* Book Content */}
            <div className="p-6">
              <h3 className="text-xl font-fredoka text-gray-800 mb-2 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm font-comic text-gray-600 mb-4">
                by {book.author}
              </p>

              {/* Why Read Section */}
              <div className="mb-6">
                <h4 className="text-sm font-comic font-bold text-gray-700 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  Why Read This?
                </h4>
                <p className="text-sm font-comic text-gray-600 leading-relaxed">
                  {book.whyRead}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a href={book.summaryUrl} target="_blank" rel="noopener noreferrer">
                  <button
                    className="w-full bg-primary-500 text-white py-3 rounded-2xl font-comic font-bold hover:bg-primary-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>📖 Read Summary</span>
                  </button>
                </a>
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                  <button
                    className="w-full bg-orange-500 text-white py-3 rounded-2xl font-comic font-bold hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>🛒 Buy on Amazon</span>
                  </button>
                </a>
              </div>

              {/* Age Recommendation */}
              <div className="mt-4 text-center">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-comic">
                  📅 Ages 8-15 • 🕒 15-20 min read
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reading Tips Section */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-center text-white mb-8"
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
        <h3 className="text-2xl font-fredoka mb-4">Reading Tips!</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-comic font-bold mb-2">Read Together</h4>
            <p className="text-sm font-comic">Ask your parents to read with you for more fun!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">🤔</div>
            <h4 className="font-comic font-bold mb-2">Ask Questions</h4>
            <p className="text-sm font-comic">Think about how the story relates to real life!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="text-2xl mb-2">✨</div>
            <h4 className="font-comic font-bold mb-2">Practice What You Learn</h4>
            <p className="text-sm font-comic">Try the money lessons in your daily life!</p>
          </div>
        </div>
        
        {!state.user && (
          <div className="mt-8">
            <p className="font-comic text-lg mb-4">Want to track your reading progress?</p>
            <a
              href="/login"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-fredoka hover:bg-gray-100 transition-colors"
            >
              📚 Sign Up Now
            </a>
          </div>
        )}
      </motion.div>

      {/* Benefits of Reading Section */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <h3 className="text-2xl font-fredoka text-gray-800 mb-6 text-center">
          🌟 Why Reading About Money is Super Important!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🧠</div>
            <div>
              <h4 className="font-fredoka text-gray-800 mb-2">Builds Smart Habits</h4>
              <p className="font-comic text-gray-600 text-sm">
                Stories help you remember important money lessons better than just facts!
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🎯</div>
            <div>
              <h4 className="font-fredoka text-gray-800 mb-2">Real-Life Examples</h4>
              <p className="font-comic text-gray-600 text-sm">
                See how characters solve money problems just like you might face!
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">👨‍👩‍👧‍👦</div>
            <div>
              <h4 className="font-fredoka text-gray-800 mb-2">Family Bonding</h4>
              <p className="font-comic text-gray-600 text-sm">
                Perfect for reading together and discussing money topics with family!
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🚀</div>
            <div>
              <h4 className="font-fredoka text-gray-800 mb-2">Future Success</h4>
              <p className="font-comic text-gray-600 text-sm">
                Early financial education leads to better money decisions as you grow up!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BooksList;
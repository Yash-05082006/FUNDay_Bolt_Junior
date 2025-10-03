import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

const avatars = ['🐻', '🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐸', '🐥', '🦄'];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    avatar: avatars[0]
  });
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login - in a real app, this would validate against Supabase backend
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        age: 12,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        coins: 100,
        stars: 0,
        level: 'Beginner' as const,
        completedModules: [],
        badges: [],
        isAdmin: formData.email.toLowerCase() === 'admin@funday.com',
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: 'SET_USER', payload: user });
      
      // Welcome celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      navigate('/');
    } else {
      // Sign up
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        age: parseInt(formData.age),
        avatar: formData.avatar,
        coins: 100,
        stars: 0,
        level: 'Beginner' as const,
        completedModules: [],
        badges: [],
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_USER', payload: user });
      dispatch({ type: 'SET_USER', payload: user });
      
      // Welcome celebration
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-yellow-100">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="text-5xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            💰
          </motion.div>
          <h1 className="text-3xl font-fredoka text-primary-600 mb-2">
            {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
          </h1>
          <p className="text-gray-600 font-comic">
            {isLogin ? 'Ready to continue learning?' : 'Create your account to start!'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-comic text-gray-700 mb-2">
              Enter your email:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-comic text-gray-700 mb-2">
              Create a password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic pr-12"
                placeholder="Make it secret!"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Age (Sign up only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-comic text-gray-700 mb-2">
                How old are you?
              </label>
              <select
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
                required
              >
                <option value="">Select your age</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i} value={i + 8}>{i + 8} years old</option>
                ))}
              </select>
            </div>
          )}

          {/* Avatar Selection (Sign up only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-comic text-gray-700 mb-2">
                Pick your avatar:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar })}
                    className={`p-3 rounded-2xl text-2xl transition-all ${
                      formData.avatar === avatar 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl font-fredoka text-lg hover:from-primary-600 hover:to-primary-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLogin ? '🚀 Start Learning!' : '✨ Create Account!'}
          </motion.button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-6">
          <p className="text-gray-600 font-comic">
            {isLogin ? "New to FUNDay-Junior?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-500 font-comic font-bold hover:text-primary-600 transition-colors"
          >
            {isLogin ? 'Sign up here!' : 'Login here!'}
          </button>
        </div>

        {/* Parental Note */}
        {!isLogin && (
          <motion.div
            className="mt-6 p-4 bg-yellow-50 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-gray-600 font-comic text-center">
              👨‍👩‍👧‍👦 Parents: By creating an account, you consent to your child's participation in our educational platform.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;

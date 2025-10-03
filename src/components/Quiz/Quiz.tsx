import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Star, Lightbulb } from 'lucide-react';
import { Quiz as QuizType, Question } from '../../types';
import confetti from 'canvas-confetti';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number, totalScore: number) => void;
  onBack: () => void;
  moduleTitle: string;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete, onBack, moduleTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questionResults, setQuestionResults] = useState<Record<string, boolean>>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const currentQ = quiz.questions[currentQuestion];
    const userAnswer = answers[currentQ.id];
    const isCorrect = Array.isArray(currentQ.correctAnswer)
      ? currentQ.correctAnswer.includes(userAnswer)
      : currentQ.correctAnswer === userAnswer;

    setQuestionResults(prev => ({ ...prev, [currentQ.id]: isCorrect }));
    setShowExplanation(true);

    // Small celebration for correct answers
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleContinue = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswers = 0;

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.includes(userAnswer)
        : question.correctAnswer === userAnswer;
      
      if (isCorrect) {
        totalScore += question.points;
        correctAnswers++;
      }
    });

    setScore(totalScore);
    setShowResult(true);

    // Big celebration for completing quiz
    if (correctAnswers === quiz.questions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleComplete = () => {
    onComplete(score, quiz.totalScore);
  };

  const currentQ = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const hasAnswered = answers[currentQ?.id];
  const isCorrect = questionResults[currentQ?.id];

  if (showResult) {
    const percentage = Math.round((score / quiz.totalScore) * 100);
    const stars = Math.floor((score / quiz.totalScore) * 5);

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: 3
            }}
          >
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '😅'}
          </motion.div>

          <h2 className="text-3xl font-fredoka text-gray-800 mb-4">
            Quiz Complete!
          </h2>

          <div className="mb-6">
            <div className="text-4xl font-fredoka text-primary-600 mb-2">
              {score}/{quiz.totalScore}
            </div>
            <div className="text-lg font-comic text-gray-600">
              {percentage}% Correct
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center mb-6">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Star 
                  className={`w-8 h-8 mx-1 ${
                    i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} 
                />
              </motion.div>
            ))}
          </div>

          {/* Performance Message */}
          <div className="mb-8">
            {percentage >= 80 ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                <div className="text-2xl mb-2">🌟</div>
                <p className="font-comic text-green-700">
                  Outstanding! You're a financial literacy superstar!
                </p>
              </div>
            ) : percentage >= 60 ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                <div className="text-2xl mb-2">👍</div>
                <p className="font-comic text-yellow-700">
                  Good job! You're getting the hang of it!
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                <div className="text-2xl mb-2">💪</div>
                <p className="font-comic text-blue-700">
                  Keep practicing! You're on your way to mastery!
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleComplete}
            className="bg-primary-500 text-white px-8 py-4 rounded-2xl font-fredoka text-lg hover:bg-primary-600 transition-colors shadow-lg"
          >
            🎯 Continue Learning!
          </button>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-comic"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Module</span>
        </button>
        <div className="text-sm font-comic text-gray-600">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        key={currentQuestion}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-fredoka text-gray-800 mb-4">
            {moduleTitle} Quiz
          </h2>
          <h3 className="text-xl font-comic text-gray-700 mb-6">
            {currentQ.question}
          </h3>
        </div>

        {/* Multiple Choice */}
        {currentQ.type === 'multiple-choice' && currentQ.options && (
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-2xl text-left font-comic transition-all ${
                  showExplanation
                    ? option === currentQ.correctAnswer
                      ? 'bg-green-500 text-white shadow-lg'
                      : answers[currentQ.id] === option && option !== currentQ.correctAnswer
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-500'
                    : answers[currentQ.id] === option
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={!showExplanation ? { scale: 1.02 } : {}}
                whileTap={!showExplanation ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showExplanation
                      ? option === currentQ.correctAnswer
                        ? 'border-white bg-white'
                        : answers[currentQ.id] === option && option !== currentQ.correctAnswer
                        ? 'border-white bg-white'
                        : 'border-gray-400'
                      : answers[currentQ.id] === option
                      ? 'border-white bg-white'
                      : 'border-gray-400'
                  }`}>
                    {showExplanation && option === currentQ.correctAnswer && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {showExplanation && answers[currentQ.id] === option && option !== currentQ.correctAnswer && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {!showExplanation && answers[currentQ.id] === option && (
                      <CheckCircle className="w-4 h-4 text-primary-500" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Drag Drop (Simplified as Multiple Choice) */}
        {currentQ.type === 'drag-drop' && currentQ.options && (
          <div className="space-y-4">
            <p className="text-sm font-comic text-gray-600 mb-4">
              Choose the best answer:
            </p>
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-2xl text-left font-comic transition-all ${
                  showExplanation
                    ? Array.isArray(currentQ.correctAnswer) 
                      ? currentQ.correctAnswer.some(correct => correct.includes(option))
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-500'
                      : 'bg-gray-100 text-gray-500'
                    : answers[currentQ.id] === option
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                whileHover={!showExplanation ? { scale: 1.02 } : {}}
                whileTap={!showExplanation ? { scale: 0.98 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && currentQ.explanation && (
          <motion.div
            className={`mt-6 p-4 rounded-2xl ${
              isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <Lightbulb className={`w-5 h-5 mt-1 ${isCorrect ? 'text-green-600' : 'text-blue-600'}`} />
              <div>
                <h4 className={`font-comic font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                  {isCorrect ? '🎉 Correct!' : '💡 Learn More:'}
                </h4>
                <p className={`font-comic ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-end mt-8">
          {!showExplanation ? (
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`px-8 py-3 rounded-2xl font-fredoka text-lg transition-colors ${
                hasAnswered
                  ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              ✨ Check Answer
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-fredoka text-lg hover:bg-primary-600 transition-colors shadow-lg"
            >
              {isLastQuestion ? '🏁 Finish Quiz' : '➡️ Next Question'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
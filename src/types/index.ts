export interface User {
  id: string;
  username: string;
  email?: string;
  age: number;
  avatar: string;
  coins: number;
  stars: number;
  level: 'Beginner' | 'Explorer' | 'Genius';
  completedModules: number[];
  badges: Badge[];
  isAdmin: boolean;
  createdAt: string;
  lastActive?: string;
  status?: 'active' | 'inactive' | 'suspended';
  quizAverage?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface Module {
  id: number;
  title: string;
  theme: string;
  description: string;
  storyline: string;
  videoUrl: string;
  concepts: string[];
  quiz: Quiz;
  completed: boolean;
  stars: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
  totalScore: number;
  userScore?: number;
  completed: boolean;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'drag-drop' | 'match-pairs';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
}

export interface AdminStats {
  totalUsers: number;
  activeModules: number;
  avgQuizScore: number;
  mostPlayedGame: string;
  totalStarsEarned: number;
}

export interface ForumPost {
  id: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'flagged';
  replies: number;
}

export interface AnalyticsData {
  quizScoreDistribution: { score: string; count: number }[];
  moduleCompletion: { module: string; completion: number }[];
  gameEngagement: { game: string; plays: number }[];
  averageTimeSpent: { period: string; time: number }[];
}
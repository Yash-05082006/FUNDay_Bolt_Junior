import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Module, Game, Achievement, Badge } from '../types';
import { modules, games, achievements, badges } from '../data/mockData';

interface AppState {
  user: User | null;
  users: User[];
  modules: Module[];
  games: Game[];
  achievements: Achievement[];
  badges: Badge[];
  isLoading: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'COMPLETE_MODULE'; payload: { moduleId: number; stars: number } }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  users: [],
  modules,
  games,
  achievements,
  badges,
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'UPDATE_USER':
      const updatedUser = state.user ? { ...state.user, ...action.payload } : null;
      return { ...state, user: updatedUser };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'COMPLETE_MODULE':
      if (!state.user) return state;
      const completedModules = [...state.user.completedModules];
      if (!completedModules.includes(action.payload.moduleId)) {
        completedModules.push(action.payload.moduleId);
      }
      const newStars = state.user.stars + action.payload.stars;
      const newCoins = state.user.coins + (action.payload.stars * 10);
      return {
        ...state,
        user: {
          ...state.user,
          completedModules,
          stars: newStars,
          coins: newCoins,
          level: newStars >= 50 ? 'Genius' : newStars >= 20 ? 'Explorer' : 'Beginner'
        }
      };
    case 'EARN_BADGE':
      if (!state.user) return state;
      const userBadges = [...state.user.badges];
      const badgeIndex = userBadges.findIndex(b => b.id === action.payload);
      if (badgeIndex !== -1) {
        userBadges[badgeIndex] = { ...userBadges[badgeIndex], earned: true, earnedAt: new Date().toISOString() };
      }
      return {
        ...state,
        user: { ...state.user, badges: userBadges }
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem('fundayJuniorUser');
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('fundayJuniorUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('fundayJuniorUser');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
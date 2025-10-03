import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Homepage from './components/Home/Homepage';
import Login from './components/Auth/Login';
import ModuleList from './components/Modules/ModuleList';
import ModuleDetail from './components/Modules/ModuleDetail';
import GameList from './components/Games/GameList';
import BooksList from './components/Books/BooksList';
import AchievementsList from './components/Achievements/AchievementsList';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="modules" element={<ModuleList />} />
            <Route path="module/:id" element={<ModuleDetail />} />
            <Route path="games" element={<GameList />} />
            <Route path="books" element={<BooksList />} />
            <Route path="achievements" element={<AchievementsList />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
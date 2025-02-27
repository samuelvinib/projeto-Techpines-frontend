import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MusicList from './components/Music/MusicList';
import MusicForm from './components/Music/MusicForm';
// import AdminDashboard from './components/Admin/AdminDashboard';
import ApprovalList from './components/Admin/ApprovalList';
import { isAuthenticated, isAdmin } from './utils/auth';
import Header from "./components/Header";

const App: React.FC = () => {
  return (
      <Router>
          <Header />
        <Routes>
          <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated() ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={<MusicList />} />
          <Route path="/music/create" element={isAuthenticated() ? <MusicForm /> : <Navigate to="/login" />} />
          <Route path="/admin/approval" element={isAdmin() ? <ApprovalList /> : <Navigate to="/" />} />
        </Routes>
      </Router>
  );
};

export default App;

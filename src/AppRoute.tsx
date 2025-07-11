import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layout/MainLayout';
import Login from './components/login/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/home/Home';
import UserSearch from './components/user/UserSearch';
import Contact from './components/contact/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>}>
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/search"
              element={<UserSearch />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
          </Route>
          {/* Add other protected routes here following the same pattern */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
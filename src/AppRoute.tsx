import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={
            <ProtectedRoute>
              <Layout />
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
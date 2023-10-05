import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Home from './pages/HomePage';
import GameDetails from './pages/GameDetails';
import Reviews from './pages/ReviewsPage';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  // If user is logged in previously on this browser, authorize them
  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={<RegistrationForm action="sign-up" />}
          />
          <Route path="/game-details" element={<GameDetails />} />
          <Route path="/login" />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

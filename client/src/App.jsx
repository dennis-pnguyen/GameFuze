import { useEffect, useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './pages/RegistrationForm';
import { Routes, Route } from 'react-router-dom';
import AppContext from './components/AppContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  // If user is logged in previously on this broswer, authorize them
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
        <Route path="/" element={<Header />}>
          <Route
            path="/register"
            element={<RegistrationForm action="sign-up" />}
          />
          <Route path="*" />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

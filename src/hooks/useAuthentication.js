import { useState } from 'react';

function useAuthentication() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
  };

  return { user, authenticated, login, logout };
}

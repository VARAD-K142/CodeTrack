import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import { setUnauthorizedHandler } from '../services/api.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('codetrack_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(clearAuth);
    return () => setUnauthorizedHandler(null);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('codetrack_token');
      if (storedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const { data } = await api.get('/auth/me');
          if (data.success) {
            setUser(data.user);
            setToken(storedToken);
          } else {
            clearAuth();
          }
        } catch {
          clearAuth();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('codetrack_token');
    localStorage.removeItem('codetrack_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('codetrack_token', data.token);
      localStorage.setItem('codetrack_user', JSON.stringify(data.user));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.success) {
      localStorage.setItem('codetrack_token', data.token);
      localStorage.setItem('codetrack_user', JSON.stringify(data.user));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  };

  const logout = () => {
    clearAuth();
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('codetrack_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

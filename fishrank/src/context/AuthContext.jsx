import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (authUser) => {
      try {
        setLoading(true);
        if (authUser) {
          setUser(authUser);
          const profile = await userService.getUserProfile(authUser.uid);
          if (!profile) {
            // Criar perfil se não existir
            const newProfile = await userService.createUserProfile(authUser.uid, {
              email: authUser.email,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
            });
            setUserProfile(newProfile);
          } else {
            setUserProfile(profile);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar perfil:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const authUser = await authService.loginWithEmail(email, password);
      const profile = await userService.getUserProfile(authUser.uid);
      setUserProfile(profile);
      return authUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password, displayName) => {
    try {
      setError(null);
      const authUser = await authService.registerWithEmail(email, password, displayName);
      const profile = await userService.createUserProfile(authUser.uid, {
        email,
        displayName,
      });
      setUserProfile(profile);
      return authUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const authUser = await authService.loginWithGoogle();
      let profile = await userService.getUserProfile(authUser.uid);
      if (!profile) {
        profile = await userService.createUserProfile(authUser.uid, {
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        });
      }
      setUserProfile(profile);
      return authUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (data) => {
    try {
      setError(null);
      if (user) {
        await userService.updateUserProfile(user.uid, data);
        const updatedProfile = await userService.getUserProfile(user.uid);
        setUserProfile(updatedProfile);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

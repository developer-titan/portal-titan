"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({
  token: null,
  identificacion: null,
  login: async () => {},
  logout: async () => {},
  loadingToken: true,
});

const STORAGE_KEYS = {
  token: "token",
  identificacion: "identificacion",
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [identificacion, setIdentificacion] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEYS.token);
      const storedIdentificacion = localStorage.getItem(STORAGE_KEYS.identificacion);

      if (storedToken) setToken(storedToken);
      if (storedIdentificacion) setIdentificacion(storedIdentificacion);
    } catch (e) {
      console.error("Error cargando datos del usuario:", e);
    } finally {
      setLoadingToken(false);
    }
  }, []);

  const login = async (cc, newToken) => {
    localStorage.setItem(STORAGE_KEYS.identificacion, cc);
    localStorage.setItem(STORAGE_KEYS.token, newToken);
    setIdentificacion(cc);
    setToken(newToken);
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.identificacion);
    setToken(null);
    setIdentificacion(null);
  };

  const value = useMemo(
    () => ({ token, identificacion, login, logout, loadingToken }),
    [token, identificacion, loadingToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

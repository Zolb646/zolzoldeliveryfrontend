"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async (localToken) => {
    try {
      const rawData = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + localToken,
          },
        }
      );
      const data = await rawData.json();
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        getUser(localToken);
      } else {
        setToken("no token");
        setLoading(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

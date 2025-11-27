"use client";

import { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async (localToken) => {
    try {
      const rawData = await fetch("http://localhost:8000/users/me", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localToken,
        },
      });
      const data = await rawData.json();
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        getUser(localToken);
        return setToken(localToken);
      }
      return setToken("no token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

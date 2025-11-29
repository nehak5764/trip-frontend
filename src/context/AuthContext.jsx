// import { createContext, useContext, useState, useEffect } from "react";
// import { connectSocket, disconnectSocket } from "../socket";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("token") || "");

//   // Manage socket & token sync
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//       connectSocket(token);
//     } else {
//       localStorage.removeItem("token");
//       disconnectSocket();
//     }
//   }, [token]);

//   // Sync user with localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken("");
//     disconnectSocket();
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
import { createContext, useContext, useState, useEffect } from "react";
import { connectSocket, disconnectSocket } from "../socket";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // 🧩 Manage socket & token sync
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      connectSocket(token);
    } else {
      localStorage.removeItem("token");
      disconnectSocket();
    }
  }, [token]);

  // 🧩 Sync user with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    disconnectSocket();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser, // ✅ Added this line
        setToken, // (optional, if you ever want to refresh tokens)
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

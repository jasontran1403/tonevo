import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Thêm state kiểm soát quá trình auth

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
    setIsAuthLoading(false); // Kết thúc quá trình auth khi token đã được lấy
  }, []);

  const updateAccessToken = (token) => {
    sessionStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  const clearAccessToken = () => {
    sessionStorage.removeItem("access_token");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, updateAccessToken, clearAccessToken, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

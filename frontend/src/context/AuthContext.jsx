import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Default import for decoding JWT
import axios from "axios"; // For making API calls

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the JWT
      const userId = decodedToken.id; // Get user ID from the token
      setIsAuthenticated(true);
      fetchUser(userId); // Fetch user using the decoded ID
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      // Assuming the response contains user data in the form of { username, email, etc. }
      setUser({
        ...response.data,
        profileImage: response.data.profileImage || "/default-profile.png",
        height: response.data.height || "N/A",
        weight: response.data.weight || "N/A",
        gender: response.data.gender || "N/A",
        age: response.data.age || "N/A",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const login = async (token) => {
    try {
      localStorage.setItem("jwttoken", token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      await fetchUser(userId); // Fetch user using the decoded ID
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to log in:", error);
      logout(); // Log out if login fails
    }
  };

  const logout = () => {
    localStorage.removeItem("jwttoken");
    setUser(null); // Clear user data
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

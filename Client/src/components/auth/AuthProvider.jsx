import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../api/userAuth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Stranger" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const { message, success, user } = await fetchMe();
        setUser(user);
        setLoggedIn(true);
      } catch (error) {
        setUser({ username: "Stranger" });
        setLoggedIn(false);
      }
    }
    getMe();
  }, [loggedIn]);

  console.log("user in context: ", user);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

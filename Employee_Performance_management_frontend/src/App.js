import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NAV from "./components/NAV";
import Home from "./components/pages/Home";
import getStart from "./components/pages/getStart";
import "./App.css";

import Login from "./login";
import Signup from "./signup";
import { auth } from "./firebase";
import aboutUs from "./components/aboutUs";
import Employee from "./Employee";

function App() {
  const [user, setUser] = useState(null); // Holds the user object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener on component unmount
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication status
  }

  return (
    <>
      <div className="App"></div>

      <Router>
        <NAV authenticated={!!user} logout={logout} />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/getStart" Component={getStart} />
          <Route path="/aboutUs" Component={aboutUs} />
          <Route path="/Employee" Component={Employee} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

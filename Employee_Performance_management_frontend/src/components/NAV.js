import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./fontawesome-free/css/all.css";
import "./NAV.css";
import { auth } from "../firebase";

function NAV() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check Firebase auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);  // Set the logged-in user to state
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Update user state after logout
      window.location.reload(); // Reload to clear any restricted views
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="title" onClick={closeMobileMenu}>
            VELOU VISION
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user && (
                <>
                  <li>
                    <button className="btn--outline2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link to="/aboutUs" className="title" onClick={closeMobileMenu}>
                      About
                    </Link>
                  </li>
                  {/* Only show Employee page link if user is admin */}
                  {user.email === "admin@gmail.com" && (
                      <li>
                        <Link to="/Employee" className="title" onClick={closeMobileMenu}>
                          Employee
                        </Link>
                      </li>
                  )}
                </>
            )}
          </ul>
        </div>
      </nav>
  );
}

export default NAV;

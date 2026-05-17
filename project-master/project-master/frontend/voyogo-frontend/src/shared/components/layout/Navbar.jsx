import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/anv.png";
import defaultAvatar from "../../assets/default-avatar.png";

import "../../styles/navbar.css";
import { getRoleFromToken } from "../../../utils/jwtUtils";
import { clearAuthStorage } from "../../../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const role = getRoleFromToken();
  const isAdmin = role === "ADMIN";
  const [dropdownOpen, setDropdownOpen] =
    useState(false);
  const [scrolled, setScrolled] =
    useState(false);
  const dropdownRef = useRef(null);
  const notifications = 3;

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );
    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handler
    );
    return () =>
      document.removeEventListener(
        "click",
        handler
      );
  }, []);

  const logout = () => {
    clearAuthStorage();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate(isAdmin ? "/admin" : "/");
  };

  return (
    <nav
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div
        className="navbar-left"
        onClick={handleLogoClick}
      >
        <img
          src={logo}
          className="logo"
          alt="Voyogo Logo"
        />
      </div>

      <div className="navbar-right desktop">
        <button
          className="nav-link"
          onClick={() => navigate("/about")}
        >
          About
        </button>

        <div className="notification">
          Bell
          {notifications > 0 && (
            <span className="badge">
              {notifications}
            </span>
          )}
        </div>

        <div
          className="help-icon"
          onClick={() => navigate("/help")}
        >
          ?
        </div>

        <div
          className="avatar-container"
          ref={dropdownRef}
        >
          <img
            src={defaultAvatar}
            className="avatar"
            alt="User Avatar"
            onClick={() =>
              setDropdownOpen((prev) => !prev)
            }
          />

          <div
            className={`dropdown-menu ${
              dropdownOpen ? "show" : ""
            }`}
          >
            <div
              className="dropdown-item"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </div>

            {!isAdmin && (
              <>
                <div
                  className="dropdown-item"
                  onClick={() =>
                    navigate("/booking-history")
                  }
                >
                  My Bookings
                </div>

                <div
                  className="dropdown-item"
                  onClick={() =>
                    navigate("/cancel-ticket")
                  }
                >
                  Cancel Ticket
                </div>
              </>
            )}

            {isAdmin && (
              <>
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/admin")}
                >
                  Admin Dashboard
                </div>

                <div
                  className="dropdown-item"
                  onClick={() =>
                    navigate("/admin/bookings")
                  }
                >
                  All Bookings
                </div>

                <div
                  className="dropdown-item"
                  onClick={() =>
                    navigate("/admin/trips")
                  }
                >
                  Manage Trips
                </div>
              </>
            )}

            <div className="divider" />

            <div
              className="dropdown-item logout"
              onClick={logout}
            >
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

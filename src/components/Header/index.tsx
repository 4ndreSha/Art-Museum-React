import React from "react";
import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@assets/museum-logo-dark.svg";
import home from "@assets/home.svg";
import bookmark from "@assets/bookmark.svg";

import "@components/Header/styles.scss";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <NavLink className="header__logo" to="/">
        <img src={logo} alt="Website logo" />
      </NavLink>
      <nav className="header__nav">
        {location.pathname !== "/" && (
          <NavLink to="/" className="header__nav-link">
            <img src={home} alt="Home icon" />
            <span>Home</span>
          </NavLink>
        )}
        <NavLink to="/favorites" className="header__nav-link">
          <img src={bookmark} alt="Bookmark icon" />
          <span>Your favorites</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

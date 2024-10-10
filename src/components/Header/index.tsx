import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@assets/museum-logo-dark.svg";
import home from "@assets/home.svg";
import bookmark from "@assets/bookmark.svg";

import "@components/Header/styles.scss";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (isOpen && !document.querySelector(".header__nav")?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isOpen]);

  return (
    <header className="header">
      <NavLink className="header__logo" to="/">
        <img src={logo} alt="Website logo" />
      </NavLink>
      <nav className="header__nav">
        <div className="burger-menu" role="button" onClick={toggleMenu}>
          <div className={`burger-menu__btn ${isOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {location.pathname !== "/" && (
            <NavLink to="/" className="header__nav-link" onClick={toggleMenu}>
              <img src={home} alt="Home icon" />
              <span>Home</span>
            </NavLink>
          )}
          <NavLink to="/favorites" className="header__nav-link" onClick={toggleMenu}>
            <img src={bookmark} alt="Bookmark icon" />
            <span>Your favorites</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;

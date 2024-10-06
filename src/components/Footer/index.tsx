import React from "react";
import museumLogo from "@assets/museum-logo-light.svg";
import modsenLogo from "@assets/modsen-logo.svg";
import { NavLink, useLocation } from "react-router-dom";

import "@components/Footer/index.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <NavLink className="footer__logo" to="/">
        <img src={museumLogo} alt="Museum logo" />
      </NavLink>

      <a className="footer__logo" href="https://www.modsen-software.com">
        <img src={modsenLogo} alt="Modsen logo" />
      </a>
    </footer>
  );
};

export default Footer;

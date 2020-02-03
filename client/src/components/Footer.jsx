import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  // TODO poner el footer en todas las paginas? Si es asi, arreglarlo en la dashboard
  return (
    <footer>
      <img src="/logo_white_new.png" alt=""></img>
      <Link to="/about-us">About us</Link>
      <Link to="/faq">FAQ</Link>
    </footer>
  );
};

export default Footer;

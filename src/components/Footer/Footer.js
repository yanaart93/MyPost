import React from "react";
import Logo from "../Logo/MyLogo";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__col">
        <Logo className="logo footer__logo" href="#" title="Логотип" />
      </div>
    </div>
  );
};

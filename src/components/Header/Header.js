import React from "react";
import "./Header.css";

export const Header = ({ children }) => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__wrapper">{children}</div>
      </div>
      <div className="info">
        У каждого котика отпечаток носа так же уникален, как и отпечатки пальцев
        у человека.
        <p> А что интересное сегодня узнал ты?</p>
      </div>
    </div>
  );
};

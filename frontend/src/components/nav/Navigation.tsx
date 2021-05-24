import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

export const Navigation: React.FC = () => {
  return (
    <nav className="header">
      <div className="header__inner">
        <div className="header__left">
          <NavLink to="/" className="header__link">
            ASKME
          </NavLink>
        </div>
        <div className="header__right">
          <NavLink to="/answerer" className="header__link">
            Start earning
          </NavLink>
          <NavLink to="/" className="header__link">
            Ask question
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

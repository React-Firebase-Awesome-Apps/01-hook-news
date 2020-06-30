import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src="/logo.png" alt="Hooks News Logo" className="logo" />
      <NavLink to="/" className="header-title">
        Hooks News
      </NavLink>
      <NavLink to="/" className="header-link">
        New
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/top" className="header-link">
        top
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/search" className="header-link">
        search
      </NavLink>
      <div className="divider">|</div>
      <NavLink to="/create" className="header-link">
        submit
      </NavLink>
      <div className="flex">
        <NavLink to="/login" className="header-link">
          login
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);

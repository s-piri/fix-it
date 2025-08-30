import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__bar container" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="nav__logo">FIX IT</div>
        <div className="nav__links">
          <Link to="/" className="subtle" style={{ textDecoration: "none" }}>Fix Now</Link>
          <a href="#" className="subtle" style={{ textDecoration: "none" }}>About ▾</a>
          <a href="#" className="subtle" style={{ textDecoration: "none" }}>Help</a>
          <button className="btn btn--primary">Sign In</button>
        </div>
      </div>
    </nav>
  );
}

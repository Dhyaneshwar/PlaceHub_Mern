import React from "react";
import { NavLink, useParams } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  const params = useParams();
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      <li>
        <NavLink to={`/${params.userid}/places`}>MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;

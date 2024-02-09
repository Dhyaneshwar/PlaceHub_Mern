import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import "./NavLinks.css";
import { connect } from "react-redux";
import { getIsLoggedInSelector } from "../../../redux/selectors/authSelector";
import { logOutAction } from "../../../redux/actions/authAction";
import Button from "../FormElements/Button";

const NavLinks = ({ isLoggedIn, logOut }) => {
  const navigate = useNavigate();
  const params = useParams();

  const logOutHandler = () => {
    logOut();
    navigate("/");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${params.userid}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button onClick={logOutHandler}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsLoggedInSelector(state),
  };
};

const mapDispatchToProps = {
  logOut: logOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavLinks);

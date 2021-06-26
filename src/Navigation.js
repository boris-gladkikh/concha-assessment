import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navigation.css";
import {useSelector, useDispatch} from 'react-redux';

//nav, renders login nav if user isn't present in store
//otherwise renders regular nav
function Navigation() {
  const user = useSelector(st => st.user);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSignOut() {
    dispatch({type: "LOGOUT"});
    history.push('/');

  }

  if (user) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink exact to="/audio">
              PLAYER
            </NavLink>
          </li>{" "}
          |
          <li>
            <NavLink exact to="/users">
              USERS
            </NavLink>
          </li>{" "}
          |
          <li>
            <NavLink onClick={handleSignOut} exact to="/">
              LOGOUT
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              LOGIN
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;

import { NavLink, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./NavBar.css";

function NavBar() {

  const location = useLocation();

  const currPath = location.pathname

  const NavBarData = [
    {name: 'About', to: '/about'},
    {name: 'Resume', to: '/resume'},
    {name: 'Gallery', to: '/gallery'}
  ]

  return (
    <div id="navbar-container">
      <Header />
      <div id="list-div">
        <ul id="navbar-list">
          {NavBarData.map((link, i) => {
            return (
              <li>
                <NavLink to={link.to} className={ currPath === link.to ? "navbar-option selected-option" : "navbar-option"}>{link.name}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

import React from 'react';
import { useUser } from '../../hooks/useUser';
import './Navigation.css';
import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, logOut } = useUser();

  const isAdmin = user?.role === "Admin";
  const isSeller = user?.role === "Seller";
  let navigate = useNavigate();

  function onLogOut() {
    logOut();
    navigate("/");
  }

  const activeClassName = "Nav-active";

  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        {user ? (<NavLink
          to="/main">
          <span id="logo-container" href="#" className="brand-logo">
            <span className="large material-icons" >book</span>
          </span>
        </NavLink>) :
          (<NavLink
            to="/login">
            <span id="logo-container" href="#" className="brand-logo">
              <span className="large material-icons" >book</span>
            </span>
          </NavLink>)}

        <ul>
          {isSeller || isAdmin ? (
            <>
              <li> <NavLink
                to="/add-book"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined}>
                Add Book
              </NavLink></li>
              <li>
                <NavLink
                  to="/my-books"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined}>
                  My Books
                </NavLink></li> 
                
            </>): undefined
          }
          {user && (
            <>
              <li> <NavLink
                to="/favorite-books"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined}>
                Favorite
              </NavLink></li>
            </>
          )}
          {
            isAdmin && <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined}>
                Users
              </NavLink></li>
          }
          {
            !user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined}>
                    Log In
                  </NavLink></li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined}>
                    Register
                  </NavLink></li>
              </>
            )
          }
        </ul>

        <ul className="right hide-on-med-and-down">
          {/* <li><a href="#" onClick={() => { setUserToEdit(user); navigate('/edit-user'); }}>{user?.username ?? "PLEASE REGISTER"}</a></li> */}
          {!!user && <li><a onClick={onLogOut} href="#">Log out</a></li>}
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><a href="#">Navbar Link</a></li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  )
}

export default Nav
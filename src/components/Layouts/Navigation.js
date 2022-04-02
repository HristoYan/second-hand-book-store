import React from 'react';
import { useUser } from '../../hooks/useUser';
import './Navigation.css';
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = ({ setUserToEdit, search, setSearch, books, setTitle }) => {
  const { user, logOut } = useUser();

  const isAdmin = user?.role === "Admin";
  const isSeller = user?.role === "Seller";
  let navigate = useNavigate();

  function onLogOut() {
    logOut();
    navigate("/");
  }

  function setUser() {
    setUserToEdit(user);
    navigate('/edit-user');
  }

  function searchTitle() {
    console.log(`Search: ${search}`);
    books.forEach(e => {
      console.log(e.title);
    });
    const booksTitle = books.map(b => (b.title).toLowerCase());
    if(!(booksTitle.includes(search.toLowerCase()))) {
      return <h3>Sorry We Don't Have The Book You Are Looking For!</h3>;
    }
    const index = booksTitle.indexOf(search.toLowerCase());
    console.log(`searched Book: ${JSON.stringify(books[index])}`);
    setTitle([books[index]]);
    document.getElementById('search').value = '';
    navigate("/title-check");
  }

  const activeClassName = "Nav-active";

  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        {user ? (<NavLink
          to="/">
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

            </>) : undefined
          }
          {user && (
            <>
              <li> <NavLink
                to="/favorites"
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

        {user ? (<NavLink
          to="/cart">
          <span id="logo-container" href="#" className="brand-logo">
            <span className="large material-icons" >shopping_cart</span>
          </span>
        </NavLink>) : undefined}

        <ul className="right hide-on-med-and-down">
          <li><a href='#'>
            {!!user && <> <input id='search' type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title" />
              <span id="logo-container" href="#" className="brand-logo">
                <span className="large material-icons" onClick={searchTitle}>search</span>
              </span>
            </>}
          </a></li>

          <li><a href='#' onClick={setUser}>{user?.username ?? "PLEASE REGISTER"}</a></li>
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

export default Navigation
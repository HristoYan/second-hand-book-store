import React from 'react';
import { useUser } from '../../hooks/useUser';
import './Navigation.css';
import { NavLink, useNavigate } from "react-router-dom";
import userApiClient from '../../services/user-api-client';
import orderApiClient from '../../services/order-api-client';

const Navigation = ({ setUserToEdit, search, setSearch, books, setTitle, setOrders }) => {
  const { user, logOut } = useUser();

  const isAdmin = user?.role === "Admin";
  const isSeller = user?.role === "Seller";
  let navigate = useNavigate();

  function onLogOut() {
    logOut();
    navigate("/");
  }

  async function setUser() {
    const userCorrect = await userApiClient.fetchUserById(user.id);
    setUserToEdit(userCorrect);
    navigate('/edit-user');
  }

  function searchTitle() {
    console.log(`Search: ${search}`);
    books.forEach(e => {
      console.log(e.title);
    });
    const booksTitle = books.map(b => (b.title).toLowerCase());
    if (!(booksTitle.includes(search.toLowerCase()))) {
      return <h3>Sorry We Don't Have The Book You Are Looking For!</h3>;
    }
    const index = booksTitle.indexOf(search.toLowerCase());
    console.log(`searched Book: ${JSON.stringify(books[index])}`);
    setTitle([books[index]]);
    document.getElementById('search').value = '';
    navigate("/title-check");
  }

  async function handleOrders() {
    console.log(`ORDERS:`, user.orders);
    const orders = await orderApiClient.fetchOrderByUserId(user.id);
    console.log(`orders>>>>>`, orders.orders);
    if (!orders) {
      noOrders();
    }
    setOrders(orders.orders);
    navigate('/orders')

  }

  const activeClassName = "Nav-active";

  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        {user ? (<NavLink
          to="/">
          <span href="#" className="brand-logo logo-container">
            <span id='book-icon' className="large material-icons" >book</span>
          </span>
        </NavLink>) :
          (<NavLink
            to="/login">
            <span href="#" className="brand-logo logo-container">
              <span id='book-icon' className="large material-icons" >book</span>
            </span>
          </NavLink>)}

        <ul>
          {isSeller || isAdmin ? (
            <>
              <li id='add_book'> <NavLink
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
                <span href="#" className="brand-logo logo-container">
                  <span className="large material-icons" >favorite</span>
                </span>
              </NavLink></li>
            </>
          )}
          {
            isAdmin && <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined}>
                <span id='face' href="#" className="brand-logo logo-container face">
                  <span className="large material-icons" >face</span>
                </span>
              </NavLink></li>
          }
          {
            !user && (
              <>
                <li id='loginLi'>
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
          to="/cart"
          className={({ isActive }) =>
            isActive ? activeClassName : undefined}>
          <span id='shopping_cart' href="#" className="brand-logo logo-container">
            <span className="large material-icons shoping_cart" >shopping_cart</span>
          </span>
        </NavLink>) : undefined}

        {user ? (<NavLink
          to="/?"
          className={({ isActive }) =>
            isActive ? activeClassName : undefined}>
          <span id='orders' href="#" className="brand-logo logo-container">
            <span className="large material-icons shoping_cart" onClick={handleOrders} >assignment</span>
          </span>
        </NavLink>) : undefined}

        <ul className="right hide-on-med-and-down">
          <li><a href='#'>
            {!!user && <> <input id='search' type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title" />
              <span href="#" className="brand-logo logo-container">
                <span id='search-btn' className="large material-icons" onClick={searchTitle}>search</span>
              </span>
            </>}
          </a></li>

          <li><a href='#' onClick={setUser}>{user?.username ?? undefined}</a></li>
          {!!user && <li><a onClick={onLogOut} href="#">Log out</a></li>}
        </ul>

      </div>
    </nav>
  )
}

export default Navigation

const noOrders = () => {
  return <h2>You Have No Orders Yet</h2>
}
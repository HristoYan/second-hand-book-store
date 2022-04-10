import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Layouts/Main';
import Navigation from './components/Layouts/Navigation';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import bookApiClient from './services/books-api-client';
import UserApi from './services/user-api-client';
import GBooks from './components/Layouts/GBooks';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RegisterForm } from './components/Forms/RegisterForm';
import { LogInForm } from './components/Forms/LogInForm';
import { Users } from './components/Users/Users';
import { EditUser } from './components/Users/EditUser';
import { AddBookForm } from './components/Forms/AddBookForm';
import { EditBookForm } from './components/Forms/EditBookForm';
import MyBooks from './components/Layouts/MyBooks';
import { GBookToSellForm } from './components/Forms/GBookToSellForm';
import Favorites from './components/Layouts/Favorites';
import { useUser } from './hooks/useUser';
import userApiClient from './services/user-api-client';
// import Cart from './components/Layouts/Cart';
import { SingleBookView } from './components/Layouts/SingleBookView';
import Titled from './components/Layouts/Titled';
import Loader from './components/utilities/Loader';
import OrdersView from './components/Layouts/OrdersView';
import OrderDetailes from './components/Layouts/OrderDetailes';

function App() {
  const [tags, setTags] = useState();
  const [gBooks, setGBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [userToEdit, setUserToEdit] = useState();
  const [bookToSell, setBookToSell] = useState();
  const [users, setUsers] = useState([]);
  const [favorite, setFavorite] = useState();
  const [cart, setCart] = useState([]);
  const [bookSelect, setBookSelect] = useState();
  const [title, setTitle] = useState();
  const [search, setSearch] = useState('');
  const [bookToEdit, setBookToEdit] = useState();
  const [comment, setComment] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderSelect, setOrderSelect] = useState([]);
  const [errors, setErrors] = useState();
  const [messages, setMessages] = useState();
  const { user } = useUser();

  const Cart = React.lazy(() => import("./components/Layouts/Cart"));

  useEffect(async () => {
    const userList = await userApiClient.fetchUsers();
    console.log(userList);
    setUsers(userList);
  }, [userToEdit]);

  const navigate = useNavigate();

  function clearMessagesAndErrors() {
    setErrors(undefined);
    setMessages(undefined);
  }
  console.log(favorite);

  useEffect(() => {
    bookApiClient.fetchBooksForSell()
      .then(results => {
        setBooks(results);
        clearMessagesAndErrors();
      })
      .catch(err => {
        setErrors(err);
      });
  }, [comment]);

  useEffect(() => {
    console.log(tags);
    bookApiClient.fetchBooksFromGoogleApi(tags)
      .then(results => {
        setGBooks(results.items);
        console.log(gBooks);
        clearMessagesAndErrors();
      })
      .catch(err => {
        setErrors(err);
      });
  }, [tags]);

  function editUser(user) {
    setUserToEdit(user);
    navigate(`/edit-user`);
  }

  async function deleteUser(userId) {
    await UserApi.deleteUser(userId);
  }

  function editBook(book) {
    setBookToEdit(book);
    navigate('/edit-book');
  }

  async function deleteBook(bookId) {
    bookApiClient.deleteBook(bookId);
    setBooks(books.filter(book => book.id !== bookId));

    setMessages(`Book deleted successfully`)
  }

  const handleSubmitBook = (Mode) => (book) => {
    if (Mode === 'add') {
      bookApiClient.postNewBook(book)
        .then(newBook => {
          setBooks([...books, newBook]);
          clearMessagesAndErrors();
          setMessages(`New Book created successfully: ${newBook.title}'`);
        }).catch(err => {
          clearMessagesAndErrors();
          setErrors(err);
        })
    } else if (Mode === 'edit') {
      bookApiClient.putUpdateBook(book)
        .then(edited => {
          setBooks(books.map(b => b.id === book.id ? book : b));
          clearMessagesAndErrors();
          setMessages(`Book editted successfully: ${edited.title}'`);
        }).catch(err => {
          clearMessagesAndErrors();
          setErrors(err);
        })
    }
  }

  function titleCheck (title) {
    console.log(`title: ${title}`);
    const theTitle = books.filter(book => book.title === title);
    console.log(`THE TITLE: ${theTitle}`);
    setTitle(theTitle)
    navigate('/title-check');
}

  console.log(`Titelet App: ${JSON.stringify(title)}`);

  return (
    <>
      <div className="App">
        <Navigation setUserToEdit={setUserToEdit} search={search} setSearch={setSearch} books={books} setTitle={setTitle} setOrders={setOrders} />
        <Header setTags={setTags} />

        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LogInForm />} />

          <Route path='/' element={<Main books={books} onBookSelect={setBookSelect} onDeleteBook={deleteBook} onEditBook={editBook} setFavorite={setFavorite} setCart={setCart} cart={cart} />} />
          <Route path='/explore' element={<GBooks books={gBooks} setBookToSell={setBookToSell} titleCheck={titleCheck} setMessage={setMessages} />} />
          <Route path='/users' element={<Users users={users} setUsers={setUsers} onEditUser={editUser} onDeleteUser={deleteUser} />} />
          <Route path='/edit-user' element={<EditUser user={userToEdit} />} />
          <Route path='/add-book' element={<AddBookForm onBookSubmit={handleSubmitBook("add")} />} />
          <Route path='/edit-book' element={<EditBookForm onBookSubmit={handleSubmitBook("edit")} initialValue={bookToEdit} />} />
          <Route path='/my-books' element={<MyBooks books={books} onDeleteBook={deleteBook} onEditBook={editBook} onBookSelect={setBookSelect}/>} />
          <Route path='/sell-gbook' element={<GBookToSellForm book={bookToSell} onBookSubmit={handleSubmitBook("add")} />} />
          <Route path='/favorites' element={<Favorites users={users} books={books} favorite={favorite} setCart={setCart} onBookSelect={setBookSelect} />} />

          <Route
            path='/cart'
            element={
              <React.Suspense fallback={<Loader />}>
                <Cart cart={cart} setCart={setCart} />
              </React.Suspense>
            }
          />
          <Route path='/book' element={<SingleBookView bookId={bookSelect} comment={comment} setComment={setComment}/>} />
          <Route path='/orders' element={<OrdersView orders={orders} setOrderSelect={setOrderSelect}/>} />
          <Route path='/order-detailes' element={<OrderDetailes orders={orderSelect} />} />
          <Route path='/title-check' element={<Titled title={title} onBookSelect={setBookSelect} setFavorite={setFavorite} setCart={setCart} cart={cart} />} />
          <Route path='/*' element={<h2>You Probably Lost Yourself</h2>} />

        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

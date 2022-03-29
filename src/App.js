import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Layouts/Main';
import Navigation from './components/Layouts/Navigation';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import BookApi from './services/books-api-client';
import UserApi from './services/user-api-client';
import GBooks from './components/Layouts/GBooks';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RegisterForm } from './components/Forms/RegisterForm';
import { LogInForm } from './components/Forms/LogInForm';
import { Users } from './components/Users/Users';
import { EditUser } from './components/Users/EditUser';
import { AddBookForm } from './components/Forms/AddBookForm';
import {EditBookForm} from './components/Forms/EditBookForm'

function App() {
  const [tags, setTags] = useState();
  const [gBooks, setGBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [userToEdit, setUserToEdit] = useState();
  const [bookToEdit, setBookToEdit] = useState();
  const [errors, setErrors] = useState();
  const [messages, setMessages] = useState();

  const navigate = useNavigate();

  function clearMessagesAndErrors() {
    setErrors = undefined;
    setMessages = undefined;
  }

  useEffect(() => {
    BookApi.fetchBooksForSell()
      .then(results => {
        setBooks(results);
        clearMessagesAndErrors();
      })
      .catch(err => {
        setErrors(err);
      });
  }, []);

  useEffect(() => {
    console.log(tags);
    BookApi.fetchBooksFromGoogleApi(tags)
      .then(results => {
        console.log(results);
        console.log(results.items);
        console.log(results.kind);
        console.log(results.totalItems);
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
    BookApi.deleteBook(bookId);
    setMessages(`Book deleted successfully`)
  }

  const handleSubmitBook = (Mode) => (book) => {
    if (Mode === 'add') {
      BookApi.postNewBook(book)
        .then(newBook => {
          setBooks([...books, newBook]);
          clearMessagesAndErrors();
          setMessages(`New Book created successfully: ${newBook.title}'`);
        }).catch(err => {
          clearMessagesAndErrors();
          setErrors(err);
        })
    } else if (Mode === 'edit') {
      BookApi.putUpdateBook(book)
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

  return (
    <>
      <div className="App">
        <Navigation />
        <Header setTags={setTags} />

        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LogInForm />} />

          <Route path='/' element={<Main books={books} onDeleteBook={deleteBook} onEditBook={editBook}/>} />
          <Route path='/explore' element={<GBooks books={gBooks} />} />
          <Route path='/users' element={<Users onEditUser={editUser} onDeleteUser={deleteUser} />} />
          <Route path='/edit-user' element={<EditUser user={userToEdit} />} />
          <Route path='/add-book' element={<AddBookForm onBookSubmit={handleSubmitBook("add")} />} />
          <Route path='/edit-book' element={<EditBookForm onBookSubmit={handleSubmitBook("edit")} />} />

        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

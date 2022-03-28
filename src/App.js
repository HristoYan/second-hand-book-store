import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Layouts/Main';
import Navigation from './components/Layouts/Navigation';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import BookApi from './services/books-api-client';
import GBooks from './components/Layouts/GBooks';
import { Route, Routes } from 'react-router-dom';
import { RegisterForm } from './components/Forms/RegisterForm';
import { LogInForm } from './components/Forms/LogInForm';

function App() {
  const [tags, setTags] = useState();
  const [gBooks, setGBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState();
  const [messages, setMessages] = useState();

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

  return (
    <>
      <div className="App">
        <Navigation />
        <Header setTags={setTags}/>

        <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LogInForm />} />

        <Route path='/' element={<Main books={books} />} />
        <Route path='/explore' element={<GBooks books={gBooks}/>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

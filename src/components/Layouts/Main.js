import React from 'react';
import BookList from './BooksList';
import '../utilities/styleH2.css';

const Main = ({books, onDeleteBook, onEditBook, setFavorite, setCart, cart }) => {
    return (
        <div className="container">
            <div className="section">
                <h2>Reading Time</h2>
                <div className="row">
                    <BookList  books={books} onDeleteBook={onDeleteBook} onEditBook={onEditBook} setFavorite={setFavorite} setCart={setCart} cart={cart}/>
                </div>
            </div>
        </div >
    )
}

export default Main

// onAddingFavorite={onAddingFavorite} onRecipeEdit={onRecipeEdit} onRecipeSelect={onRecipeSelect} recipes={myRecipes} deleteRecipe={deleteRecipe}
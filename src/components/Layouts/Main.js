import React from 'react';
import BookList from './BooksList'

const Main = ({books}) => {
    return (
        <div className="container">
            <div className="section">
                <h2 style={{ color: "#2196F3", margin: "50px" }}>Reading Time</h2>
                <div className="row">
                    <BookList  books={books}/>
                </div>
            </div>
        </div >
    )
}

export default Main

// onAddingFavorite={onAddingFavorite} onRecipeEdit={onRecipeEdit} onRecipeSelect={onRecipeSelect} recipes={myRecipes} deleteRecipe={deleteRecipe}
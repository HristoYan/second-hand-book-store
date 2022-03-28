import React from 'react';
import './BookCard.css'
const BookCards = ({ book }) => {
    return (
        <div className="card col s12 m4" style={{ height: "600px" }}>
            <div className="card-image waves-effect waves-block waves-light">
                <img className="Book-image activator responsive-img" src={book.imgUrl} alt="Book Picture" />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{book.title}<i className="material-icons right">more_vert</i></span>
                <p>Authors: {book.authors.join(', ')}</p>
                {/* <p><CommaSeparatedValues tags={recipe.tags} /></p> */}
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{book.title}<i className="material-icons right">close</i></span>
                <p>Published on: {book.year}</p>
                <div>
                        {book.description}
                </div>
            </div>
            <div>
                {/* <button className='navButon' onClick={onCookClick}>See More</button> */}
                {/* {user && <button className='navButon' onClick={() => onAddingFavorite(recipe)}>Favorite</button>}
        {(userId === recipe.authorId || user?.role === "Admin") && <div>
            <button className='navButon' onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            <button className='navButon' onClick={() => onRecipeEdit(recipe)}>Edit</button>
        </div>
        } */}
            </div>
        </div >
    )
}

export default BookCards
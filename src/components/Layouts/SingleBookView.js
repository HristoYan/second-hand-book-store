import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import RecipesApiClient from "../../services/books-api-client";
import Loader from "../utilities/Loader";
import '../utilities/styleH2.css';


export const SingleBookView = ({ bookId }) => {
    const [book, setBook] = useState();
    const {user} = useUser
    useEffect(async () => {
        const result = await RecipesApiClient.fetchBookById(bookId);
        setBook(result);
    }, [bookId]);

    console.log(`singleBook: ${book}`);
    console.log(`singleBook: ${bookId}`);

    if (!book) {
        return <Loader />;
    }

    const onCommentClick = () => {

    }

    return (
        <div className='detailes-container'>
            <h2>Book Detailes</h2>
            <div className='detailes-info'>
                <h3>{book.title}</h3>
                <p>Author(s): {book.authors}</p>

                <img src={book.imgUrl} width='500px' height={300} />
                <p>Price: {book.price}</p>
                <p>Condition: {book.condition}</p>
                <p >Description:
                        {book.description}
                </p>
            </div>
            {user && <button className='navButon' onClick={onCommentClick}>Comments</button>}

        </div>
    )
}

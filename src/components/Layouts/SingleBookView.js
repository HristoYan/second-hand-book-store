import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import BookApiClient from "../../services/books-api-client";
import { CommentForm } from "../Forms/CommentForm";
import Loader from "../utilities/Loader";
import '../utilities/styleH2.css';
import Comments from "./Comments";
import './SingleBookView.css';

export const SingleBookView = ({ bookId, comment, setComment }) => {
    const [book, setBook] = useState();
    const { user } = useUser
    useEffect(async () => {
        const result = await BookApiClient.fetchBookById(bookId);
        setBook(result);
    }, [bookId]);

    console.log(`singleBook: ${book}`);
    console.log(`singleBook: ${bookId}`);

    if (!book) {
        return <Loader />;
    }

    return (
        <div className='detailes-container'>
            <h2>Book Detailes</h2>
            <div className='grid-container'>
                <h3>{book.title}</h3>
                <div className="imgDiv">
                    <img id="img" src={book.imgUrl} />
                </div>
                <div className="information">
                    <div id="authorDiv">
                        <p className="card-title grey-text text-darken-4">Author(s): {book.authors}</p>
                        <p className="card-title grey-text text-darken-4">Publisher: {book.publisher}</p>
                    </div>
                    <div id="priceTag">
                        <p>Price: <strong>${book.price}</strong></p>
                    </div>
                    <p className="card-title grey-text text-darken-4">Condition: <strong>{book.condition}</strong> out of 5</p>
                </div>
                <div className="info">
                    <p className="card-title grey-text text-darken-4">Description: {`\t`}
                        {book.description}
                    </p>
                </div>
            </div>
            <div>
                <CommentForm book={book} comment={comment} setComment={setComment}/>
            </div>
            <div>
                <Comments book={book} />
            </div>
        </div>
    )
}

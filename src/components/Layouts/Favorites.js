import React, { useEffect, useState } from 'react';
import BookList from './BooksList';
import '../utilities/styleH2.css';
import { useUser } from '../../hooks/useUser';
import UserApi from '../../services/user-api-client';
import Loader from '../utilities/Loader';

const Favorites = ({ users, books, favorite, onDeleteBook, setCart }) => {
    console.log(books);
    const { user } = useUser();
    const [favBooks, setFavBooks] = useState([]);

    let booksId = books.map(el => el.id);
    const oldUserInfo = users.filter(u => u.id === user.id);
    const filteredFav = (oldUserInfo[0].favorite).filter(e => booksId.includes(e));

    if (!!favorite) {
        if (!filteredFav.includes(favorite)) {
            filteredFav.push(favorite);
        }
    }

    console.log(`FavBooksId: ${filteredFav}`);

    let resultedBooks = [];

    for (const favId of filteredFav) {
        const temp = books.filter(book => book.id === favId);
        resultedBooks.push(temp[0]);
    }

    useEffect(async () => {
        const newUser = {
            ...oldUserInfo,
            favorite: resultedBooks
        }
        if (!!newUser) {
            UserApi.putUpdateUser(newUser);
        }
        if (resultedBooks) {
            setFavBooks(resultedBooks);
        }
    }, [favorite]);


    console.log(`FavBooks: ${JSON.stringify(resultedBooks)}`);

    return (
        <>
            {!!(favBooks) ? <div className="container">
                <div className="section">
                    <h2>Your Favorite Books</h2>
                    <div className="row">
                        <BookList books={favBooks} onDeleteBook={onDeleteBook} setCart={setCart} />
                    </div>
                </div>
            </div > : <h2>Nothing in  Favorites yet!</h2>}
        </>
    )
}

export default Favorites;

// useEffect(async() => {
//     const userInfo = await UserApi.fetchUserById(user.id);
//     console.log(userInfo.favorite);
//     setOldUser(userInfo.favorite);

// }, [favorite])


// const oldUserInfo = users.filter(u => u.id === user.id);
// console.log(`OldUser:${oldUserInfo[0]}`);
// setOldUser(oldUserInfo[0].favorite);
// console.log(`OldUserfav:${oldUserInfo[0].favorite}`);

// let booksId = books.map(el => el.id);
// console.log(booksId);
// console.log(favorite);

// useEffect(async () => {
//     let filtered;
//     if (oldUser) {
//         filtered = (oldUser).filter(e => booksId.includes(e));
//         if (!(filtered.includes(favorite))) {
//             console.log(`book pushed in array!`);
//             filtered.push(favorite);
//         }
//     } else {
//         console.log(`book created!`);

//         filtered.push(favorite);
//     }

//     // if(!filtered) {
//     //     console.log(`book created!`);

//     //     filtered.push(favorite);
//     // } else {
//     //     console.log(`book already exist!`);
//     //     return filtered;
//     // }

//     console.log(filtered);
//     const userObj = {
//         ...user,
//         favorite: filtered
//     };
//     const updatedUser = await UserApi.putUpdateUser(userObj);
//     console.log(updatedUser.favorite);
//     setFavBooksId(updatedUser.favorite);
// }, [favorite]);

// if (!favBooksId) {
//     return <Loader />;
// }

// console.log(`fvaBooksId${favBooksId}`);

// let resultedBooks = [];

// for (const favId of favBooksId) {
//     const temp = books.filter(book => book.id === favId);
//     resultedBooks.push(temp)
// }

// console.log(resultedBooks);
// let favBooks = [];
// for (let i = 0; i < resultedBooks.length; i++) {
//     favBooks.push(resultedBooks[i][0])

// }

// console.log(favBooks);
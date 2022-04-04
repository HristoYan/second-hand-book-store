import BookCards from "./BookCards";
import FavoriteCards from "./FavoriteCard";

const FavoriteList = ({ books, onDeleteBook, onEditBook, setFavorite, setCart, cart, onBookSelect, userInfo }) => {
    console.log(cart);
    return (
        <div className="BookList-items">
            {
                books?.map(book => (<FavoriteCards  book={book} key={book.id} onBookSelect={onBookSelect} userInfo={userInfo} onDeleteBook={onDeleteBook} onEditBook={onEditBook} setFavorite={setFavorite} setCart={setCart} cart={cart}/>))
            }
        </div>
    );
}

export default FavoriteList;
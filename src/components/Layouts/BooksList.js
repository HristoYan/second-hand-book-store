import BookCards from "./BookCards";

const BookList = ({ books, onDeleteBook, onEditBook, setFavorite, setCart, cart }) => {
    console.log(cart);
    return (
        <div className="BookList-items">
            {
                books?.map(book => (<BookCards  book={book} key={book.id} onDeleteBook={onDeleteBook} onEditBook={onEditBook} setFavorite={setFavorite} setCart={setCart} cart={cart}/>))
            }
        </div>
    );
}

export default BookList;
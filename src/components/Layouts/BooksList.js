import BookCards from "./BookCards";

const BookList = ({ books }) => {
    // onAddingFavorite, recipes, onRecipeSelect, onRecipeEdit, ...rest
    return (
        <div className="BookList-items">
            {
                books.map(book => (<BookCards  book={book} key={book.bookId}/>))
            }
        </div>
    );
}

export default BookList;
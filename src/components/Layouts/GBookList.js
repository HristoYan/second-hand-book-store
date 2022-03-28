import GBookCards from "./GBookCards";

const GBookList = ({ books }) => {
    // onAddingFavorite, recipes, onRecipeSelect, onRecipeEdit, ...rest
    return (
        <div className="BookList-items">
            {
                books.map(book => (<GBookCards  book={book} key={book.id}/>))
            }
        </div>
    );
}

export default GBookList;
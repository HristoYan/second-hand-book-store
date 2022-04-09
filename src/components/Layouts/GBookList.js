import GBookCards from "./GBookCards";

const GBookList = ({ books, setBookToSell, titleCheck, setMessage }) => {

   
    return (
        <div className="BookList-items">
            {
                books.map(book => (<GBookCards  book={book} key={book.id} setBookToSell={setBookToSell} titleCheck={titleCheck} setMessage={setMessage}/>))
            }
        </div>
    );
}

export default GBookList;
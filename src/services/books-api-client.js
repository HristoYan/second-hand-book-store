
const BOOKS_API_BASE_URL = 'http://localhost:8080/api';

class BooksApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }

    async fetchBooksFromGoogleApi(tags) {
        if(tags.split(',')){
            tags.split(',').map(tag=>tag.trim()).join('+');
        }
        console.log(tags);
        return this.handleResponse(async () => fetch(`https://www.googleapis.com/books/v1/volumes?q=${tags}`));
    }

    async fetchBooksForSell() {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books`));
    }

    async fetchBookById(bookId) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${bookId}`));
    }

    async postNewBook(book) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(book)
        }));
    }

    
    async putUpdateBook(book) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${book.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(book)
        }));
    }
    
    async deleteBook(bookId) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${bookId}`, {
            method: 'DELETE',
        }));
    }

    // async favoriteRecipes() {
    //     return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/favorite`));
    // }

    // async fetchFavoriteById(recipeId) {
    //     return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/favorite/${recipeId}`));
    // }
    
    // async postFavoriteRecipe(recipe) {
    //     return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/favorite`, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST',
    //         body: JSON.stringify(recipe)
    //     }));
    // }

    // async deleteFavorite(recipeId) {
    //     return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/favorite/${recipeId}`, {
    //         method: 'DELETE',
    //     }));
    // }

    async handleResponse(asyncRequestFunc) {
        try {
            const resp = await asyncRequestFunc();
            const content = await resp.json();

            if (resp.status < 400) {
                // console.log(`Content fetched: ${JSON.stringify(content)}`);
                // console.log(content[0].title);
                return content;
            } else {
                // console.log(`HTTP Error ${resp.status}: ${JSON.stringify(resp)}\n${JSON.stringify(content)}`);
                return Promise.reject(`Error performing HTTP request: ${resp.status}: ${JSON.stringify(resp)}`);
            }
        } catch (err) {
            // console.error(`HTTP Error performing request: ${err}`);
            return Promise.reject(`Error performing HTTP request: ${err}`);
        }
    }
}

export default new BooksApiClient(BOOKS_API_BASE_URL);
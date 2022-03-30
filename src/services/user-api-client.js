
export const USERS_API_BASE_URL = 'http://localhost:8080/api';

class UsersApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }

    async fetchUsers() {
        return this.handleResponse(async () => fetch(USERS_API_BASE_URL + '/users'));
    }

    async fetchUserById(userId) {
        return this.handleResponse(async () => fetch(USERS_API_BASE_URL + `/users/${userId}`));
    }

    async postNewUser(user) {
        return this.handleResponse(async () => fetch(USERS_API_BASE_URL + '/users', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }));
    }

    async deleteUser(userId) {
        return this.handleResponse(async () => fetch(`${USERS_API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        }));
    }

    async putUpdateUser(user) {
        return this.handleResponse(async () => fetch(USERS_API_BASE_URL + '/users/' + user.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(user)
        }));
    }


    async handleResponse(asyncRequestFunc) {
        try {
            const resp = await asyncRequestFunc();
            const content = await resp.json();
            if (resp.status < 400) {
                // console.log(`Content fetched: ${JSON.stringify(content)}`);
                // console.log(content[0].name);
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

export default new UsersApiClient(USERS_API_BASE_URL);
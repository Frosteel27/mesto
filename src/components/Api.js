export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.token;
    }

    _processResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers: {authorization: this._token}})
            .then(res => this._processResponse(res))
            .catch(err => {console.log(err)})
    }

    getInintialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: {authorization: this._token}})
            .then(res => this._processResponse(res))
            .catch(err => {console.log(err)})
    }

    setUserInfo(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {authorization: this._token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        })
            .then(res => {this._processResponse(res)})
            .catch(err => {console.log(err)})
    }

    setUserAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {authorization: this._token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {this._processResponse(res)})
            .catch(err => {console.log(err)})
    }

    uploadCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {authorization: this._token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(res => this._processResponse(res))
            .catch(err => {console.log(err)})
    }

    deleteCard(card) {
        return fetch (`${this._baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: {authorization: this._token}
            })
            .then(res => {this._processResponse(res)})
            .catch(err => {console.log(err)})
    }

    putLike(card) {
        return fetch (`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'PUT',
            headers: {authorization: this._token}
        })
            .then(res => this._processResponse(res))
            .catch(err => {console.log(err)})
    }

    deleteLike(card) {
        return fetch (`${this._baseUrl}/cards/${card._id}/likes`, {
            method: 'DELETE',
            headers: {authorization: this._token}
        })
            .then(res => this._processResponse(res))
            .catch(err => {console.log(err)})
    }
}
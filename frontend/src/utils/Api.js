class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,

    })
      .then((res) => this._getResponseData(res))
  }
  addNewCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then((res) => this._getResponseData(res))
  }
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res))
  }
  addNewUserInfo(userInfo) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then((res) => this._getResponseData(res))

  }
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,

    })
      .then((res) => this._getResponseData(res))
  }
  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then((res) => this._getResponseData(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: "PUT",
        credentials: 'include',
        headers: this._headers,
      })
        .then((res) => this._getResponseData(res))
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers,
      })
        .then((res) => this._getResponseData(res))
    }
  }
}

const api = new Api({
  url: 'http://localhost:4000/',
  headers: {
    // authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});
export default api;
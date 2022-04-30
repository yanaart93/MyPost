import { config } from "./config";

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  getPosts(postID) {
    const requestUrl = postID ? `${this._url}/posts/${postID}` : `${this._url}/posts/`
    return fetch(requestUrl, {
        headers: {
            authorization: `Bearer ${this._token}`,
        },
    }).then(onResponse)
}

  addPost(post) {
    return fetch(`${this._url}/posts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(onResponse);
  }

  deletePost(postID) {
    return fetch(`${this._url}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponse);
  }
  
  getUserById(userID) {
    const requestUrl = userID ? `${this._url}/users/${userID}` : `${this._url}/users/`
    return fetch(requestUrl, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${this._token}`,
        },
    }).then(onResponse)
  }

  addLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponse);
  }

  deleteLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(onResponse);
  }
}

export default new Api(config);

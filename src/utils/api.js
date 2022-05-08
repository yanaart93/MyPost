import { config } from './config'

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
}

class Api {
    constructor({ url, token }) {
        this._url = url
        this._token = token
    }

    getPosts(postID) {
        const requestUrl = postID ? `${this._url}/posts/${postID}` : `${this._url}/posts/`
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    editAvatarUser(updateAvatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateAvatar),
        }).then(onResponse);
    }

    addPost(post) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        }).then(onResponse)
    }

    deletePost(postID) {
        return fetch(`${this._url}/posts/${postID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    editCurentUser(updatedUserInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo),
        }).then(onResponse);
    }

    addLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    deleteLike(itemID) {
        return fetch(`${this._url}/posts/likes/${itemID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    getCommentPost(itemID) {
        return fetch(`${this._url}/posts/comments/${itemID}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    editPost(itemID, editItem) {
        return fetch(`${this._url}/posts/${itemID}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editItem),
        }).then(onResponse)
    }

    addComments(itemID, comments) {
        return fetch(`${this._url}/posts/comments/${itemID}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comments),
        }).then(onResponse)
    }

    deleteComments(itemID, commentID) {
        return fetch(`${this._url}/posts/comments/${itemID}/${commentID}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse)
    }

    getInfoUser() {
      return fetch(`${this._url}/users/me`, {
          headers: {
              authorization: `Bearer ${this._token}`,
          },
      }).then(onResponse)
  }
  
  signUp(userData) {
      return fetch(`${this._url}/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(onResponse);
    }
    
    signIn(userData) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(onResponse);
    }
}

export default Api

export const url = 'https://api.mesto-project.nomoreparties.co';
const { JWT_SECRET } = process.env;

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
export const registr = (email, password) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then((res) => getResponseData(res))
}
export const authorize = (email, password) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then((res) => getResponseData(res))
}

export const checkToken = () => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },

  })
    .then((res) => getResponseData(res))
}
export const logout = () => {
  return fetch(`${url}/users/me`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => getResponseData(res))
}
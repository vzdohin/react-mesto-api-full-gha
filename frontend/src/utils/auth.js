export const url='https://auth.nomoreparties.co';

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
    body: JSON.stringify({email, password})
  })
  .then((res)=> getResponseData(res))
}
export const authorize = (email, password) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then((res)=> getResponseData(res))
}
export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    // body: JSON.stringify({email, password})
  })
  .then((res)=> getResponseData(res))
}
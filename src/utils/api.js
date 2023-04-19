import { getCookie } from "./cookie";

const burgerProjectUrl = "https://norma.nomoreparties.space/api";

function getResponseData(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function getIngredients() {
  return fetch(`${burgerProjectUrl}/ingredients`).then(getResponseData);
}

export const getOrder = (ids) => {
  return fetch(`${burgerProjectUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  }).then(getResponseData);
};

export const registerUser =(res) => {
  return fetch(`${burgerProjectUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}


export const getUser =() => {
  return fetch(`${burgerProjectUrl}/auth/user`, {
    method: "POST",
    headers: {
     authorization: getCookie('accessToken')
    }
})
}

export const loginUser =(res) => {
  return fetch(`${burgerProjectUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}

export const logoutUser =(res) => {
  return fetch(`${burgerProjectUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
  }).then(getResponseData)
  .then(res => {
    if (res?.success) return res;
    return Promise.reject(res);
  })
}

export const updateToken   =(res) => {
  return fetch(`${burgerProjectUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}
export const updateInfoUser =(res) => {
  const token = getCookie('token');
  return fetch(`${burgerProjectUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}
export const getInfoUser =(res) => {
  return fetch(`${burgerProjectUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${res}`,
    }
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
});
}

export const forgotPsw   =(res) => {
  return fetch(`${burgerProjectUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}

export const resetPsw   =(res) => {
  return fetch(`${burgerProjectUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
}).then(getResponseData)
.then(res => {
  if (res?.success) return res;
  return Promise.reject(res);
})
}


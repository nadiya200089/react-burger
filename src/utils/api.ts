import { getCookie } from "./cookie";
import { IRegisterData, IUserData, ILogout, IUpdateToken, IForgotPassword, IResetPassword } from '../types';
const burgerProjectUrl = "https://norma.nomoreparties.space/api";

function getResponseData(res: Response) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function getIngredients() {
  return fetch(`${burgerProjectUrl}/ingredients`).then(getResponseData);
}

export const getOrder = (ids: number[]) => {
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


export const registerUser = (res: IRegisterData) => {
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


export const getUser = () => {
  return fetch(`${burgerProjectUrl}/auth/user`, {
    method: "POST",
    headers: {
      authorization: String(getCookie('accessToken'))
    }
  })
}

export const loginUser = (res: IUserData) => {
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

export const logoutUser = (res: ILogout) => {
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

export const updateToken = (res:IUpdateToken) => {
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
export const updateInfoUser = (res: IUserData) => {
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
export const getInfoUser = (res: IRegisterData) => {
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

export const forgotPsw = (res: IForgotPassword) => {
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

export const resetPsw = (res: IResetPassword) => {
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
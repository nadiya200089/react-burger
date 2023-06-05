import { getCookie } from "./cookie";
import { IRegisterData, IUserData, ILogout, IUpdateToken, IForgotPassword, IResetPassword } from '../types';
const burgerProjectUrl:string = "https://norma.nomoreparties.space/api";

function getResponseData(res: Response) {
  if (res.redirected) {
    const redirectUrl = res.url;
    console.log(redirectUrl);
  }
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function getIngredients() {
  return fetch(`${burgerProjectUrl}/ingredients`).then(getResponseData);
}

export const getOrder = (ids: string[]) => {
  const token = getCookie('token');

  return fetch(`${burgerProjectUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const a = fetch(`${burgerProjectUrl}/auth/login`, {
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
    .catch(error => {
      console.log(error);
    })
  return a;
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
export const updateInfoUser = (res: IRegisterData) => {
  const token = getCookie('token');
  const a =  fetch(`${burgerProjectUrl}/auth/user`, {
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
  return a;
}
export const getInfoUser = (req: string) => {
  return fetch(`${burgerProjectUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req}`,
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
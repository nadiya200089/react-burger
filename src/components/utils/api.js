const burgerProjectUrl = "https://norma.nomoreparties.space/api";

function getResponseData(res) {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export function getIngredients() {
  return fetch(`${burgerProjectUrl}/ingredients`)
    .then(getResponseData)
}


export const getOrder = (ids) => {

  return fetch(`${burgerProjectUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': ids,
    })
  })
    .then(getResponseData);
}
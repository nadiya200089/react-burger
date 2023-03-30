const burgerProjectUrl = "https://norma.nomoreparties.space/api";

function getResponseData(res) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  }

export function getIngredients() {
    return fetch(`${burgerProjectUrl}/ingredients`)
      .then(getResponseData)
  }


  export const getOrder = (ids) => {
    // to do 
    // const {  ingredients } = useSelector(state => state.constructorStore);

    // const ids = ingredients.map(ingredient => [ingredient._id]);
    return fetch(`https://norma.nomoreparties.space/api/orders`, {
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
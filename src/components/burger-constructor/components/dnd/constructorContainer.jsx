// import { useCallback, useState } from 'react'
// import { Ingredient } from '../BurgerItem'
// const style = {
//   width: 400,
// }
// export const Container = ({ingredients }) => {
//   {
//     const [ingredients, setIngredients] = useState([ingredients])
//     const moveIngredient = useCallback((dragIndex, hoverIndex) => {
//         setIngredients((prevIngredients) =>
//         prevIngredients.update({
//           $splice: [
//             [dragIndex, 1],
//             [hoverIndex, 0, prevIngredients[dragIndex]],
//           ],
//         }),
//       )
//     }, [])
//     const renderCard = useCallback((ingredient, index) => {
//       return (
//         <Ingredient

//           key={ingredient._id}
//           index={index}
//           id={ingredient.uuid}
//           text={ingredient.text}
//           moveIngredient={moveIngredient}
//         />
//       )
//     }, [])
//     return (
//       <>
//         <div style={style}>{ingredients.map((ingredient, i) => renderCard(ingredient, i))}</div>
//       </>
//     )
//   }
// }
// export default Container;
// import { useRef } from 'react'
// import { useDrag, useDrop } from 'react-dnd'

// export const Ingredient = ({ ingredients, index, moveIngredient }) => {
//   const ref = useRef(null)
//   const [{ handlerId }, drop] = useDrop({
//     accept: 'ingredient',
//     collect(monitor) {
//       return {
//         handlerId: monitor.getHandlerId(),
//       }
//     },
//     hover(ingredients, monitor) {
//       if (!ref.current) {
//         return
//       }
//       const dragIndex = ingredients.index
//       const hoverIndex = index
//       if (dragIndex === hoverIndex) {
//         return
//       }
//       const hoverBoundingRect = ref.current?.getBoundingClientRect()
//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//       const clientOffset = monitor.getClientOffset()
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top
      
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return
//       }
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return
//       }
//       moveIngredient(dragIndex, hoverIndex)
//       ingredients.index = hoverIndex
//     },
//   })
//   const [{ isDragging }, drag] = useDrag({
//     type: 'ingredient',
//     item: () => {
//       return { index }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   })
//   const opacity = isDragging ? 0 : 1
//   drag(drop(ref))
//   return (
//     <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      
//     </div>
//   )
// }
//  export default Ingredient;
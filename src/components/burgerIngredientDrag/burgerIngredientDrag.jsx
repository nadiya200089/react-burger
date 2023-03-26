import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { addConstructor } from "../services/reducers/constructor";


export function BurgerIngredientDrag({data, onClick}) {
       // const dispatch = useDispatch()

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })
    //const opacity = isDrag ? 0.1 : 1

    return (
        <div ref={dragRef}>
            <BurgerIngredient
                key={data._id}
                {...data}
                count={1}
                // style={opacity}
                onClick= {onClick}
                 />
        </div>

    )
}
export default BurgerIngredientDrag;
import { BurgerIngredient } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import style from './style.module.css';

import { useDispatch } from "react-redux";
import { addConstructor } from "../services/reducers/constructor";


export function BurgerIngredientDrag({data, count, onClick}) {
       // const dispatch = useDispatch()

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })
    const opacity = isDrag ? 0.4 : 1

    return (
        <div ref={dragRef} calssName={style.dragIngredient}>
            <BurgerIngredient
                key={data._id}
                {...data}
                count={count}
                style={{opacity}}
                onClick= {onClick}
                 />
        </div>

    )
}
export default BurgerIngredientDrag;
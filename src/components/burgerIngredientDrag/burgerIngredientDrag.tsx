import { useDrag } from "react-dnd";
import style from "./style.module.css";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { IIngredientsDto } from "../../types";

interface IBurgerIngredientDrag {
  data: IIngredientsDto;
  count: number;
  onClick: () => void;
}

export const BurgerIngredientDrag: React.FC<IBurgerIngredientDrag> = ({ data, count, onClick }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
 const opacity = isDrag ? 0.4 : 1;
  return (
    <div ref={dragRef} className={style.dragIngredient}>
      <BurgerIngredient
        id={data._id}
        className={count > 0 && "custom"}
        {...data}
        count={count}
        style={{ opacity }}
        onClick={onClick}
      />
    </div>
  );
}
export default BurgerIngredientDrag;

import React from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerIngredientDrag from "../burgerIngredientDrag/burgerIngredientDrag";
import { IIngredientsDto, IIngredientsData } from "../../types";
import { RootStore } from "../../services/store";

interface ICategory {
  title: string;
  id: string;
  ingredients: IIngredientsData[];
}

type Ref = HTMLDivElement;

export const Category: React.FC<ICategory>  = React.forwardRef<Ref, ICategory>(({ title, id, ingredients}, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state: RootStore) => state.constructorStore
  );

  const [ingredientModal, setIngredientModal] = useState<IIngredientsData | null>(null);
  const dispatch = useDispatch();
  const closeModalIngredient = () => {
    setIngredientModal(null);
  };

  return (
    <>
      <h2 className="text text_type_main-large mb-6 mt-10" id={id}>
        {title}
      </h2>
      <div className={classNames(style.list, "mb-16")} ref={ref}>
        {ingredients && ingredients?.map((data: IIngredientsData) => {
          const isBun = data.type === "bun";
          // if (bun?.type){

          // }
          
            const allData: IIngredientsDto[] = [...[bun], ...constructorIngredients];
            const counter = allData.filter(
              (ingredient: IIngredientsDto) => ingredient._id === data._id
            ).length;
            const counterBun = counter > 0 ? counter + 1 : 0;
            const count = isBun ? counterBun : counter;        
          
          return (
            <BurgerIngredientDrag
              data={data}
              key={data._id}
              {...data}
              count={count}
              onClick={() => setIngredientModal(data)}
            />
          );
        })}
      </div>
    </>
  );
});

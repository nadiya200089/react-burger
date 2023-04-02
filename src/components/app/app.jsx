import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor ";
import { useDispatch } from "react-redux";
import fetchIngredients from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export const App = () => {
  // const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // getIngredients()
    // .then(ingredients => setIngredients(ingredients.data))
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.app}>
        <AppHeader />
        <h1
          className={classNames(
            style.title,
            "text text_type_main-large mt-10 mb-5"
          )}
        >
          Соберите бургер
        </h1>
        <main className={style.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    </DndProvider>
  );
};

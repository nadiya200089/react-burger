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
import { Routes, Route } from "react-router-dom";
import { Enter } from "../../pages/enter/enter";
import { Register } from "../../pages/register/register";
import { IngredientDetails } from "../ingridient-details/ingredient-details";

export const App = () => {
  const dispatch = useDispatch();

  const [ingredientModal, setIngredientModal] = useState(null);
  const closeModalIngredient = () => {
    setIngredientModal(null);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<DndProvider backend={HTML5Backend}>
          <div className={style.app}>
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
        </DndProvider>}
        />
        {/* <Route path='ingredientDetails' element={
          <IngredientDetails data={data} />
        }
        /> */}
        <Route path='enter' element={
          <Enter />
        }
        />
        <Route path='register' element={
          <Register />
        }
        />
      </Routes>
    
    </>
  );
};

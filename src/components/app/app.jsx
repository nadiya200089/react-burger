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
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Enter } from "../../pages/enter/enter";
import { Register } from "../../pages/register/register";
import { IngredientDetails } from "../ingridient-details/ingredient-details";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { registerUser, setUser } from "../../utils/api";
import { Modal } from "../modal/modal";
import ingredients from "../../services/reducers/ingredients";

export const App = (data) => {
  const dispatch = useDispatch();
  // const [ingredientModal, setIngredientModal] = useState(null);
  // const closeModalIngredient = () => {
  //   setIngredientModal(null);
  // };
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(background.pathname || "/", { replace: true })
  }

  // const cbLogin = () => {
  //   setUser({name: 'Vasilyi'});
  // }

  // const onLogout = () => {
  //   setUser(null);
  // }

  // const cbRegister = () => {
  //   registerUser()
  //   setUser({name: 'Vasilyi'});
  // }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
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
        <Route path='ingredientDetails/:id' element={
          <IngredientDetails data={data} />
        }
        />
        <Route path='enter' element={
          <Enter />
        }
        />
        <Route path='register' element={
          <Register />
        }
        />
        <Route path='forgot-password' element={
          <ForgotPassword />
        }
        />
      </Routes>
      {
        background &&
        <Routes>
          <Route path='ingredientDetails/:id' element={
            <Modal onClose={onModalClose}>
              <IngredientDetails data={data} />
            </Modal>

          }
          />
        </Routes>
      }
    </>
  );
};

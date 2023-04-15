import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor ";
import { useDispatch, useSelector } from "react-redux";
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
import { Profile } from "../../pages/profile/profile";
import { Error } from "./error/error";
import { ProtectedRoute } from "../protected-route/protected-route";
import { ResetPassword } from "../../pages/reset-password/reset-password";

export const App = (data) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(background.pathname || "/", { replace: true })
  }


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
         <Route path='reset-password' element={
          <ResetPassword />
        }
        />
        <Route path='profile' element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
        />
        <Route path='*' element={
          <Error />
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

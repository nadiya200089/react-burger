import { useEffect } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor ";
import { useSelector } from "react-redux";

import fetchIngredients from "../../services/actions/ingredients";
import { getInfoUser, updateToken } from "../../services/actions/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Enter } from "../../pages/enter/enter";
import { Register } from "../../pages/register/register";
import { IngredientDetails } from "../ingridient-details/ingredient-details";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Modal } from "../modal/modal";
import { Profile } from "../../pages/profile/profile";
import { Error } from "../error/error";
import { ProtectedRoute } from "../protected-route/protected-route";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { getCookie } from '../../utils/cookie';
import { useDispatch } from "../../services/hooks";
import { RootStore } from "../../services/store";
import { Feed } from "../feed/feed";
import { FeedCardDetails } from "../feedCardDetails/feedCardDetails";
import { UserOrders } from "../../pages/userOrders/userOrders";
import { UserProfile } from "../../pages/userProfile/userProfile";
import {UserOrderDetails} from '../user-orders-details/userOrderDetails'
import { PreLoader } from "../preLoader/preloader";


export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isOldToken } = useSelector((state: RootStore) => state.auth);
  const { isLoading} = useSelector((state: RootStore) => state.orderStore);

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const onModalClose = () => {
    navigate(background.pathname || "/", { replace: true })
  }


  useEffect(() => {
    try {
      const token = getCookie("token");
      if (token && token.length > 0) {
        dispatch(getInfoUser(token));
      }

    } finally {
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOldToken) {
      const refreshToken = window.localStorage.getItem('refreshToken');
      if (refreshToken) {
        dispatch(updateToken({
          token: refreshToken
        }))
      }

    } else {
      const token = getCookie("token");
      if (token && token.length > 0) {
        dispatch(getInfoUser(token));
      }
    }
  }, [isOldToken]);

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
              {
                isLoading && 
                <PreLoader/>
              }
              {
                !isLoading && 
                <>
                     <BurgerIngredients />
                     <BurgerConstructor />
                </>
              }
         
            </main>
          </div>
        </DndProvider>}
        />
        <Route path='ingredientDetails/:id' element={
          <IngredientDetails />
        }
        />
        <Route path='feed/:id' element={
          <FeedCardDetails />
        }
        />
        <Route path='feed' element={
          <Feed />
        }
        />
        <Route path='enter' element={
          <ProtectedRoute onlyUnAuth user={user}>
            <Enter />
          </ProtectedRoute>
        }
        />
        <Route path='register' element={
          <ProtectedRoute onlyUnAuth user={user}>
            <Register />
          </ProtectedRoute>
        }
        />
        <Route path='forgot-password' element={
          <ProtectedRoute onlyUnAuth user={user}>
            <ForgotPassword />
          </ProtectedRoute>
        }
        />
        <Route path='reset-password' element={
          <ProtectedRoute onlyUnAuth user={user}>
            <ResetPassword />
          </ProtectedRoute>
        }
        />
        <Route 
          path='/profile/'
          element={
            <ProtectedRoute user={user} >
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path='user-orders' element={
            <ProtectedRoute user={user} >
              <UserOrders />
            </ProtectedRoute>
          }
          />
          <Route path='user-orders/:id' element={
            <ProtectedRoute user={user} >
              <UserOrderDetails />
            </ProtectedRoute>
          }
          />
          <Route index element={
            <ProtectedRoute user={user} >
              <UserProfile />
            </ProtectedRoute>
          }
          />
        </Route>


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
              <IngredientDetails />
            </Modal>
          }
          />
        </Routes>
      }
    </>
  );
};

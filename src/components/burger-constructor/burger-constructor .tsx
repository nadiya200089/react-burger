import { FC } from 'react';
import style from "./style.module.css";
import classNames from "classnames";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../order-details/order-details";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';

import constructor, {
  deleteIngredient,
  addConstructor,
  moveItem,
} from "../../services/reducers/constructor";
import DropContainer from "../dnd/DropContainer";
import { DragAndDropContainer } from "../dnd/DragAndDropContainer";
import { fetchOrder } from "../../services/actions/order";
import { RootStore } from '../../services/store';
import { IIngredientsData } from '../../types';

// interface IIngridients {

// }

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector((state: RootStore) => state.constructorStore);

  const { order } = useSelector((state: RootStore) => state.orderStore.data);
  const { user } = useSelector((state: RootStore) => state.auth);

  const dispatch = useDispatch();
  const [orderModal, setOrderModal] = useState(false);

  const closeOrderModal = () => {
    setOrderModal(false);
  };




  useEffect(() => {
    if (Number(order) > 0) {
      setOrderModal(true);
    }
  }, [order]);

  const handleSaveOrder = () => {
    if (user === null) {
      navigate('/enter');
    } 
    
    if (ingredients) {
      const ids: string[] = ingredients.map((ingredient: IIngredientsData) => ingredient._id);
      ids.push(bun._id);
      ids.push(bun._id);
      if (ids && ids.length > 0) {
        dispatch(fetchOrder(ids));
      }
    }
  };

  const handleDeleteIngredient = (id: string) => {
    dispatch(deleteIngredient(id));
  };

  const onDropIngridientHandler = (objIngridient: IIngredientsData) => {
    dispatch(addConstructor(objIngridient));
  };

  const onDropBanHandler = (objBun: IIngredientsData) => {
    dispatch(addConstructor(objBun));
  };

  const countPrice: number = useMemo(() => {
    let totalPrice: number = 0;
    if (bun && !bun?.name) {
      return totalPrice;
    }

    totalPrice += bun?.price * 2;
    ingredients?.map((ingredient: IIngredientsData) => {
      totalPrice += ingredient.price;
    });
    return totalPrice;
  }, [bun, ingredients]);

  const handleMoveCard = (di: number, hi: number) => {
    dispatch(moveItem({ di, hi }));
  };

  return (
    <div className={String(style.constructor)}>
      <DropContainer onDropHandler={onDropBanHandler}>
        <div className={classNames(style.bun, "ml-5")}>
          <ConstructorElement
            thumbnail={bun?.image}
            text={
              bun.name ? `${bun?.name} (низ)` : "Перетащите, пожалуйста, булку"
            }
            {...bun}
            isLocked={true}
            extraClass={bun.name ? "" : "constructor-element__custom"}
            type="top"
          />
        </div>
      </DropContainer>

      <div className={classNames(style.main_ingredients_wrap, "custom-scroll")}>
        <DropContainer onDropHandler={onDropIngridientHandler}>
          <div className={classNames(style.main_ingredients)}>
          {ingredients && ingredients.map((data: IIngredientsData, index: number) => {
                  const tData = {};
                  return (<DragAndDropContainer
                    // className={classNames(
                    //   style.main_ingredients_wrap,
                    //   "custom-scroll"
                    // )}
                    index={index}
                    id={data.uuid}
                    key={data.uuid}
                    moveCard={handleMoveCard}
                  >
                    <div className={classNames(style.main, "mr-4")}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        // className="ml-2 mr-2 mb-2 mt-2"
                        text={data.name}
                        thumbnail={data.image}
                        price={data.price}
                        handleClose={() => handleDeleteIngredient(data.uuid)}
                      />
                    </div>
                  </DragAndDropContainer>)
                })
              }
          
          </div>
        </DropContainer>
      </div>

      <div className={classNames(style.bun, "ml-5")}>
        <ConstructorElement
          thumbnail={bun?.image}
          text={
            bun.name ? `${bun?.name} (низ)` : "Перетащите, пожалуйста, булку"
          }
          {...bun}
          isLocked={true}
          extraClass={bun.name ? "" : "constructor-element__custom"}
          type="bottom"
        />
      </div>
      <div className={classNames(style.order, " mt-6 mr-6")}>
        <div className="text text_type_digits-medium">{countPrice}</div>
        <CurrencyIcon type="primary" />
        <Button
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSaveOrder}
        >
          Оформить заказ{" "}
        </Button>
      </div>
      {orderModal && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

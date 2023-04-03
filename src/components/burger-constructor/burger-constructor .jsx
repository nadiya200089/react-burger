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
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  addConstructor,
  moveItem,
} from "../../services/reducers/constructor";
import DropContainer from "../dnd/DropContainer";
import { DragAndDropContainer } from "../dnd/DragAndDropContainer";
import { fetchOrder } from "../../services/actions/order";
export const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.constructorStore);
  const { order } = useSelector((state) => state.orderStore.data);
  const dispatch = useDispatch();
  const [orderModal, setOrderModal] = useState(false);

  const closeOrderModal = () => {
    setOrderModal(false);
  };

  useEffect(() => {
    if (order > 0) setOrderModal(true);
  }, [order]);

  const handleSaveOrder = () => {
    const ids = ingredients.map((ingredient) => [ingredient._id]);
    dispatch(fetchOrder(ids));
  };

  const handleDeleteIngredient = (id) => {
    dispatch(deleteIngredient(id));
  };

  const onDropIngridientHandler = (objIngridient) => {
    dispatch(addConstructor(objIngridient));
  };

  const onDropBanHandler = (objBun) => {
    dispatch(addConstructor(objBun));
  };

  const countPrice = useMemo(() => {
    let totalPrice = 0;
    if (!bun.name) {
      return totalPrice;
    }

    totalPrice += bun?.price * 2;
    ingredients?.map((ingredient) => {
      totalPrice += ingredient.price;
    });
    return totalPrice;
  });

  const handleMoveCard = (di, hi) => {
    dispatch(moveItem({ di, hi }));
  };

  return (
    <div className={style.constructor}>
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
            {ingredients.map((data, index) => (
              <DragAndDropContainer
                className={classNames(
                  style.main_ingredients_wrap,
                  "custom-scroll"
                )}
                index={index}
                id={data.uuid}
                key={data.uuid}
                moveCard={handleMoveCard}
              >
                <div className={classNames(style.main, "mr-4")}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    className="ml-2 mr-2 mb-2 mt-2"
                    text={data.name}
                    thumbnail={data.image}
                    {...data}
                    handleClose={() => handleDeleteIngredient(data.uuid)}
                  />
                </div>
              </DragAndDropContainer>
            ))}
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
          <OrderDetails data={orderModal} />
        </Modal>
      )}
    </div>
  );
};

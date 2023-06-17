import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { getTimeFromTimestamp, parseOrderToClient } from "../../utils/utils";
import { IWebsocketOrders } from "../../types";
import classNames from "classnames";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../services/hooks";
import { wsOpen, wsClose } from "../../services/actions/userOrders";
import { getCookie } from "../../utils/cookie";



interface FeedCardDetailsProps {
    isNotModal?: boolean;
}


export const UserOrderDetails: React.FC<FeedCardDetailsProps> = ({ isNotModal }) => {
    const { id } = useParams();
    const { data: ingredients } = useSelector((state) => state.ingredientsStore)
    const { orders } = useSelector((state) => state.userOrdersStore);

    const order = orders.find((item: IWebsocketOrders) => id === item._id);

    const [parseOrders, setParseOrders] = useState<any[]>([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isNotModal) {
            return;
        }
        const token = getCookie('token');
        dispatch(wsOpen(
            {
                url: `wss://norma.nomoreparties.space/orders?token=${token}`
            }
        ));
        return () => {
            if (!isNotModal) {
                return;
            }
            console.log('close feed ws')
            dispatch(wsClose());
        };
    }, [dispatch]);


    if (!order) {
        return <> </>
    }

    const parseOrder = parseOrderToClient(order, ingredients);



    let statusElem: string | undefined;

    switch (parseOrder.status) {
        case 'done':
            statusElem = 'Выполнен';
            break;
        case 'created':
            statusElem = 'Создан';
            break;
        case 'pending':
            statusElem = 'Готовится';
            break;
        default:
            statusElem = 'Статус заказа неизвестен...';
    }

    const usedIdIngredients: string[] = [];
    return (

        <div className={style.wrapper} key={!isNotModal ? `${order._id}-modal` : order._id}>
            <div className={classNames(style.number, "text text_type_digits-default")}>#{parseOrder.number}</div>
            <div className="text text_type_main-medium">{parseOrder.name}</div>
            <div className={classNames(style.status, "text text_type_main-small")}>{statusElem}</div>
            <h3 className="text text_type_main-medium">Состав:</h3>
            <div className={classNames(style.wrap, "custom-scroll")}>
                {
                    parseOrder.ingredients.length ?

                        parseOrder.ingredients.map((ingredientId) => {
                            const ingredient = ingredients.find((ing) => ing._id === ingredientId);

                            const imgSrc = ingredient?.image_mobile;

                            if (usedIdIngredients.includes(ingredientId) || !ingredient) {
                                return ('')
                            }

                            usedIdIngredients.push(ingredient._id);
                            const counter = parseOrder.ingredients.filter((id) => id === ingredientId).length;
                            return (
                                <div key={!isNotModal ? `${ingredient?._id}-modal` : order._id} className={style.ingredientWrap}>
                                    <div className={style.ingredient}>
                                        <img className={style.img} src={imgSrc}></img>
                                        <div className="text text_type_main-small">{ingredient?.name}</div>
                                    </div>
                                    <div className={style.price}>
                                        <div className="text text_type_digits-default">{`${counter} x ${ingredient?.price}`}</div>
                                        <CurrencyIcon type='primary'></CurrencyIcon>
                                    </div>
                                </div>
                            )
                        }) : ''
                }
            </div>
            <div className={style.footer}>
                <div className="text text_color_inactive text_type_main-small">{getTimeFromTimestamp(parseOrder.createdAt)}</div>
                <div className={style.totalPrice}>
                    <div className="text text_type_digits-default">{parseOrder.total}</div>
                    <CurrencyIcon type='primary'></CurrencyIcon>
                </div>
            </div>
        </div >
    )
}

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { RootStore } from "../../services/store";
import { getTimeFromTimestamp, parseOrderToClient } from "../../utils/utils";
import { IWebsocketOrders } from "../../types";
import classNames from "classnames";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';



export const FeedCardDetails: React.FC = () => {
    const { id } = useParams();
    const { data: ingredients } = useSelector((state: RootStore) => state.ingredientsStore)
    const { orders } = useSelector((state: RootStore) => state.feedStore);

    const order = orders.find((item: IWebsocketOrders) => id === item._id);



    const [parseOrders, setParseOrders] = useState<any[]>([])

    if (!order) {
        return <> </>
    }

    const parseOrder = parseOrderToClient(order, ingredients);


    //    const count = {};
    //    parseOrder.ingredientPrice.forEach((n) => {count(n) = (count(n) || 0) + 1;});


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

        <div className={style.wrapper}>
            <div className={classNames(style.number, "text text_type_digits-default")}>#{parseOrder.number}</div>
            <div className="text text_type_main-medium">{parseOrder.name}</div>
            <div className={classNames(style.status, "text text_type_main-small")}>{statusElem}</div>
            <h3 className="text text_type_main-medium">Состав:</h3>
            <div className={classNames(style.wrap, "custom-scroll")}>
                {
                    parseOrder.ingredients.length ?
                    
                        parseOrder.ingredients.map((ingredientId) => {
                            const ingredient = ingredients.find((ing) => ing._id === ingredientId);

                            // const makeUniq = (arr: string[]) => {
                            //     return arr.filter((elem, _id) => arr.indexOf(elem) === _id)
                            // }
                            // makeUniq(parseOrder.ingredients);
                            // console.log(parseOrder.ingredients)

                            const imgSrc = ingredient?.image_mobile;

                            if (usedIdIngredients.includes(ingredientId) || !ingredient) {
                                return ('')
                            }

                            usedIdIngredients.push(ingredient._id);
                            const counter = parseOrder.ingredients.filter((id) => id === ingredientId).length;
                            return (
                                <div className={style.ingredientWrap}>
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

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { RootStore } from "../../services/store";
import { parseOrderToClient } from "../../utils/utils";
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

    return (

        <div className={style.wrapper}>
            <div className={classNames(style.number, "text text_type_digits-default")}>#{parseOrder.number}</div>
            <div className="text text_type_main-medium">{parseOrder.name}</div>
            <div className={classNames(style.status, "text text_type_main-small")}>{statusElem}</div>
            <div className={classNames(style.wrap, "custom-scroll")}>
                <div className={style.images}>
                    <div className={style.img}>
                        {parseOrder.arrImgsUri.length ?
                            parseOrder.arrImgsUri.map((item) => (
                                <div className={style.name}>
                                    <img src={item}></img>
                                </div>
                            )) : ''}

                    </div>
                </div>
                <div className={classNames(style.names, "text text_type_main-small")}>
                    {parseOrder.ingredientName.length ?
                        parseOrder.ingredientName.map((item) => (
                            <div>
                                {item}
                            </div>
                        )) : ''}
                </div>
                <div className={classNames(style.price, "text text_type_main-small")}>
                    {parseOrder.ingredientPrice.length ?
                        parseOrder.ingredientPrice.map((item) => (
                            <div className={style.ingredientPrice}>
                                {item}
                                <CurrencyIcon type='primary'></CurrencyIcon>

                            </div>
                        )) : ''}
                </div>
            </div>
            <div className="text text_color_inactive text_type_main-small">{parseOrder.createdAt}</div>
            <div className="text text_type_digits-default">{parseOrder.total}</div>
        </div >
    )
}

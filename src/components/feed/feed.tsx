import { useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { RootStore } from "../../services/store";
import { OrderCard } from "@ya.praktikum/react-developer-burger-ui-components";
import { apiSocket } from "../../utils/apiSocket";
import { wsOpen, wsClose } from "../../services/actions/feed";

import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import ingredients from "../../services/reducers/ingredients";
import { IIngredientsData, IWebsocketOrders } from '../../types';
import { FeedCard } from "../feedCard/feedCard";
// type TOrderCard = {
//     ingredients: string[];
//     totalPrice: number;
//     date: Date;
//     orderNumber: number;
//     name: string;
//     status: string;
// }

const parseOrdersToClient = (orders: IWebsocketOrders[], ingredients: IIngredientsData[]) => {
    
    return orders.map((order: IWebsocketOrders) => {
        const arrIdsIngredients = order.ingredients;
        const usedIngredients = ingredients.filter((ingredient: IIngredientsData) => arrIdsIngredients.includes(ingredient._id));


        const total = usedIngredients.reduce((sumPrice: number, currentItem: IIngredientsData) => {
            return sumPrice + currentItem.price;        
        }, 0);

        const arrImgsUri = usedIngredients.map((ingredients: IIngredientsData) => ingredients.image_mobile);

        return Object.assign({}, order, {total: total, arrImgsUri: arrImgsUri });
    })
}

export const Feed = () => {
    const { data: ingredients } = useSelector((state: RootStore) => state.ingredientsStore)
    const { connectionError, orders, total, totalToday, status } = useSelector((state: RootStore) => state.feedStore);
    const [parseOrders, setParseOrders] = useState<any[]>([])
    const dispatch = useDispatch();
    console.log(orders);

    useEffect(() => {
        dispatch(wsOpen());
        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);


    useEffect(() => {
        if (orders && orders.length) {
            const parseOrders = parseOrdersToClient(orders, ingredients);
            setParseOrders(parseOrders);
        }
    }, [orders])
    const getStatus = (orders: any[], status: any): number[] => {
        const sortedOrders = orders.filter((item) => item.status === status);
        return sortedOrders.map((item) => item.number).slice(0, 10);
    };


    return (
        <div className={style.wrapper}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Лента Заказов
            </h2>
            <div className={style.main}>
                <div className={classNames(style.feed, "custom-scroll")}>
                    <div className={style.orders}>
                        {parseOrders.length? 
                            parseOrders.map((item: any) => (
                                <FeedCard
                                    totalPrice={item.total}
                                    createdAt={item.createdAt}
                                    name={item.name}
                                    number={item.number}
                                    arrImgsUri={item.arrImgsUri}  
                                />
                            )
                            ): ''}
                    </div>
                </div>
                <div className={style.wrap}>
                    <div className={style.status}>

                        <div>
                            <div className="text text_type_main-medium">Готовы:</div>
                            <div className="text text_type_digits-small">
                                {getStatus(orders, 'done').length ? (
                                    getStatus(orders, 'done').map((item) => (
                                        <div key={item} >
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text text_type_main-small">Пока ничего...</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="text text_type_main-medium">В работе:</div>
                            <div className="text text_type_digits-small">
                                {getStatus(orders, 'pending').length ? (
                                    getStatus(orders, 'pending').map((item) => (
                                        <div key={item} >
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text text_type_main-small">Пока ничего...</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text text_type_main-medium">Выполнено за все время:</div>
                        <div className="text text_type_digits-large">
                            {total}
                        </div>
                    </div>
                    <div>
                        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                        <div className="text text_type_digits-large">{totalToday}</div>
                    </div>
                </div>

            </div>
        </div>

    )
}
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
import { FeedCard } from "../feedCard/feedCard";
import { useNavigate } from 'react-router-dom';
import { parseOrdersToClient } from '../../utils/utils'


export const Feed = () => {
    const { data: ingredients } = useSelector((state: RootStore) => state.ingredientsStore)
    const { connectionError, orders, total, totalToday, status } = useSelector((state: RootStore) => state.feedStore);
    const [parseOrders, setParseOrders] = useState<any[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(orders)

    const handleNavigateToFeedId = (id: string) => {
        navigate(`/feed/${id}`);
    };

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
                <div className={classNames(style.orders, "custom-scroll")}>
                    {parseOrders.length ?
                        parseOrders.map((item: any) => (
                            <FeedCard
                                _id={item._id}
                                totalPrice={item.total}
                                createdAt={item.createdAt}
                                name={item.name}
                                number={item.number}
                                arrImgsUri={item.arrImgsUri}
                                onClick={() => handleNavigateToFeedId(item._id)}
                                ingredientName={item.ingredientName}
                            />
                        )
                        ) : ''}
                </div>
                <div className={style.wrap}>
                    <div className={style.status}>

                        <div>
                            <div className="text text_type_main-medium">Готовы:</div>
                            <div className={classNames(style.done, "text text_type_digits-default")}>
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
                            <div className="text text_type_digits-default">
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
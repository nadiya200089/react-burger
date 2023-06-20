import { useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import { wsOpen, wsClose } from "../../services/actions/feed";
import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import { FeedCard } from "../feedCard/feedCard";
import { useNavigate } from 'react-router-dom';
import { parseOrdersToClient } from '../../utils/utils'
import { IWebsocketOrders } from "../../types";
import { useSelector } from "../../services/hooks";
import { socketUrl } from "../../utils/apiSocket";



export const Feed = () => {
    const { data: ingredients } = useSelector((state) => state.ingredientsStore)
    const { isConnectionError, orders, total, totalToday, status } = useSelector((state) => state.feedStore);
    const [parseOrders, setParseOrders] = useState<any[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigateToFeedId = (id: string) => {
        navigate(`/feed/${id}`);
    };

    const [feedDetailsModal, setfeedDetailsModal] = useState<IWebsocketOrders | null>(null);

    useEffect(() => {
        dispatch(wsOpen({ url: `${socketUrl}/all`}));
        return () => {
            console.log('cose feed ws')
            dispatch(wsClose());
        };
    }, [dispatch]);

    useEffect(() => {
        if (orders && orders.length) {
            const parseOrders = parseOrdersToClient(orders, ingredients);
            setParseOrders(parseOrders);
        }
    }, [orders])
    
    const getStatus = (orders: IWebsocketOrders[], status: string): number[] => {
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
                        parseOrders.map((item) => (
                            <FeedCard
                                _id={item._id}
                                key={item._id}
                                totalPrice={item.total}
                                createdAt={item.createdAt}
                                name={item.name}
                                number={item.number}
                                arrImgsUri={item.arrImgsUri}
                                onClick={() => setfeedDetailsModal(item)}
                                ingredientName={item.ingredientName}
                                path={`/feed/${item._id}`}
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
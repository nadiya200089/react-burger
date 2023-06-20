import { useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import { useSelector } from "../../services/hooks";
import { wsOpen, wsClose } from "../../services/actions/userOrders";
import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import { FeedCard } from "../../components/feedCard";
import { useNavigate } from 'react-router-dom';
import { parseOrdersToClient, parseOrderToClient } from '../../utils/utils';
import { IWebsocketOrders } from '../../types'
import { getCookie } from "../../utils/cookie";
import { socketUrl } from "../../utils/apiSocket";


export const UserOrders = () => {
    const { data: ingredients } = useSelector((state) => state.ingredientsStore)
    const { isConnectionError, orders, total, totalToday, status } = useSelector((state) => state.userOrdersStore);
    const [parseOrders, setParseOrders] = useState<any[]>([]);
    const [feedDetailsModal, setfeedDetailsModal] = useState<IWebsocketOrders | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigateToFeedId = (id: string) => {
        navigate(`/profile/user-orders/${id}`);
    };

    useEffect(() => {
        const token = getCookie('token');
        dispatch(wsOpen(
            {
                url:  `${socketUrl}?token=${token}`
            }
        ));
        return () => {
            console.log('close socket')
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

    const order = orders.find((item: IWebsocketOrders) => item);
    if (!order) {
        return <> </>
    }
    const parseOrder = parseOrderToClient(order, ingredients);


    return (
        <div className={style.wrapper}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                История заказов
            </h2>
            <div className={style.main}>
                <div className={classNames(style.orders, "custom-scroll")}>
                    {parseOrders.length ?
                        parseOrders.map((item) => (
                            <FeedCard
                                key={item._id}
                                _id={item._id}
                                totalPrice={item.total}
                                createdAt={item.createdAt}
                                name={item.name}
                                number={item.number}
                                arrImgsUri={item.arrImgsUri}
                                onClick={() => setfeedDetailsModal(item)}
                                ingredientName={item.ingredientName}
                                status={item.status}
                                path={`/profile/user-orders/${item._id}`}
                            />
                        )
                        ) : <div className="text text_type_main-large mr-2 mt-15 mb-15">Пока заказов нет</div>}
                </div>

            </div>
        </div>

    )
}
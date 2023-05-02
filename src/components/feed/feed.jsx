import classNames from "classnames";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { RootStore } from "../../services/store";
import { OrderCard } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { apiSocket } from "../../utils/apiSocket";

let date = new Date('2012-10-10')
export const Feed = () => {
    apiSocket();
    return (
        <div className={style.wrapper}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Лента Заказов
            </h2>
            <div className={style.main}>
                <div className={classNames(style.feed, "custom-scroll")}>
                    <OrderCard ingredients={[{ image: '', name: 'sss' }]} totalPrice={2000} status="готов" orderNumber={1000} name="sss" date={date} />
                </div>
                <div className={style.wrap}>
                    <div className={style.status}>
                        <div className="text text_type_main-medium">Готовы:</div>
                        <div className="text text_type_main-medium">В работе:</div>
                    </div>
                    <div className="text text_type_main-medium">Выполнено за все время:</div>
                    <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                </div>
            </div>
        </div>
    )
}
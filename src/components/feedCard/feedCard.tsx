//import { Link, useLocation } from "react-router-dom";
import { IFeedCard } from "../../types";
import { getTimeFromTimestamp } from "../../utils/utils";
import style from "./style.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import 'moment/locale/ru';


export const FeedCard: React.FC<IFeedCard> = ({ number, createdAt, name, arrImgsUri, _id, totalPrice, onClick, ingredientName }) => {
    return (
        <div onClick={onClick}
            className={style.wrapper}>
            <div className={style.wrap}>
                <div className="text text_type_digits-default">#{number}</div>
                <div className="text text_color_inactive text_type_main-small">{getTimeFromTimestamp(createdAt)}</div>
            </div>
            <div className="text text_type_main-medium">{name}</div>
            <div className={style.wrap}>
                <div className={style.images}> {arrImgsUri.length ?
                    arrImgsUri.slice(0, 6).map((item: string, index: number) => (<div key={index} style={{ zIndex: arrImgsUri.length - index }} className={style.img}>
                        <img className={style.image} src={item} alt={ingredientName}></img>
                    </div>
                    )) : ''}
                </div>
                <div className={style.price}>
                    <div className="text text_type_digits-default">{totalPrice}</div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div >
    )
}

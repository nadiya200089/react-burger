import { IFeedCard } from "../../types";
import style from "./style.module.css";
import classNames from "classnames";


export const FeedCard: React.FC<IFeedCard> = ({ number, createdAt, name, arrImgsUri,totalPrice }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrap}>
                <div>{number}</div>
                <div>{createdAt}</div>
            </div>
            <div>{name}</div>
            <div className={style.wrap}>
                <div className={style.images}> {arrImgsUri.length ?
                            arrImgsUri.map((item: any) => (<img className={style.img} src={item}>
                </img>
                )): ''}
            </div>
            <div>{totalPrice}</div>
        </div>
    </div >
)    
}

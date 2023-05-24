import { IFeedCard } from "../../types";
import { getTimeFromTimestamp } from "../../utils/utils";
import style from "./style.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import 'moment/locale/ru';
import cn from "classnames";



export const FeedCard: React.FC<IFeedCard> = ({ number, createdAt, name, status, arrImgsUri, _id, totalPrice, onClick, ingredientName }) => {
    let deltaMargin = 20;
    let classStatus;

    let statusElem: string | undefined
    switch (status) {
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
            statusElem = '';
    }

    // let colorStatusName = '';

    // switch (status) {
    //     case 'done':
    //         colorStatusName = 'green';
    //         break;
    //     case 'created':
    //         colorStatusName = 'green';
    //         break;
    //     case 'pending':
    //         colorStatusName = 'brown';
    //         break;
    //     default:
    //         colorStatusName = 'black';
    // }



    return (
        <div onClick={onClick}
            className={style.wrapper}>
            <div className={style.wrap}>
                <div className="text text_type_digits-default">#{number}</div>
                <div className="text text_color_inactive text_type_main-small">{`${getTimeFromTimestamp(createdAt)} i-GMT+3`}</div>
            </div>
            <div className="text text_type_main-medium">{name}</div>

            <div  
                className={ 
                    cn('text text_type_main-small', {
                        [style.textGreen]: status === 'created',
                        [style.textWhite]: status === 'done',

                    })
                }
            >
                {statusElem}
            </div>

           
            <div className={style.wrap}>
                <div className={style.images}> {arrImgsUri.length ?
                    arrImgsUri.slice(0, 6).map((item: string, index: number) => (
                    <div 
                        key={index}
                        className={style.img}
                        style={{
                            top: 0,
                            left: index === 0 ? 0 : `${deltaMargin + 30 }px`,
                            zIndex: index
                        }}
                    >
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

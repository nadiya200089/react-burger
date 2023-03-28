import style from './style.module.css';
import classNames from 'classnames';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


// function getResponseData(res) {
//     if (!res.ok) {
//         return Promise.reject(`Ошибка`); 
//     }
//     return res.json();
//   }
//  function getOrderNumber(_id) {
//     return fetch(`https://norma.nomoreparties.space/api/orders`, {
//       method: 'POST',
//       body: JSON.stringify({
//         ingredients: _id,
     
//       })
//     })
//     .then(getResponseData)
//   }
//   console.log(getOrderNumber());


export const OrderDetails = () => {
    return (
        <div className={style.order_details}>
            <h2 className='text text_type_digits-large mb-8 mt-20'>{22232}</h2>
            <h3 className='text text_type_main-medium mb-15 mt-0'>идентификатор заказа</h3>
            <div className={style.check_icon} />   
            <p className='text text_type_main-small mb-2 mt-15'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>

        </div>

    )

}
import style from './style.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { useEffect, useState } from 'react';
import { Modal } from '../modal/modal';
import { ingredientsPropTypes } from '../utils/prop-types';

export const BurgerConstructor = ({ constructorIngredients }) => {
    const buns = constructorIngredients.find(data => data.type === "bun");
    const mainIngredients = constructorIngredients.filter(data => data.type !== "bun");

    const [orderModal, setOrderModal] = useState(false);
    useEffect(() => {
        const closeByEsc = (target) => { if (target.key === 'Escape') { setOrderModal(null) } }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])
    const closeOrderModal = () => { setOrderModal(false) }

    return (
            <div className={style.constructor}>
                <div className={classNames(style.bun, 'ml-5')}><ConstructorElement thumbnail={buns?.image} text={`${buns?.name} (верх)`} {...buns} key={buns?._id} isLocked={true}
                    type="top"></ConstructorElement></div>
                <div className={classNames(style.main_ingredients, 'custom-scroll')}>
                    {mainIngredients.map(data => <div key={data._id} className={classNames(style.main, "mr-4")}><DragIcon type="primary" /> <ConstructorElement className="ml-2 mr-2 mb-2 mt-2"
                        key={data._id} text={data.name} thumbnail={data.image} {...data} /> </div>)}
                </div>
                <div className={classNames(style.bun, 'ml-5')}><ConstructorElement thumbnail={buns?.image} text={`${buns?.name} (низ)`} {...buns} isLocked={true}
                    key={buns?._id} type="bottom" /></div>
                <div className={classNames(style.order, ' mt-6 mr-6')}>
                    <div className="text text_type_digits-medium" >610</div>
                    <CurrencyIcon type="primary" />
                    <Button extraClass="ml-10" htmlType="button" type="primary" size="large" onClick={() => setOrderModal(true)}>
                        Оформить заказ </Button>
                </div>
                {orderModal && <Modal onClose={closeOrderModal}> <OrderDetails data={orderModal} /> </Modal>}
            </div>
        
      


    )
}
// BurgerConstructor.propTypes = {
//     constructorIngredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
// }
import style from './style.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { useEffect, useMemo, useState } from 'react';
import { Modal } from '../modal/modal';
import { ingredientsPropTypes } from '../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteIngredient, addConstructor, moveItem  } from '../services/reducers/constructor';
import ingredients, {plusCount} from '../services/reducers/ingredients';


import DropContainer from './components/DropContainer';
import { DragAndDropContainer } from './components/dnd/DragAndDropContainer';


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

export const BurgerConstructor = () => {
    const { bun, ingredients } = useSelector(state => state.constructorStore);
    const dispatch = useDispatch()

    const [orderModal, setOrderModal] = useState(false);

    useEffect(() => {
        const closeByEsc = (target) => { if (target.key === 'Escape') { setOrderModal(null) } }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])
    const closeOrderModal = () => { setOrderModal(false) }

    //API
    const handleSaveOrder = () => {
        const ids = ingredients.map(ingredient => ingredient._id);
        return fetch(`https://norma.nomoreparties.space/api/orders`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json;charset=uft-8'
            },
            body: JSON.stringify({
                'ingredients': ["609646e4dc916e00276b286e", "60d3b41abdacab0026a733cb"],
            
            })
        })
        .then(result  => {
            console.log(result);
        })
        .catch(error => {
            console.log('error', error);
        })
    }

    const handleDeleteIngredient = (id) => {
        dispatch(deleteIngredient(id));
    };

    const onDropIngridientHandler = (objIngridient) => {
        dispatch(addConstructor(objIngridient));
    };

    const onDropBanHandler = (objBun) => {
        dispatch(addConstructor(objBun));
    };

    const onDropCustom = (objBun) => {
        dispatch(plusCount({id: objBun.id, type: objBun.type}))
        dispatch(addConstructor(objBun));
        
    };

    const countPrice = useMemo(() => {
        let totalPrice = 0;
        if (bun === null || undefined) {
            totalPrice = 0;
        }
        else {
            totalPrice +=bun?.price * 2
        }
        ingredients?.map(ingredient => {totalPrice += ingredient.price});
        return totalPrice;
    })


    const handleMoveCard = (di, hi) => {
       dispatch(moveItem({di, hi}));
    }
    return (
        <div className={style.constructor} >
            <DropContainer onDropHandler={onDropBanHandler}>
                <div className={classNames(style.bun, 'ml-5')}>
                    <ConstructorElement
                        thumbnail={bun?.image}
                        text={`${bun?.name} (верх)`}
                        {...bun}
                        isLocked={true}
                        type="top"
                    />
                </div>
            </DropContainer>
            <DropContainer onDropHandler={onDropCustom}>
                        <div className={classNames(style.main_ingredients, 'custom-scroll')}>
                            {
                                 ingredients.map((data, index) => (
                                    <DragAndDropContainer 
                                        index={index}
                                        id={data.uuid}
                                        moveCard={handleMoveCard}
                                    >
                                        <div key={data.uuid} className={classNames(style.main, "mr-4")}>
                                            <DragIcon type="primary" /> 
                                            <ConstructorElement 
                                                className="ml-2 mr-2 mb-2 mt-2"
                                                key={data.uuid}
                                                text={data.name}
                                                thumbnail={data.image}
                                                {...data}
                                                handleClose={() => handleDeleteIngredient(data.uuid)}
                                            />
                                        </div>
                                    </DragAndDropContainer>
                                    )
                                )
                            }
                        </div>
               </DropContainer>         
            {/* <DropContainer onDropHandler={onDropIngridientHandler}>
                <div className={classNames(style.main_ingredients, 'custom-scroll')}>
                    {
                        ingredients.map((data, index) => (

                            <div key={data.uuid} className={classNames(style.main, "mr-4")}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    className="ml-2 mr-2 mb-2 mt-2"
                                    key={data.uuid}
                                    text={data.name}
                                    thumbnail={data.image}
                                    {...data}
                                    handleClose={() => handleDeleteIngredient(data.uuid)}
                                />
                            </div>

                        )
                        )
                    }
                </div>
            </DropContainer> */}
           


            <div className={classNames(style.bun, 'ml-5')}>
                <ConstructorElement
                    thumbnail={bun?.image}
                    text={`${bun?.name} (низ)`}
                    {...bun}
                    isLocked={true}
                    type="bottom"
                />
            </div>
            <div className={classNames(style.order, ' mt-6 mr-6')}>
                <div className="text text_type_digits-medium" >{countPrice}</div>
                <CurrencyIcon type="primary" />
                <Button extraClass="ml-10" htmlType="button" type="primary" size="large" onClick={handleSaveOrder}>
                    Оформить заказ </Button>
            </div>
            {orderModal && <Modal onClose={closeOrderModal}> <OrderDetails data={orderModal} /> </Modal>}
        </div>
    )
}
BurgerConstructor.propTypes = {
    constructorIngredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}
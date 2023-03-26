import style from './style.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { useEffect, useState } from 'react';
import { Modal } from '../modal/modal';
import { ingredientsPropTypes } from '../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteIngredient, addConstructor } from '../services/reducers/constructor';
import DropContainer from './components/DropContainer';
import { DragAndDropContainer } from './components/dnd/DragAndDropContainer';

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

    const handleDeleteIngredient = (id) => {
        dispatch(deleteIngredient(id));
    };

    const onDropIngridientHandler = (objIngridient) => {
        dispatch(addConstructor(objIngridient));
    };

    const onDropBanHandler = (objBun) => {
        dispatch(addConstructor(objBun));
    };

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

            {/* <DndProvider backend={HTML5Backend}>
                <Container>
                    <DropContainer onDropHandler={onDropIngridientHandler}>
                        <div className={classNames(style.main_ingredients, 'custom-scroll')}>
                            {
                                ingredients.map(data => (
                                    <div key={data.uuid} className={classNames(style.main, "mr-4")}>
                                        <DragIcon type="primary" /> <ConstructorElement className="ml-2 mr-2 mb-2 mt-2"
                                            key={data.uuid} text={data.name} thumbnail={data.image} {...data}
                                            handleClose={() => handleDeleteIngredient(data.uuid)}
                                        />
                                    </div>)
                                )
                            }
                        </div>
                    </DropContainer>
                </Container>
            </DndProvider> */}
            {/* <DropContainer onDropHandler={onDropIngridientHandler}> */}
                <div className={classNames(style.main_ingredients, 'custom-scroll')}>
                    {
                        ingredients.map((data, index) => (
                            <DragAndDropContainer 
                                index={index}
                                id={data.uuid}
                                moveCard={() => console.log('run move')}
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
            {/* </DropContainer> */}

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
                <div className="text text_type_digits-medium" >610</div>
                <CurrencyIcon type="primary" />
                <Button extraClass="ml-10" htmlType="button" type="primary" size="large" onClick={() => setOrderModal(true)}>
                    Оформить заказ </Button>
            </div>
            {orderModal && <Modal onClose={closeOrderModal}> <OrderDetails data={orderModal} /> </Modal>}
        </div>
    )
}
BurgerConstructor.propTypes = {
    constructorIngredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}
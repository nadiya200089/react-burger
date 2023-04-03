import React from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import { Modal } from '../modal/modal';
import { useState } from 'react';
import { IngredientDetails } from '../ingridient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredientDrag from '../burgerIngredientDrag/burgerIngredientDrag';

export const Category = React.forwardRef
    (({ title, id, ingredients }, ref) => {
        const { bun, ingredients: constructorIngredients } = useSelector(state => state.constructorStore);

        const [ingredientModal, setIngredientModal] = useState(null);
        const dispatch = useDispatch()
        const closeModalIngredient = () => {
            setIngredientModal(null);
        }

        return (
            <>
                <h2 className="text text_type_main-large mb-6 mt-10" id={id}>{title}</h2>
                <div className={classNames(style.list, 'mb-16')} ref={ref}>

                    {ingredients?.map(data => {

                        const isBun = data.type === 'bun';
                        const counter = [...[bun], ...constructorIngredients].filter(ingredient => ingredient._id === data._id).length;
                        const counterBun = counter > 0 ? counter + 1 : 0;
                        const count = isBun ? counterBun : counter;
                        return <BurgerIngredientDrag
                            data={data}
                            key={data._id}
                            {...data}
                            count={count}
                            onClick={() => setIngredientModal(data)}
                        />
                    }

                    )}
                </div>
                {ingredientModal &&
                    <Modal
                        onClose={closeModalIngredient}
                    >
                        <IngredientDetails data={ingredientModal} />
                    </Modal>}
            </>
        )

    });

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}
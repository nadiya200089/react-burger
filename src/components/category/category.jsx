import style from './style.module.css';
import classNames from 'classnames';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { useEffect, useState } from 'react';
import { IngredientDetails } from '../ingridient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../utils/prop-types';
import { useDispatch } from 'react-redux';
import { addConstructor } from '../services/reducers/constructor';
import BurgerIngredientDrag from '../burgerIngredientDrag/burgerIngredientDrag';


export const Category = ({ title, id, ingredients }) => {
    const [ingredientModal, setIngredientModal] = useState(null);
    const dispatch = useDispatch()
    const closeModalIngredient = () => { 
        setIngredientModal(null) 
    ;}

    useEffect(() => {
        const closeByEsc = (target) => { if (target.key === 'Escape') { setIngredientModal(null) } }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])

    return (
        <>
            <h2 className="text text_type_main-large mb-6 mt-10" id={id}>{title}</h2>
            <div className={classNames(style.list, 'mb-16')}>

                {ingredients?.map(data => <BurgerIngredientDrag data={data} key={data._id}
                {...data}
                
                count={1} onClick={() => {
                    dispatch(addConstructor(data));
                    setIngredientModal(data)
                }
                } />
                // <BurgerIngredient key={data._id} {...data} count={1} onClick={() => { 
                //      dispatch(addConstructor(data));
                //      setIngredientModal(data)}
                //      } />
                     )}
            </div>
            {ingredientModal && <Modal onClose={closeModalIngredient} > <IngredientDetails data={ingredientModal} /> </Modal>}
        </>
    )

};

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}
import classNames from 'classnames';
import style from './style.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../utils/prop-types';


export const IngredientDetails = ({ data }) => {
    return (
        <>
            <div className={classNames(style.title, 'text', 'text_type_main-large')}>Детали ингредиента</div>
            <div>
                <img className={style.image_large} src={data.image_large}></img>
            </div>
            <div className="text text_type_main-medium mb-8">
                {data.name}
            </div>
            <div className={style.details}>
                <div className={classNames(style.element, 'text', 'text_color_inactive')}>
                    <h3 className='text_type_main-small mb-1'>Калории, ккал</h3>
                    <div className='text_type_digits-default'>{data.calories}</div>
                </div>
                <div className={classNames(style.element, 'text', 'text_color_inactive')}>
                    <h3 className='text_type_main-small mb-1'>Белки, г</h3>
                    <div className='text_type_digits-default'>{data.proteins}</div>
                </div>
                <div className={classNames(style.element, 'text', 'text_color_inactive')}>
                    <h3 className='text_type_main-small mb-1'>Жиры, г</h3>
                    <div className='text_type_digits-default'>{data.fat}</div>
                </div>
                <div className={classNames(style.element, 'text', 'text_color_inactive')}>
                    <h3 className='text_type_main-small mb-1'>Углеводы, г</h3>
                    <div className='text_type_digits-default'>{data.carbohydrates}</div>
                </div>
            </div>

        </>

    )

}

// IngredientDetails.propTypes = {
//     ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
// }
import { useEffect, useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import { getIngredients } from "../utils/api";
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor ';

// getIngredients()
// .then(data => {console.log(data)})   здесь к консоли все данные с сервера: объект с массивом ингредиентов


export const App = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
        .then(ingredients => {setIngredients(ingredients.data) 
            console.log(ingredients.data)
        })
        // console.log(data); // data is not defined 
        // console.log(ingredients); //  в консоли пустой массив: []
    }, []);

 

    return (
    <div className={style.app}>
        <AppHeader />
        <h1 className={classNames(style.title, 'text text_type_main-large mt-10 mb-5')}>Соберите бургер</h1>
        <main className={style.main}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor constructorIngredients={ingredients} />
        </main>
    </div>
    )
    
}

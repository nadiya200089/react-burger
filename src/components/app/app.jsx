//import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import { getIngredients } from "../utils/api";
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor ';

export const App = () => {
    const [ingredients, setIngredients] = useState([]);
    console.log(ingredients);

    useEffect(() => {
        getIngredients()
        .then(data => {setIngredients(data)})
    }, [])

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

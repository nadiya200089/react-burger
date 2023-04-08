import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Enter = () => {
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div 
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Вход
            </h2>
            <input type='email' placeholder="email" className={classNames(styles.input, 'mt-6')}></input>
            <input type='password' placeholder="Пароль" className={classNames(styles.input, 'mt-6', 'mb-6')}></input>
            <Button>
                Войти
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Вы - новый пользователь?</p>
                <a onClick={handleNavigateToRegister} className={classNames(styles.button,"text text_color_accent text_type_main-default ml-3")}>Зарегистрироваться</a>
            </div>
            <div className={classNames(styles.paragraph, 'mt-4')}>
                <p  className="text text_color_inactive text_type_main-default">Забыли пароль?</p>
                <p className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Восстановить пароль</p>

            </div>

        </div >
    );
}
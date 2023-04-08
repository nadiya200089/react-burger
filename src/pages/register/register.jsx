import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate('/enter');
    };
    return (
        <div 
        
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
              Регистрация
            </h2>
            <input type='name' placeholder="Имя" className={classNames(styles.input, 'mt-6')}></input>
            <input type='email' placeholder="email" className={classNames(styles.input, 'mt-6')}></input>
            <input type='password' placeholder="Пароль" className={classNames(styles.input, 'mt-6', 'mb-6')}></input>
            <Button>
                Зарегистрироваться
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Уже зарегистрированы?</p>
                <a onClick={handleNavigateToRegister} className="text text_color_accent text_type_main-default ml-3">Войти</a>
            </div>
        </div >
    );
}
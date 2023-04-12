import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPassword = () => {
    const navigate = useNavigate();

    const handleNavigateToEnter = () => {
        navigate('/enter');
    };

        return (
        <div 
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Восстановление пароля
            </h2>
            <input type='password' placeholder="Введите новый пароль" className={classNames(styles.input, 'mt-6')}></input>
            <input type='email' placeholder="Введите код из письма" className={classNames(styles.input, 'mt-6 mb-6')}></input>
            <Button>
                Сохранить
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Вспомнили пароль?</p>
                <a  onClick={handleNavigateToEnter} className={classNames(styles.button,"text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </div >
    );
}
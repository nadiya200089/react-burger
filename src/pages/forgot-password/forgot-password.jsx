import { useState, useEffect } from 'react';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/auth";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {isResetPassword}  = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleNavigateToEnter = () => {
        navigate('/enter');
    };
    const handleResetPassword = () => {
        const req = { email: email }
        dispatch(forgotPassword(req));
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const isDisable = email.length < 1;

    useEffect(() => {
        if (isResetPassword) {
            navigate('/reset-password');
        }
    }, [isResetPassword])
    return (
        <div 
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Восстановление пароля
            </h2>
            <input           
                onChange={handleChange}
                value={email}
                type='email'
                placeholder="Укажите e-mail"
                className={classNames(styles.input, 'pl-5 mt-6 mb-6')}
            />
            <Button 
                disabled={isDisable}
                onClick={handleResetPassword}>
                Сохранить
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Вспомнили пароль?</p>
                <a  onClick={handleNavigateToEnter} className={classNames(styles.button,"text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </div >
    );
}
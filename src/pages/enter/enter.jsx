import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "../../services/actions/auth";

export const Enter = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });
      }
    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    const handleNavigateToForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userData)
      }


      const onLogin = () => {
        dispatch(loginUser(userData));
        navigate('/');
      };

    return (
        <div 
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Вход
            </h2>
            <input
                name='email'
                type='email'
                value={userData.email}
                onChange={handleChange}
                placeholder="email"
                className={classNames(styles.input, 'pl-5 mt-6')}
            />
            <input
                name='password'
                type='password'
                placeholder="Пароль"
                value={userData.password}
                onChange={handleChange}
                className={classNames(styles.input, 'pl-5 mt-6', 'mb-6')}
            />
            <Button onClick={onLogin}>
                Войти
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Вы - новый пользователь?</p>
                <a onClick={handleNavigateToRegister} className={classNames(styles.button,"text text_color_accent text_type_main-default ml-3")}>Зарегистрироваться</a>
            </div>
            <div className={classNames(styles.paragraph, 'mt-4')}>
                <p  className="text text_color_inactive text_type_main-default">Забыли пароль?</p>
                <a onClick={handleNavigateToForgotPassword} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Восстановить пароль</a>

            </div>

        </div >
    );
}
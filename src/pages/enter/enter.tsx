import { useState } from 'react';
import { useDispatch } from "../../services/hooks";
import { useNavigate } from 'react-router-dom';

import classNames from "classnames";
import styles from "./style.module.css";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/actions/auth";

export const Enter = () => {
    const dispatch = useDispatch();

    const [isVisible, setVisible] = useState(false);

    const ChangeVisible = () => {
        debugger;
        setVisible(!isVisible)
    }

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


    const onLogin = () => {
        dispatch(loginUser(userData));
    };

    return (
        <div
            className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Вход
            </h2>
            <EmailInput
                name='email'
                type='email'
                value={userData.email}
                onChange={handleChange}
                placeholder="email"
            />
            <PasswordInput
                name='password'
                value={userData.password}
                onChange={handleChange}
                type={isVisible ? 'text' : 'password'}
                onIconClick={ChangeVisible}
            />

            <Button onClick={onLogin}>
                Войти
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p className="text text_color_inactive text_type_main-default"> Вы - новый пользователь?</p>
                <a onClick={handleNavigateToRegister} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Зарегистрироваться</a>
            </div>
            <div className={classNames(styles.paragraph, 'mt-4')}>
                <p className="text text_color_inactive text_type_main-default">Забыли пароль?</p>
                <a onClick={handleNavigateToForgotPassword} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Восстановить пароль</a>

            </div>

        </div >
    );
}
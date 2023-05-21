import { useState, useEffect } from 'react';
import { useDispatch } from "../../services/hooks";
import { useNavigate } from 'react-router-dom';

import classNames from "classnames";
import styles from "./style.module.css";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/actions/auth";
import { RootStore } from '../../services/store';
import { useSelector } from 'react-redux';

export const Enter = () => {

    const { user } = useSelector((state: RootStore) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // const [isVisible, setVisible] = useState(false);

    // const ChangeVisible = () => {
    //     setVisible(!isVisible)
    // }

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    const handleNavigateToForgotPassword = () => {
        navigate('/forgot-password');
    };


    const onLogin = (evt: any) => {
       evt.preventDefault()
        if (userData) {
            dispatch(loginUser(userData));
        }
    };


    return (
        <form onSubmit={onLogin}
            className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Вход
            </h2>
            <EmailInput
                name='email'
                value={userData.email}
                onChange={handleChange}
                placeholder="email"
            />
            <PasswordInput
                name='password'
                value={userData.password}
                onChange={handleChange}
                placeholder='password'
            />

            <Button
                htmlType="submit">
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

        </form>
    );
}
import { useState } from 'react';
import { useSelector } from "react-redux";
import { logoutUser } from "../../services/actions/auth";

import classNames from "classnames";
import styles from "./style.module.css";
import { Button, CheckMarkIcon, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateInfoUser } from '../../services/actions/auth';

import { RootStore } from '../../services/store';
import { IRegisterData } from '../../types';
import { useDispatch } from '../../services/hooks';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onLogout = () => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (refreshToken) {

            dispatch(logoutUser({
                token: refreshToken
            }));
        }
    };

    return (
        <div className={styles.profile}>
            <div className={styles.wrap}>
                <NavLink className={({ isActive }) => (isActive ? styles.textActive : styles.textInactive)}
                    to="/profile">Профиль</NavLink>
                
                <NavLink className={({ isActive }) => (isActive ? styles.textActive : styles.textInactive)}
                    to="/profile/user-orders">
                    История заказов
                </NavLink>
                <p
                    onClick={onLogout}
                    className={
                        classNames(
                            styles.text,
                            "text text_type_main-medium mb-7 text_color_inactive "
                        )
                    }
                >Выход</p>
                <span className={classNames(styles.span, 'text text_type_main-small text_color_inactive mt-20')}>В этом рвзделе вы можете изменить свои пресональные данные</span>
            </div>
            <Outlet/>
        </div>

    );
}
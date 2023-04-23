import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { logoutUser } from "../../services/actions/auth";

import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateInfoUser } from '../../utils/api';
import pencil from '../../images/Vector.png';
import { RootStore } from '../../services/store';
// import { IRegisterData } from '../../types';
import { useDispatch } from '../../services/hooks';

export const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state
        // : RootStore
        ) => state.auth);
    const [userData, setUserData] = useState
    // <IRegisterData | null>
    (user);

    const handleChange = (e
        // : React.ChangeEvent<HTMLInputElement>
        ) => {
        const { name, value } = e.target;
        if (userData) {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    }
    const updateUser = () => {
        if (userData) {
            dispatch(updateInfoUser(userData))
        }
       
    }
    const Pencil = () => <img src={pencil} alt="pencil" onClick={() => {}} />;

    const onLogout = () => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        dispatch(logoutUser({
            token: refreshToken
        }));
    };

    return (
        <div className={styles.profile}>
            <div className={styles.wrap}>
                <p className={classNames(styles.text, "text text_type_main-medium mt-10 mb-7 ")}>Профиль</p>
                <p className={classNames(styles.text, "text text_type_main-medium mb-7 text_color_inactive ")}>История заказов</p>
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
            <div className={styles.wrapper}>
                <div className={styles.password}>
                    <Input
                        type='text'
                        name='name'
                        placeholder="логин"
                        value={String(userData?.name)}
                        onChange={handleChange}
                        //className={styles.inputPassword}
                    />
                    <Pencil />
                </div>
                <div className={styles.password}>

                    <EmailInput
                        name='email'
                        type='email'
                        placeholder="email"
                        value={String(userData?.email)}
                        onChange={handleChange}
                        //className={styles.inputPassword}

                    />
                    <Pencil />
                </div>
                <div className={styles.password}>

                    <PasswordInput
                        name='password'
                        type='password'
                        placeholder="Пароль"
                        value={String(userData?.password)}
                        onChange={handleChange}
                        //className={styles.inputPassword}
                    />
                    <Pencil />
                </div>
                <Button htmlType="button" onClick={updateUser}>
                    Сохранить
                </Button>
            </div >
        </div>

    );
}
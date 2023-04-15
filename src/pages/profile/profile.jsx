import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";




export const Profile = () => {
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

    const [message, setMessage] = useState('');

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onRegister(userData)
    //   }

    //   const navigate = useNavigate();
    //   const handleNavigateToRegister = () => {
    //     navigate('/enter');
    //   };

    // const onRegister = () => {
    //     dispatch(registerUser(userData));
    // };

    return (
        <div className={styles.profile}>
            <div className={styles.wrap}>
                <p className={classNames(styles.text, "text text_type_main-medium mt-10 mb-7 ")}>Профиль</p>
                <p className={classNames(styles.text, "text text_type_main-medium mb-7 text_color_inactive ")}>История заказов</p>
                <p className={classNames(styles.text, "text text_type_main-medium mb-7 text_color_inactive ")}>Выход</p>
                <span className={classNames(styles.span, 'text text_type_main-small text_color_inactive mt-20')}>В этом рвзделе вы можете изменить свои пресональные данные</span>
            </div>
            <div className={styles.wrapper}>
                <input
                    type='text'
                    name='name'
                    placeholder="логин"
                    value={userData.name}
                    onChange={handleChange}
                    className={classNames(styles.input, 'text text_type_main-small pl-6 mt-6')}>                    
                </input>
                <input
                    name='email'
                    type='email'
                    placeholder="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={classNames(styles.input, 'text text_type_main-small pl-6 mt-6')}
                />
                <input
                    name='password'
                    type='password'
                    placeholder="Пароль"
                    value={userData.password}
                    onChange={handleChange}
                    className={classNames(styles.input, 'text text_type_main-small pl-6 mt-6', 'mb-6')}
                />
            </div >
        </div>

    );
}
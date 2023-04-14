import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";

import { registerUser } from "../../services/actions/auth";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";


export const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData)
  }

  const navigate = useNavigate();
  const handleNavigateToRegister = () => {
    navigate('/enter');
  };

  const onRegister = () => {
    console.log(userData);
    dispatch(registerUser(userData));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-large">
        Регистрация
      </h2>
      <input
        type='text'
        name='name'
        placeholder="логин"
        value={userData.name}
        onChange={handleChange}
        className={classNames(styles.input, 'mt-6')}
      />
      <input
        name='email'
        type='email'
        placeholder="email"
        value={userData.email}
        onChange={handleChange}
        className={classNames(styles.input, 'mt-6')}
      />
      <input
        name='password'
        type='password'
        placeholder="Пароль"
        value={userData.password}
        onChange={handleChange}
        className={classNames(styles.input, 'mt-6', 'mb-6')}
      />
      <Button onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
      <div className={classNames(styles.paragraph, 'mt-20')}>
        <p className="text text_color_inactive text_type_main-default"> Уже зарегистрированы?</p>
        <a onClick={handleNavigateToRegister} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Войти</a>
      </div>
    </div >
  );
}
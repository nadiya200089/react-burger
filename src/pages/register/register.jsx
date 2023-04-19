import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import eye from '../../images/Eye.png';
import classNames from "classnames";
import styles from "./style.module.css";
import { registerUser } from "../../services/actions/auth";

export const Register = () => {
  const dispatch = useDispatch();
  const {isSuccessRegister}  = useSelector((state) => state.auth);

  const Eye = () => <img classname={styles.eye} src={eye} alt="eye" onClick={() => setVisible(!isVisible)} />;
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (isSuccessRegister) {
        navigate('/enter');
    }
}, [isSuccessRegister])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData)
  }

  const navigate = useNavigate();
  const handleNavigateToRegister = () => {
    navigate('/enter');
  };

  const onRegister = () => {
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
        className={classNames(styles.input, 'text text_type_main-small pl-6 mt-6')}
      />
      <input
        name='email'
        type='email'
        placeholder="email"
        value={userData.email}
        onChange={handleChange}
        className={classNames(styles.input, 'text text_type_main-small pl-6 mt-6')}
      />
      <div className={styles.password}>
        <input
          name='password'
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
          className={styles.inputPassword}
          type={isVisible ? 'text' : 'password'}
        />
        <Eye />
      </div>
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
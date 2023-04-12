import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';

export const Register = ({onRegister}) => {

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
    return (
        <div 
        
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
              Регистрация
            </h2>
            <input type='text' placeholder="логин" value={userData.name} onChange={handleChange} className={classNames(styles.input, 'mt-6')}></input>
            <input type='email' placeholder="email" value={userData.email} onChange={handleChange} className={classNames(styles.input, 'mt-6')}></input>
            <input type='password' placeholder="Пароль" value={userData.password} onChange={handleChange} className={classNames(styles.input, 'mt-6', 'mb-6')}></input>
            <Button>
                Зарегистрироваться
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Уже зарегистрированы?</p>
                <a onClick={handleNavigateToRegister} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </div >
    );
}
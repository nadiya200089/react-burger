import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "../../services/hooks";
import { useDispatch } from "../../services/hooks";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import classNames from "classnames";
import styles from "./style.module.css";
import { registerUser } from "../../services/actions/auth";

export const Register = () => {
  const dispatch = useDispatch();
  const { isSuccessRegister } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isSuccessRegister) {
      navigate('/enter');
    }
  }, [isSuccessRegister])

  const onRegister = () => {
    dispatch(registerUser(userData));
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister()
  }

  const navigate = useNavigate();
  const handleNavigateToRegister = () => {
    navigate('/enter');
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h2 className="text text_type_main-large">
        Регистрация
      </h2>
      <Input
        type='text'
        name='name'
        placeholder="логин"
        value={userData.name}
        onChange={handleChange}
      />
      <EmailInput
        name='email'
        placeholder="email"
        value={userData.email}
        onChange={handleChange}
      />
      <PasswordInput
        name='password'
        placeholder="Пароль"
        value={userData.password}
        onChange={handleChange}
      />
      <Button htmlType='submit'>
        Зарегистрироваться
      </Button>
      <div className={classNames(styles.paragraph, 'mt-20')}>
        <p className="text text_color_inactive text_type_main-default"> Уже зарегистрированы?</p>
        <a onClick={handleNavigateToRegister} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Войти</a>
      </div>
    </form>
  );
}
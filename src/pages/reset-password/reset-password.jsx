import {useState} from 'react';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/actions/auth";
import { getCookie } from '../../utils/cookie';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ code, setCode ]  = useState('');
    const [ psw, setPsw ]  = useState('');
    const handleNavigateToEnter = () => {
        navigate('/enter');
    };

    const handleResetPassword = () => {
        const req = {
            password: psw,
            token: code,
        };
        dispatch(resetPassword(req))
    }

    const handleChangeCode = (e) => {
        const value = e.target.value;
        setCode(value);
    };

    const handleChangePsw = (e) => {
        const value = e.target.value;
        setPsw(value);
    };

    return (
        <div 
        className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Восстановление пароля
            </h2>
            <input
                value={psw}
                onChange={handleChangePsw}
                type='password'
                placeholder="Введите новый пароль"
                className={classNames(styles.input, 'pl-5 mt-6')}
            />
            <input 
                placeholder="Введиsте код из письма"
                className={classNames(styles.input, 'pl-5 mt-6 mb-6')}
                value={code}
                onChange={handleChangeCode}
            />
            <Button  onClick={handleResetPassword}>
                Сохранить
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p  className="text text_color_inactive text_type_main-default"> Вспомнили пароль?</p>
                <a  onClick={handleNavigateToEnter} className={classNames(styles.button,"text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </div >
    );
}
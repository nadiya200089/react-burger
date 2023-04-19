import { useState, useEffect } from 'react';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/auth";
import { getCookie } from '../../utils/cookie';
import eye from '../../images/Eye.png';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Eye = () => <img classname={styles.eye} src={eye} alt="eye" onClick={() => setVisible(!isVisible)} />;
    const [isVisible, setVisible] = useState(false);
    const {isSuccessPassword}  = useSelector((state) => state.auth);

    const [code, setCode] = useState('');
    const [psw, setPsw] = useState('');
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

    const isDisable = (code.length < 1) || (psw.length < 1);


    const handleChangeCode = (e) => {
        const value = e.target.value;
        setCode(value);
    };

    const handleChangePsw = (e) => {
        const value = e.target.value;
        setPsw(value);
    };

    useEffect(() => {
        if (isSuccessPassword) {
            navigate('/enter');
        }
    }, [isSuccessPassword])

    return (
        <div
            className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Восстановление пароля
            </h2>
            <div className={styles.password}>
                <input
                    value={psw}
                    onChange={handleChangePsw}
                    placeholder="Введите новый пароль"
                    className={styles.inputPassword}
                    type={isVisible ? 'text' : 'password'}
                />
                <Eye />
            </div>
            <input
                placeholder="Введите код из письма"
                className={classNames(styles.input, 'pl-5 mt-6 mb-6')}
                value={code}
                onChange={handleChangeCode}
            />
            <Button onClick={handleResetPassword} disabled={isDisable}
>
                Сохранить
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p className="text text_color_inactive text_type_main-default"> Вспомнили пароль?</p>
                <a onClick={handleNavigateToEnter} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </div >
    );
}
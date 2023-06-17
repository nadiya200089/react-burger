import { useState, useEffect, FormEvent } from 'react';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import { useDispatch } from "../../services/hooks";


import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { resetPassword } from "../../services/actions/auth";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {isSuccessPassword}  = useSelector((state) => state.auth);

    const [code, setCode] = useState('');
    const [psw, setPsw] = useState('');
    const handleNavigateToEnter = () => {
        navigate('/enter');
    };

    const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = {
            password: psw,
            token: code,
        };
        dispatch(resetPassword(req))
    }

    const isDisable = (code.length < 1) || (psw.length < 1);


    const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCode(value);
    };

    const handleChangePsw = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPsw(value);
    };

    useEffect(() => {
        if (isSuccessPassword) {
            navigate('/enter');
        }
    }, [isSuccessPassword])

    return (
        <form  onSubmit={handleResetPassword}
            className={styles.wrapper}>
            <h2 className="text text_type_main-large">
                Восстановление пароля
            </h2>
            <div className={styles.password}>
                <PasswordInput
                    value={psw}
                    onChange={handleChangePsw}
                    placeholder="Введите новый пароль"
                />
            </div>
            <Input
                placeholder="Введите код из письма"
                value={code}
                onChange={handleChangeCode}
            />
            <Button htmlType='submit'
                     disabled={isDisable}>
                Сохранить
            </Button>
            <div className={classNames(styles.paragraph, 'mt-20')}>
                <p className="text text_color_inactive text_type_main-default"> Вспомнили пароль?</p>
                <a onClick={handleNavigateToEnter} className={classNames(styles.button, "text text_color_accent text_type_main-default ml-3")}>Войти</a>
            </div>
        </form >
    );
}
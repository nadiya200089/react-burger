import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { logoutUser } from "../../services/actions/auth";

import classNames from "classnames";
import styles from "./style.module.css";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateInfoUser } from '../../utils/api';

import { RootStore } from '../../services/store';
import { IRegisterData, IUserData } from '../../types';
import { useDispatch } from '../../services/hooks';

const URI_IMG = `${process.env.PUBLIC_URI}/Vector.png`;
export const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootStore
        ) => state.auth);
    const [userData, setUserData] = useState<IRegisterData | null>
    (user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            //TODO: change any to real type
            const t: any = updateInfoUser(userData);
            dispatch(t)
        }
       
    }
    const Pencil = () => <img src={URI_IMG} alt="pencil" onClick={() => {}} />;

    const onLogout = () => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (refreshToken) {
              //TODO: change any to real type
            const tok:any = logoutUser({
                token: refreshToken
            })
            dispatch(tok);  
        }
    };

    return (
        <form className={styles.profile} onSubmit={updateUser}>
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
                
                    />
                    <Pencil />
                </div>
                <div className={styles.password}>

                    <EmailInput
                        name='email'
                        placeholder="email"
                        value={String(userData?.email)}
                        onChange={handleChange}
                    />
                    <Pencil />
                </div>
                <div className={styles.password}>

                    <PasswordInput
                        name='password'
                        placeholder="Пароль"
                        value={String(userData?.password)}
                        onChange={handleChange}
                        //onIconClick={}
                    />
                    <Pencil />
                </div>
                <Button htmlType="button" >
                    Сохранить
                </Button>
            </div >
        </form>

    );
}
import { useState } from 'react';
import { useSelector } from "react-redux";
import { logoutUser } from "../../services/actions/auth";

import classNames from "classnames";
import styles from "./style.module.css";
import { Button, CheckMarkIcon, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateInfoUser } from '../../services/actions/auth';

import { RootStore } from '../../services/store';
import { IRegisterData } from '../../types';
import { useDispatch } from '../../services/hooks';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootStore
        ) => state.auth);
    const [userData, setUserData] = useState<IRegisterData | null>(user);

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
            dispatch(updateInfoUser(userData))
        }
    }

    return (
            <form onSubmit={updateUser} className={styles.wrapper}>
                    <Input
                        name='name'
                        placeholder="логин"
                        value={String(userData?.name)}
                        onChange={handleChange}
                        icon={'EditIcon'}
                    />
                    <Input
                        name='email'
                        placeholder="email"
                        value={String(userData?.email)}
                        onChange={handleChange}
                        icon={'EditIcon'}
                    />
                    <PasswordInput
                        name='password'
                        placeholder="Пароль"
                        value={String(userData?.password)}
                        onChange={handleChange}
                        icon={'EditIcon'}
                    />
                <Button htmlType="submit" >
                    Сохранить
                </Button>
            </form >
    );
}
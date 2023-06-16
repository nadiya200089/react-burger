import { useState } from 'react';
import { useSelector } from "../../services/hooks";

import styles from "./style.module.css";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateInfoUser } from '../../services/actions/auth';

import { IRegisterData } from '../../types';
import { useDispatch } from '../../services/hooks';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
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
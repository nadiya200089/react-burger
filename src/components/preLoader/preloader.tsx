import React, { FC } from 'react';
import style from "./style.module.css";

export const PreLoader: FC = () => {
    return (
        <div className={style.container}>
            <div className={style.ldsDefault}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};


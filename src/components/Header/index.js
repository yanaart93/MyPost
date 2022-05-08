import React from 'react';
import style from './style.module.css';
import Divider from '@mui/material/Divider';


export const Header = ({ children }) => {
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.header__wrapper}>
                    {children}
                </div>
            </div>
            <Divider />

        </div>
    );
};

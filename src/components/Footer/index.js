import { Link } from '@mui/material'
import React from 'react'
import Logo from '../Logo'

import style from './style.module.css'

export const Footer = () => {
    return (
        <section className={style.footer}>
             <div className="footer__col">
        <Logo className="logo footer__logo" href="#" title="Логотип" />
      </div>
            <div className={style.footer__copyright}>
                <p>Автор проекта:</p>
                <p>
                    <Link href='https://github.com/yanaart93' underline='hover'>
                        {'Артюшкевич Яна'}
                    </Link>
                </p>
               

                <p>2022 ©</p>
            </div>
        </section>
    )
}

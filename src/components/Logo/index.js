import React from "react";
import style from './index.module.css';

import { Link } from 'react-router-dom';
import logo from "../../../public/assets/cat.png";

const Logo = ({className, href, ...props}) => {
	return (
		<Link to='/' className={className? className: "logo"} {...props}>
			<img src={logo} alt="logo" className={style.img} />
		</Link>
	);
};

export default Logo;

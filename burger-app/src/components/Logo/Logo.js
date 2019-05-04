import React from 'react'
import LogoImg from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={LogoImg} alt="buderLogo" />
    </div>
);

export default logo;

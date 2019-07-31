import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../../Navigation/SideDrawer/DrawToggle/DrawToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div><DrawToggle clicked={props.clickSideDraw} /></div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
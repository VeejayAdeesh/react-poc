import React from 'react';
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open]
        console.log(sideDrawerClasses);
    }
    else{
        sideDrawerClasses = [classes.SideDrawer, classes.Close]
        console.log(sideDrawerClasses);
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>
    );
}

export default sideDrawer;
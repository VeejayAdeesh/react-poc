import React from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';

const Layout = (props) => (
    <Aux>
        <div> Toolbar, Navbar, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>

);

export default Layout;
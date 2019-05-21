import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state= {
        showSideDrawer: true
    };

    showSideDrawerHandler = () =>{
        this.setState({showSideDrawer:false})
        console.log("Backdrop Clicked ", this.state.showSideDrawer)
    }
    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.showSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
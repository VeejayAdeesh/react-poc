import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state= {
        showSideDrawer: false
    };

    showSideDrawerHandler = () =>{
        this.setState({showSideDrawer:true})
        console.log("Backdrop Clicked ", this.state.showSideDrawer)
    }

    closeSideDrawerHandler = () =>{
        this.setState({showSideDrawer:false})
        console.log("Backdrop Clicked ", this.state.showSideDrawer)
    }

    render() {
        return (
            <Aux>
                <Toolbar clickSideDraw={this.showSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
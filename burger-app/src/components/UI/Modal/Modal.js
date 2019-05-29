import React, {Component} from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{

    
    // shouldComponentUpdate(nextProp, _nextState){
    //     return nextProp.show !== this.props.show
    // }

    // componentDidUpdate(){
    //     console.log('[Modal] did update')
    // }

    render(){
        return(
            <Aux>
    <Backdrop show={this.props.show} clicked={this.props.clickEvent} />
    <div style={{
        transform: this.props.show ? 'translateY(0)':'translateY(-100)',
        opacity: this.props.show ? '1':'0'
    }}
    className={classes.Modal}>
        {this.props.children}
    </div>
    </Aux>
        )
    }
}

export default Modal;
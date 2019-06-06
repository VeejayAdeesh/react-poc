import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary'



const withErrorHandlers = (WrappedComponets, axios) => {
    return class extends Component{

        state = {
            error: null
        }
         componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(request=>{
                 this.setState({error:null})
                 return request
             })
             this.responseInterceptor = axios.interceptors.response.use(response=>response,error=>{
                 this.setState({error:error})
             })
         }
        // Removes the instance of axios for that particular Component
         componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.request.eject(this.responseInterceptor)
            
         }

        errorHandlerEvent = () =>{
             this.setState({error:null})
         }


        render(){
            return( 
            <Aux>
                <Modal show={this.state.error}
                clickEvent={this.errorHandlerEvent}>
                {this.state.error? this.state.error.message: null}
                </Modal>
                <WrappedComponets {...this.props} />
            </Aux>
            )
        }
    }
}

export default withErrorHandlers
import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandlers from '../../hoc/withErrorHandlers/withErrorHanlers'

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        let fetchData = []
        axios.get('/orders.json').then(response => {
            for(let key in response.data){
                fetchData.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log("Fetched Data",fetchData)
            this.setState({loading:false, orders: fetchData})
        }).catch( error => {
            this.setState({loading: false})
        })
    }
    render(){
        let ordersData = this.state.orders
        return(
            <div>
                { ordersData.map(order => 
                    <Order key = {order.id} ingredients={order.ingredients} totalPrice={order.totalPrice}/>
                )
                }
            </div>
        )
    }
}

export default withErrorHandlers(Orders,axios)
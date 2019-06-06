import React,{Component} from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{

    state ={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    placeholder: 'Delivery Method'
                },
                value:''
            }
        },
        ingredients: null,
        totalPrice:0

    }

    componentWillMount(){
        console.log("Contact Data ",this.props)
        let ingredients=this.props.ingredients
        let totalPrice=this.props.totalPrice
        this.setState({ingredients: ingredients, totalPrice:totalPrice})
    }

    orderHandler = ()=> {
        
        let order={...this.state}
        axios.post('/orders.json', order).then(response => 
            this.setState({ loading: false, purchasing: false }))
             .catch(error => this.setState({ loading: false, purchasing: false }))
             this.props.history.push("/")

    }

    render(){
        let formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                formConfig: this.state.orderForm[key]
            })
        }
        let genereateInputField = formElementArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.formConfig.elementType} 
            elementConfig={formElement.formConfig.elementConfig}
            value={formElement.formConfig.value} />
        ))
        return(
            <div className={classes.ContactData}>
                <h4>Contact Details</h4>
                <form>
                    {genereateInputField}      
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }

}

export default ContactData
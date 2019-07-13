import React, { Component } from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: true,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: true,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: true,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: true,
                touched: false
            },
            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    placeholder: 'Delivery Method'
                },
                value: 'cheapest',
                isValid: true
            }
        },
        formValid: false,

    }

    // componentWillMount() {
    //     console.log("Contact Data ", this.props)
    //     let ingredients = this.props.ing
    //     let totalPrice = this.props.price
    // }

    orderHandler = (event) => {
        event.preventDefault()
        const formValueUpdate = {}
        for(let fieldIdentifier in this.state.orderForm){
            formValueUpdate[fieldIdentifier] = this.state.orderForm[fieldIdentifier].value
            console.log("Form Value Update",formValueUpdate)
        }
        let order = {
            ingredients: this.props.ing,
            totalPrice: this.props.price,
            orderData: formValueUpdate        
         }
         
        axios.post('/orders.json', order).then(response =>
            this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }))
        this.props.history.push("/")

    }

    checkValidation(rules, fieldValue){
        let isValid = true
        if(rules !== undefined){
            if(rules.isRequired){
                isValid = fieldValue.trim() !=='' && isValid
            }
            if(rules.minLength){
                isValid = fieldValue.length >=5 && isValid 
            }
            if(rules.maxLength){
                isValid = fieldValue.length <= 10 && isValid
            }
        console.log(isValid)
        return isValid
        }
        else{
            return isValid;
        }
    }

    inputValueHandler = (event, inputIdentifier) => {
        let formValid = true;
        const updateField = {...this.state.orderForm}
        const updateValueField = {...updateField[inputIdentifier]}
        updateValueField.value = event.target.value
        updateValueField.touched = true 
        updateValueField.isValid = this.checkValidation(updateField[inputIdentifier].validationRule, updateValueField.value)
        updateField[inputIdentifier] = updateValueField
        console.log("Update Value",updateValueField)
        formValid = updateValueField.isValid && formValid
        console.log("Foem Valid",formValid)    
        this.setState({orderForm:updateField, formValid:formValid})
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                formConfig: this.state.orderForm[key]
            })
        }
        let genereateInputField = formElementArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.formConfig.elementType}
                elementConfig={formElement.formConfig.elementConfig}
                value={formElement.formConfig.value} 
                inputValue={(event)=>this.inputValueHandler(event,formElement.id)}
                inValid={!formElement.formConfig.isValid}
                touched={formElement.formConfig.touched}/>
        ))
        return (
            <div className={classes.ContactData}>
                <h4>Contact Details</h4>
                <form onSubmit={this.orderHandler}>
                    {genereateInputField}
                    <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        ing: state.ingredients,
        price: state.basePrice
    }
}

export default connect(mapStateToProps)(ContactData)
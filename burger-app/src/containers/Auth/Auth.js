import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actionTypes from '../../store/actions/index'
import { connect } from 'react-redux'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    isEmail: true
                },
                isValid: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validationRule: {
                    isRequired: true,
                    minLength: 6,
                    maxLength: 10
                },
                isValid: true,
                touched: false
            }
        },
        controlFormValid: false,
        isSignUp: false
    }

    checkValidation = (rules, fieldValue) => {
        let isValid = true
        if (rules !== undefined) {
            if (rules.isRequired) {
                isValid = fieldValue.trim() !== '' && isValid
            }
            if (rules.minLength) {
                isValid = fieldValue.length >= 6 && isValid
            }
            if (rules.maxLength) {
                isValid = fieldValue.length <= 10 && isValid
            }
            if (rules.isEmail) {
                const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                isValid = pattern.test(String(fieldValue).toLowerCase()) && isValid
            }
            return isValid
        }
        else {
            return isValid
        }
    }

    inputHandler = (event, controlFormIdentifier) => {
        let formValid = true;
        const updateField = { ...this.state.controls }
        const updateValueField = { ...updateField[controlFormIdentifier] }
        updateValueField.value = event.target.value
        updateValueField.touched = true
        updateValueField.isValid = this.checkValidation(updateField[controlFormIdentifier].validationRule, updateValueField.value)
        updateField[controlFormIdentifier] = updateValueField
        console.log("Update Value", updateValueField)
        formValid = updateValueField.isValid && formValid
        console.log("Form Valid", formValid)
        this.setState({ controls: updateField, controlFormValid: formValid })
    }

    switchSignInHandlerTrue = () => {
        this.setState({ isSignUp: true })
    }

    switchSignInHandlerFalse = () => {
        this.setState({ isSignUp: false })
    }

    authHanler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render() {
        let formControlArray = []
        for (let key in this.state.controls) {
            formControlArray.push({
                id: key,
                controlForm: this.state.controls[key]
            })
        }
        let formGenerator = formControlArray.map(formKey => (
            <Input key={formKey.id} elementType={formKey.controlForm.elementType}
                elementConfig={formKey.controlForm.elementConfig} value={formKey.controlForm.value}
                inputValue={(event) => this.inputHandler(event, formKey.id)}
                inValid={!formKey.controlForm.isValid}
                touched={formKey.controlForm.touched} />

        ))
        return (
            <div className={classes.Controls}>
                <form onSubmit={this.authHanler}>
                    <div>
                        {formGenerator}
                        <Button btnType="Success" clicked={this.switchSignInHandlerFalse}>Sign Up</Button>
                        <Button btnType="Danger" clicked={this.switchSignInHandlerTrue}>Sign In</Button>
                    </div>
                </form>
            </div>

        );
    }

}

const dispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionTypes.authHelper(email, password, isSignUp))
    }
}
export default connect(null, dispatchToProps)(Auth)
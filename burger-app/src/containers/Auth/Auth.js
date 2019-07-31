import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'

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
                    maxLength: 8
                },
                isValid: true,
                touched: false
            }
        },
        controlFormValid: false
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
                isValid = fieldValue.length <= 8 && isValid
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
            <form>
                <div className={classes.Controls}>
                    {formGenerator}
                    <Button btnType="Success">Sign In</Button>
                </div>
            </form>

        );
    }

}

export default Auth
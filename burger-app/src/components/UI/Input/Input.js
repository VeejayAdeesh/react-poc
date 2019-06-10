import React from 'react'
import classes from './Input.css'

const input = (props) => {

    let inputElement = null
    let inputClass = [classes.InputElement]
    if(props.touched && props.inValid){
        inputClass.push(classes.InValid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClass.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.inputValue} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClass.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.inputValue} />
            break;
        case ('select'):
            inputElement = (<select className={inputClass.join(' ')} value={props.value} onChange={props.inputValue} >
                {props.elementConfig.option.map(optionValue => (
                    <option key={optionValue.value} value={optionValue.value}>{optionValue.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input className={inputClass.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.inputValue} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input
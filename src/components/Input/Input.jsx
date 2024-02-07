import style from './Input.module.css'
import classNames from "classnames";
import {forwardRef} from "react";

const Input = forwardRef(function Input({className, isValid = true, appearence, ...props}, ref) {
    return(
        <input {...props} ref={ref} className={classNames(className, style['input'], {
            [style['invalid']]: !isValid,
            [style['input-title']]: appearence === 'title'
        })}/>
    )
})
export default Input
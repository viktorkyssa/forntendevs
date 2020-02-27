import React from 'react'
import styles from './FormControls.module.css'

const FormControl = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={styles.form_control + " " + (hasError ? styles.error : "")}>
            <div>{props.children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
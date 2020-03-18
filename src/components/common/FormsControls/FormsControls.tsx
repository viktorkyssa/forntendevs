import React from 'react'
import cn from 'classnames'

import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"

import styles from './FormControls.module.css'

type ReactControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<ReactControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={cn(styles.form_control, {[styles.error]: hasError})}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
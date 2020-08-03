import React from "react";
import {Field, Form, Formik} from "formik";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type usersSearchFormObjectType = {
    terms: string
}

const UsersSearchForm = () => {
    const submit = (values: usersSearchFormObjectType, { setSubmitting } : {setSubmitting: (isSubmitting: boolean) => void} ) => {

    }

    return <div>
        <Formik
            initialValues={{ term: '' }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    </div>
}

export default UsersSearchForm
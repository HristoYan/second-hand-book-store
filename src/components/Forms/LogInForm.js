import React from 'react'
import userApiClient from '../../services/user-api-client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom'
import './LogIn&Register.css';

export const LogInForm = () => {
    const { logIn } = useUser();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Too Long!')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Too short')
                .required('Required')
        }),

        onSubmit: async (values) => {
            const body = {
                username: values.username,
                password: values.password

            }
            const user = await userApiClient.login(body);
            logIn(user);
            console.log(user);
            // const response = await userApiClient.fetchUsers();
            // const theOne = Array.from(response).filter(obj => obj.username == values.username && obj.password == values.password);
            // logIn(theOne[0]);
            navigate("/");

        }
    })
    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="username" name='username' type="text" className="validate" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="username">User Name</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.username && formik.errors.username ? <p>{formik.errors.username}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" name='password' type="password" className="validate" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

                <div className="recipe-submit-buttons">
                    <button className="btn waves-effect waves-light" type="submit" name="action" >Log In
                        <i className="material-icons right">send</i>
                    </button>

                    <button className="btn waves-effect waves-light red" type="reset" name="action">Reset
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </div>
        </form>
    )
}
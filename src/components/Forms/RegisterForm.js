import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApiClient from '../../services/user-api-client';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import './LogIn&Register.css';


export const RegisterForm = () => {
    const { logIn } = useUser();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + '/' + time;

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            gender: 'Male',
            role: 'Reader',
            imgUrl: '',
            short_description: '',
            status: 'Active',
            favorites: [],
            date: dateTime,
            lastModification: dateTime
        },

        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            username: Yup.string()
                .max(15, 'Too Long!')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Too short')
                .matches(/\W?\w+?\W+?\w*\W?/, 'Password must contains at least one digit and one non-word character')
                .required('Required'),
            gender: Yup.string()
                .oneOf(['Male', 'Female'])
                .required('Required'),
            role: Yup.string()
                .oneOf(['Reader', 'Seller', 'Admin'])
                .required('Required'),
            imgUrl: Yup.string()
                .url('Invalid URL')
                .required('Required'),
            short_description: Yup.string()
                .max(512, 'Too Long'),
            status: Yup.string()
                .oneOf(['Active', 'Suspended', 'Deactivated'])
                .required('Required'),

        }),
        onSubmit: async (values) => {
            console.log(values);
            const response = await userApiClient.postNewUser(values);
            logIn(response);
            navigate("/");
        }
    });

    console.error(formik.values);

    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" name='name' type="text" placeholder='Name' className="validate" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="username" name='username' type="text" placeholder='Username' className="validate" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                {formik.touched.username && formik.errors.username ? <p>{formik.errors.username}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" name='password' type="password" placeholder='Password' className="validate" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        Gender
                        <p>
                            <label>
                                <input checked={formik.values.gender === "Male"} name="gender" type="radio" value={"Male"} onChange={formik.handleChange("gender")} onBlur={formik.handleBlur} />
                                <span>Male</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input checked={formik.values.gender === "Female"} name="gender" type="radio" value={"Female"} onChange={formik.handleChange("gender")} onBlur={formik.handleBlur} />
                                <span>Female</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        Role
                        <p>
                            <label>
                                <input checked={formik.values.role === "Reader"} name="role" type="radio" value={"Reader"} onChange={formik.handleChange("role")} onBlur={formik.handleBlur} />
                                <span>Reader</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input checked={formik.values.role === "Seller"} name="role" type="radio" value={"Seller"} onChange={formik.handleChange("role")} onBlur={formik.handleBlur} />
                                <span>Seller</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input checked={formik.values.role === "Admin"} name="role" type="radio" value={"Admin"} onChange={formik.handleChange("role")} onBlur={formik.handleBlur} />
                                <span>Admin</span>
                            </label>
                        </p>
                    </div>
                </div>
                {formik.touched.role && formik.errors.role ? <p>{formik.errors.role}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="imgUrl" name='imgUrl' type="url" className="validate" placeholder='Image URL' value={formik.values.imgUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                {formik.touched.imgUrl && formik.errors.imgUrl ? <p>{formik.errors.imgUrl}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="short_description" name='short_description' className="materialize-textarea" placeholder='Short Description' value={formik.values.short_description} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                    </div>
                </div>
                {formik.touched.short_description && formik.errors.short_description ? <p>{formik.errors.short_description}</p> : null}
                <div className="row">
                    <div className="input-field col s12">
                        Status
                        <p>
                            <label>
                                <input checked={formik.values.status === "Active"} name="status" type="radio" value={"Active"} onChange={formik.handleChange("status")} onBlur={formik.handleBlur} />
                                <span>Active</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input checked={formik.values.status === "Suspended"} name="status" type="radio" value={"Suspended"} onChange={formik.handleChange("status")} onBlur={formik.handleBlur} />
                                <span>Suspended</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input checked={formik.values.status === "Deactivated"} name="status" type="radio" value={"Deactivated"} onChange={formik.handleChange("status")} onBlur={formik.handleBlur} />
                                <span>Deactivated</span>
                            </label>
                        </p>
                    </div>
                </div>
                {formik.touched.status && formik.errors.status ? <p>{formik.errors.status}</p> : null}

                <div className="recipe-submit-buttons">
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
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

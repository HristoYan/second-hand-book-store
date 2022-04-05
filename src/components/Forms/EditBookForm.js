import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { csvToArray } from "../utilities/convert";
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export const EditBookForm = ({ initialValue, ...props }) => {
    const { user } = useUser();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + '/' + time;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            seller: user.username,
            sellerId: JSON.parse(sessionStorage.getItem('user')).id,
            condition: Number,
            price: Number,
            imgUrl: '',
            title: '',
            authors: '',
            publisher: '',
            year: '',
            categories: '',
            description: '',
            comments: initialValue.comments,
            bookId: Number,
            date: initialValue.date,
            lastModification: dateTime,
            ...initialValue,
            authors: Array.isArray(initialValue?.authors) ? initialValue.authors.join(", ") : "",
            categories: Array.isArray(initialValue?.categories) ? initialValue.categories.join(", ") : "",
        },

        validationSchema: Yup.object().shape({
            condition: Yup.number()
                .min(1, 'You must choose a number between 1 and 5!')
                .max(5, 'You must choose a number between 1 and 5!')
                .required('Required'),
            price: Yup.number()
                .required('Required'),
            imgUrl: Yup.string()
                .url('Invalid URL')
                .required('Required'),
            title: Yup.string()
                .max(80, 'Too Long!')
                .required('Required'),
            authors: Yup.string()
                .max(80, 'Too Long!')
                .required('Required'),
            publisher: Yup.string()
                .max(80, 'Too Long!')
                .required('Required'),
            year: Yup.string()
                .max(30, 'Too Long!')
                .required('Required'),
            categories: Yup.string()
                .required('Required'),
            description: Yup.string()
                .max(4000, 'Too Long!')
                .required('Required')
        }),

        onSubmit: async (values) => {
            const book = { ...values };
            book.authors = csvToArray(book.authors);
            book.categories = csvToArray(book.categories);
            props.onBookSubmit(book);
            navigate("/");
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <h2 style={{ color: "#2196F3", margin: "50px" }}>Edit Your Book</h2>
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="condition" name='condition' type="number" className="validate" value={formik.values.condition} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="condition">Condition of the book from 1 to 5</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.condition && formik.errors.condition ? <p>{formik.errors.condition}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="price" name='price' type="number" className="validate" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="price">Price</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.condition && formik.errors.condition ? <p>{formik.errors.condition}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="imgUrl" name='imgUrl' type="url" className="validate" value={formik.values.imgUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="imgUrl">Picture URL</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.imgUrl && formik.errors.imgUrl ? <p>{formik.errors.imgUrl}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="title" name='title' type="text" className="validate" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="title">Title</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="authors" name='authors' type="text" className="validate" value={formik.values.authors} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="authors">Title</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.authors && formik.errors.authors ? <p>{formik.errors.authors}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="publisher" name='publisher' type="text" className="validate" value={formik.values.publisher} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="publisher">Publisher</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.publisher && formik.errors.publisher ? <p>{formik.errors.publisher}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="year" name='year' type="text" className="validate" value={formik.values.year} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="year">Year</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.year && formik.errors.year ? <p>{formik.errors.year}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="description" name='description' className="materialize-textarea" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                        <label htmlFor="description">Short Description</label>
                    </div>
                </div>
                {formik.touched.description && formik.errors.description ? <p>{formik.errors.description}</p> : null}

                <div className="row">
                    <div className="input-field col s12">
                        <input id="categories" name='categories' type="text" className="validate" value={formik.values.categories} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="categories">Categories</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                </div>
                {formik.touched.categories && formik.errors.categories ? <p>{formik.errors.categories}</p> : null}

                <div className="book-submit-buttons">
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
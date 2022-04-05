import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { csvToArray } from "../utilities/convert";
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export const GBookToSellForm = ({ book, onBookSubmit }) => {
    const { user } = useUser();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + '/' + time;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            seller: user.username,
            sellerId: user.id,
            condition: Number,
            price: Number,
            imgUrl: book.imgUrl,
            title: book.title,
            authors: book.authors,
            publisher: book.publisher,
            year: book.year,
            categories: book.categories,
            description: book.description,
            comments: [],
            date: dateTime,
            lastModification: dateTime,
            authors: Array.isArray(book?.authors) ? book.authors.join(", ") : "",
            categories: Array.isArray(book?.categories) ? book.categories.join(", ") : "",
        },

        validationSchema: Yup.object().shape({
            condition: Yup.number()
                .min(1, 'You must choose a number between 1 and 5!')
                .max(5, 'You must choose a number between 1 and 5!')
                .required('Required'),
            price: Yup.number()
                .required('Required')
        }),

        onSubmit: async (values) => {
            const book = { ...values };
            book.authors = csvToArray(book.authors);
            book.categories = csvToArray(book.categories);
            onBookSubmit(book);
            navigate("/");
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <h2 style={{ color: "#2196F3", margin: "50px" }}>Sell This Book</h2>
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
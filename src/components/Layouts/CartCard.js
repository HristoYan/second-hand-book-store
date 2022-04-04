import React, { useState } from 'react';
// import './BookCards.css';
// import { useUser } from '../../hooks/useUser';
// import { useNavigate, useParams } from 'react-router-dom';

let price = 0;
const CartCards = ({ car, setTotale }) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(!checked);
        if (!checked) {
            console.log(event.target.value);
            price += +event.target.value;
            console.log(price);
        } else if (checked) {
            price -= +event.target.value;
            console.log(price);
        }
        setTotale(price);
    };
    
    return (
        <>
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src={car.imgUrl} alt="book image" className="circle responsive-img" />
                        </div>
                        <div className="col s10">
                            <span className="black-text">
                                <h5>{car.title}</h5> - for ${car.price}
                                <p>
                                    <label>
                                        <input type="checkbox" className="filled-in" name={car.title} value={car.price} checked={checked} onChange={handleChange} />
                                        <span>Check out</span>
                                    </label>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartCards
import React, { useState } from 'react';

const CartCards = ({ car, changeTotale, setOrder }) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(!checked);
        console.log(event.target.checked);
        console.log(event.target.id);
        if(!checked) {
            
            changeTotale(Number(event.target.value))
        } else {
            changeTotale(-Number(event.target.value))
        }
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
                                        <input type="checkbox" className="filled-in" id={car.id} name={car.title} value={car.price} checked={checked} onChange={handleChange} />
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
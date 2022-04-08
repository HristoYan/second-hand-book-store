import React, { useState } from 'react';

const CartCards = ({ product, addProduct, removeProduct }) => {

    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(!checked);
        console.log(event.target.checked);
        console.log(event.target.id);
        if(!event.target.checked) {
            removeProduct(event.target.id, +event.target.value);
        } else {
            addProduct(event.target.id, +event.target.value);
        }
    };
    
    return (
        <>
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src={product.imgUrl} alt="book image" className="circle responsive-img" />
                        </div>
                        <div className="col s10">
                            <span className="black-text">
                                <h5>{product.title}</h5> - for ${product.price}
                                <p>
                                    <label>
                                        <input type="checkbox" className="filled-in" id={product.id} name={product.title} value={product.price} checked={checked} onChange={handleChange} />
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
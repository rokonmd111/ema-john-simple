import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.products;
    return (
        <div>
            <h3 className='product-name'>{name}</h3>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <button onClick={ () => props.removeItem(key)} className='main-btn'>Remove Item</button>
        </div>
    );
};

export default ReviewItem;
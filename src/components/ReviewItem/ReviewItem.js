import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity } = props.products;
    const productsStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    }
    return (
        <div style={productsStyle}>
            <h3 className='product-name'>{name}</h3>
            <p>Quantity: {quantity}</p>
            <br />
            <button className='main-btn'>Remove Item</button>
        </div>
    );
};

export default ReviewItem;
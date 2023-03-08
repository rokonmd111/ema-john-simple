import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;

    let productPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        productPrice = productPrice + product.price 
    }

    let shippingCost = 0;
    if (productPrice > 500) {
        shippingCost = 0;
    }
    else if (productPrice > 100){
        shippingCost = 6.99;
    }
    else if (productPrice > 0){
        shippingCost = 12.99;
    }

    const tax = (productPrice / 10);

    const totalPrice = productPrice + tax;

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Item Ordered: {cart.length}</p>
            <p>Product Price: {Rounded(productPrice)}</p>
            <p>Shipping Cost: {Rounded(shippingCost)}</p>
            <p><small>Tax + Vat: {Rounded(tax)}</small></p>
            <p>Total Price: {Rounded(totalPrice)}</p>
            <Link to='/review'>
            <button className='main-btn'>Review Order</button>
            </Link>
        </div>
    );
};

function Rounded(num) {
   const convertNum = num.toFixed(2);
   return Number(convertNum)
}

export default Cart;
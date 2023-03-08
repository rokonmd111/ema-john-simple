import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getStoredCart } from '../../utilities/fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect( () => {
        const saveCart = getStoredCart();
        const productKeys = Object.keys(saveCart);
        const countProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = saveCart[key];
            return product
        });
        setCart(countProducts);
    }, [])
    return (
        <div>
            <h1>Ordered Item: {cart.length}</h1>
            {
                cart.map( pd => <ReviewItem key={pd.key} products={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakeData';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaces, setOrderPlaces] = useState(false);

    const handleOrder = () => {
        setCart([]);
        setOrderPlaces(true);
        clearTheCart();
    };

    const removeItem = (itemKey) => {
        const newCart = cart.filter( item => item.key !== itemKey );
        setCart(newCart);
        deleteFromDb(itemKey);
    };

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

    let thakYou;
    if (orderPlaces) {
        thakYou = <img src={happyImg} alt="" />
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                <h1>Ordered Item: {cart.length}</h1>
                {
                    cart.map( pd => <ReviewItem removeItem={removeItem} key={pd.key} products={pd}></ReviewItem>)
                }
                {thakYou}
            </div>
            <div className='card-container'>
                <Cart cart={cart}>
                    <button onClick={handleOrder} className='main-btn'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
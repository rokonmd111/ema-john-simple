import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakeData';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([])
    const [orderPlaces, setOrderPlaces] = useState(false);

    const handleCheckOut = () => {
        navigate('/shipment')
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
                    <button onClick={handleCheckOut} className='main-btn'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
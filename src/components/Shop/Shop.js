import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakeData';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getStoredCart();
        const findKey = Object.keys(saveCart);
        const previousCart = findKey.map(pdKey => {
            const product = fakeData.find( pd => pd.key === pdKey);
            product.quantity = saveCart[pdKey];
            return product;
        });
        setCart(previousCart);
    }, [])

    function handleProducts(product) {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key, count);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                 products.map(product => <Product key={product.key} button={true} handleProducts={handleProducts} product={product}></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                    <button className='main-btn'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
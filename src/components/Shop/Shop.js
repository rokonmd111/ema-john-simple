import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakeData';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    function handleProducts(product) {
        const newCart = [...cart, product]
        setCart(newCart);
        const SameProducts = newCart.filter(pd => pd.key === product.key);
        const count = SameProducts.length
        addToDb(product.key, count)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                 products.map(product => <Product key={product.key} button={true} handleProducts={handleProducts} product={product}></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
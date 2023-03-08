import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    const handleProducts = props.handleProducts;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/" + key}>{name}</Link></h4>
                <p><small>By: {seller}</small></p>
                <br />
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.button &&  <button onClick={() => handleProducts(props.product)} className='main-btn'>
                    <FontAwesomeIcon icon={faShoppingCart} />Add to Card</button>}
            </div>
        </div>
    );
};

export default Product;
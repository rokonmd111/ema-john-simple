import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductsDetails = () => {
    const { Key } = useParams();
    const product = fakeData.find(pd => pd.key === Key);
    return (
        <div>
            <h1>Details Coming Soon....</h1>
            <Product button={false} product={product}></Product>
        </div>
    );
};

export default ProductsDetails;
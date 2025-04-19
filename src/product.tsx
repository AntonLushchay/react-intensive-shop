import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Review } from './Review.tsx';

import rating from './assets/img/rating.svg';
import cartWhite from './assets/img/cartWhite.svg';
import arrowBack from './assets/img/arrowBack.svg';

import type { ProductType } from './BestSellers.tsx';

export const Product = () => {
    const [product, setProducts] = useState<ProductType | null>(null);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://masterclass.kimitsu.it-incubator.io/api/products/${id}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    function addToCart() {
        const button = document.querySelector('.addToCart');
        if (button) {
            button.classList.add('clicked');
            alert('Added to cart');
        }
    }

    return (
        <div>
            <div className='arrowBack'>
                <Link to='/'>
                    <img src={arrowBack} alt='arrow back' />
                    Back to Best Sellers
                </Link>
            </div>

            <div className='product'>
                <img src={product.image} alt='' />
                <div className='info'>
                    <p className='title'>{product.title}</p>
                    <p className='price'>$ {product.price}</p>
                    <div className='rating'>
                        <p>Rating: {product.rating.rate}</p>
                        <img src={rating} alt='' />
                    </div>
                    <div className='category'>
                        <span>Category:</span>
                        <p>{product.category}</p>
                    </div>
                    <p className='description'>{product.description}</p>
                    <button onClick={addToCart} className='addToCart'>
                        <img src={cartWhite} alt='' />
                        Add to cart
                    </button>
                </div>
            </div>
            <div>
                <Review />
            </div>
        </div>
    );
};

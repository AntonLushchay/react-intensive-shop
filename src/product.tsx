import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Review } from './Review';
import { useCart } from './CartContext';
import { ProductType } from './BestSellers';

import rating from './assets/img/rating.svg';
import cartWhite from './assets/img/cartWhite.svg';
import arrowBack from './assets/img/arrowBack.svg';

export const Product = () => {
    const [product, setProducts] = useState<ProductType | null>(null);
    const { toggleCartItem, isProductInCart } = useCart();

    const { id } = useParams();
    const productId = id ? parseInt(id) : 0;

    useEffect(() => {
        axios
            .get(`https://masterclass.kimitsu.it-incubator.io/api/products/${id}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const isInCart = isProductInCart(productId);

    function handleToggleCart() {
        const button = document.querySelector('.addToCart');
        if (button) {
            if (isInCart) {
                // Если товар уже в корзине, удаляем его
                button.classList.remove('clicked');
            } else {
                // Если товара нет в корзине, добавляем его
                button.classList.add('clicked');
            }
            toggleCartItem(productId);
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
                    <button onClick={handleToggleCart} className={`addToCart ${isInCart ? 'clicked' : ''}`}>
                        <img src={cartWhite} alt='' />
                        {isInCart ? 'Remove from cart' : 'Add to cart'}
                    </button>
                </div>
            </div>
            <div>
                <Review />
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductType } from '../models/ProductModel';
import ProductController from '../controllers/ProductController';
import CartController from '../controllers/CartController';
import { Review } from './Review';

import rating from '../assets/img/rating.svg';
import cartWhite from '../assets/img/cartWhite.svg';
import arrowBack from '../assets/img/arrowBack.svg';

export const Product: React.FC = () => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id) : 0;

    // Отдельный эффект для загрузки продукта, запускается только при изменении id
    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                if (id) {
                    const productData = await ProductController.getProductById(id);
                    if (productData) {
                        setProduct(productData);
                        setIsInCart(CartController.isProductInCart(productData.id));
                    }
                }
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]); // Зависимость только от id

    // Отдельный эффект для подписки на изменения корзины
    useEffect(() => {
        if (!product) return;

        // Проверяем статус товара в корзине при каждом изменении
        setIsInCart(CartController.isProductInCart(productId));

        // Подписываемся на изменения в корзине
        const unsubscribe = CartController.addCartChangeListener(() => {
            if (productId) {
                setIsInCart(CartController.isProductInCart(productId));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [productId, product]); // Зависит от productId и product, но product используется только для проверки наличия

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleToggleCart = () => {
        CartController.toggleCartItem(productId);
    };

    return (
        <div>
            <div className='arrowBack'>
                <Link to='/'>
                    <img src={arrowBack} alt='arrow back' />
                    Back to Best Sellers
                </Link>
            </div>

            <div className='product'>
                <img src={product.image} alt={product.title} />
                <div className='info'>
                    <p className='title'>{product.title}</p>
                    <p className='price'>$ {product.price}</p>
                    <div className='rating'>
                        <p>Rating: {product.rating.rate}</p>
                        <img src={rating} alt='rating' />
                    </div>
                    <div className='category'>
                        <span>Category:</span>
                        <p>{product.category}</p>
                    </div>
                    <p className='description'>{product.description}</p>
                    <button onClick={handleToggleCart} className={`addToCart ${isInCart ? 'clicked' : ''}`}>
                        <img src={cartWhite} alt='cart icon' />
                        {isInCart ? 'Remove from cart' : 'Add to cart'}
                    </button>
                </div>
            </div>

            <div>
                <Review productId={productId} />
            </div>
        </div>
    );
};

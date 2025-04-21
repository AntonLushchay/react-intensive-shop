import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartController from '../controllers/CartController';
import { ProductType } from '../models/ProductModel';
import rating from '../assets/img/rating.svg';
import arrowBack from '../assets/img/arrowBack.svg';

export const Cart: React.FC = () => {
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        // Инициализация данных о корзине
        updateCartData();

        // Подписываемся на изменения в корзине
        const unsubscribe = CartController.addCartChangeListener(() => {
            updateCartData();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const updateCartData = () => {
        setCartProducts(CartController.getCartProducts());
        setCartCount(CartController.getCartCount());
        setCartTotal(CartController.getCartTotal());
    };

    // Функция получения количества для товара
    const getQuantity = (productId: number): number => {
        return CartController.getQuantity(productId);
    };

    // Функция обновления количества товара
    const handleUpdateQuantity = (productId: number, quantity: number) => {
        CartController.updateQuantity(productId, quantity);
    };

    // Функция удаления товара из корзины
    const handleRemoveFromCart = (productId: number) => {
        CartController.removeFromCart(productId);
    };

    return (
        <div className='cartPage'>
            <div className='arrowBack'>
                <Link to='/'>
                    <img src={arrowBack} alt='arrow back' />
                    Back to Best Sellers
                </Link>
            </div>

            <h2>Your Shopping Cart</h2>

            {/* Сводная информация о корзине - закреплена справа вверху */}
            <div
                className='cartSummary'
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#ffffff',
                    padding: '15px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    minWidth: '200px',
                }}>
                <h3>Order Summary</h3>
                <div style={{ marginBottom: '10px' }}>
                    <p>
                        <strong>Total Items:</strong> {cartCount}
                    </p>
                    <p>
                        <strong>Total Price:</strong> ${cartTotal.toFixed(2)}
                    </p>
                </div>
                <button
                    style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }}>
                    Checkout
                </button>
            </div>

            {cartProducts.length === 0 ? (
                <div className='emptyCart' style={{ textAlign: 'center', margin: '40px 0' }}>
                    <h3>Your cart is empty</h3>
                    <p>
                        Go to <Link to='/'>Best Sellers</Link> to add products
                    </p>
                </div>
            ) : (
                <div
                    className='cartItems'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        maxWidth: '800px',
                    }}>
                    {cartProducts.map((product) => {
                        const quantity = getQuantity(product.id);

                        return (
                            <div
                                key={product.id}
                                className='cartItem'
                                style={{
                                    display: 'flex',
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    position: 'relative',
                                }}>
                                <Link
                                    to={`/product/${product.id}`}
                                    style={{
                                        display: 'flex',
                                        flex: 1,
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}>
                                    <div className='cartItemImage' style={{ flex: '0 0 120px', marginRight: '15px' }}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{
                                                width: '100%',
                                                height: '120px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>

                                    <div className='cartItemDetails' style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.title}</h3>
                                        <p
                                            className='price'
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                margin: '5px 0',
                                            }}>
                                            ${product.price}
                                        </p>
                                        <div
                                            className='rating'
                                            style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                            <p style={{ marginRight: '5px' }}>Rating: {product.rating.rate}</p>
                                            <img src={rating} alt='rating' />
                                        </div>
                                        <div className='category' style={{ margin: '5px 0' }}>
                                            <span>Category: </span>
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    margin: 0,
                                                    backgroundColor: '#f0f0f0',
                                                    padding: '3px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                }}>
                                                {product.category}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Кнопка удаления товара из корзины */}
                                <button
                                    onClick={() => handleRemoveFromCart(product.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    aria-label='Remove from cart'>
                                    ×
                                </button>

                                {/* Элементы управления количеством товара */}
                                <div
                                    className='quantity-controls'
                                    style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        right: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#f8f8f8',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        overflow: 'hidden',
                                    }}
                                    onClick={(e) => e.preventDefault()} // Предотвращаем переход по ссылке при клике на элементы управления
                                >
                                    <button
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: 'none',
                                            borderRight: '1px solid #ddd',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                        onClick={() => handleUpdateQuantity(product.id, quantity - 1)}>
                                        -
                                    </button>

                                    <input
                                        type='number'
                                        min='1'
                                        value={quantity}
                                        onChange={(e) =>
                                            handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)
                                        }
                                        style={{
                                            width: '40px',
                                            height: '30px',
                                            border: 'none',
                                            textAlign: 'center',
                                            appearance: 'textfield',
                                        }}
                                    />

                                    <button
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            border: 'none',
                                            borderLeft: '1px solid #ddd',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                        onClick={() => handleUpdateQuantity(product.id, quantity + 1)}>
                                        +
                                    </button>
                                </div>

                                {/* Отображение общей стоимости товара */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        right: '120px',
                                        fontWeight: 'bold',
                                    }}>
                                    Total: ${(product.price * quantity).toFixed(2)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

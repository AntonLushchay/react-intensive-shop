import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import rating from './assets/img/rating.svg';
import arrowBack from './assets/img/arrowBack.svg';

export const Cart = () => {
    const { cartProducts, removeFromCart, cartCount, getCartTotal } = useCart();
    const cartTotal = getCartTotal();

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
            <div className='cartSummary' style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                zIndex: 100,
                minWidth: '200px'
            }}>
                <h3>Order Summary</h3>
                <div style={{ marginBottom: '10px' }}>
                    <p><strong>Total Items:</strong> {cartCount}</p>
                    <p><strong>Total Price:</strong> ${cartTotal.toFixed(2)}</p>
                </div>
                <button 
                    style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Checkout
                </button>
            </div>
            
            {cartProducts.length === 0 ? (
                <div className='emptyCart' style={{ textAlign: 'center', margin: '40px 0' }}>
                    <h3>Your cart is empty</h3>
                    <p>Go to <Link to="/">Best Sellers</Link> to add products</p>
                </div>
            ) : (
                <div className='cartItems' style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    maxWidth: '800px'
                }}>
                    {cartProducts.map((product) => (
                        <div key={product.id} className='cartItem' style={{
                            display: 'flex',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            padding: '15px',
                            position: 'relative'
                        }}>
                            <Link to={`/product/${product.id}`} style={{
                                display: 'flex',
                                flex: 1,
                                textDecoration: 'none',
                                color: 'inherit'
                            }}>
                                <div className='cartItemImage' style={{ flex: '0 0 120px', marginRight: '15px' }}>
                                    <img 
                                        src={product.image} 
                                        alt={product.title} 
                                        style={{
                                            width: '100%',
                                            height: '120px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                
                                <div className='cartItemDetails' style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.title}</h3>
                                    <p className='price' style={{ 
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        margin: '5px 0'
                                    }}>
                                        ${product.price}
                                    </p>
                                    <div className='rating' style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                                        <p style={{ marginRight: '5px' }}>Rating: {product.rating.rate}</p>
                                        <img src={rating} alt='rating' />
                                    </div>
                                    <div className='category' style={{ margin: '5px 0' }}>
                                        <span>Category: </span>
                                        <p style={{ 
                                            display: 'inline-block', 
                                            margin: 0,
                                            backgroundColor: '#f0f0f0',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}>
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            
                            <button 
                                onClick={() => removeFromCart(product.id)}
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
                                    cursor: 'pointer'
                                }}
                                aria-label="Remove from cart"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
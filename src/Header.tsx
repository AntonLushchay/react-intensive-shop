import logo from './assets/img/logo.svg';
import cart from './assets/img/cart.svg';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

export const Header = () => {
    const { cartCount } = useCart();
    
    return (
        <div className='header'>
            <Link to="/">
                <img src={logo} alt='logo icon' />
            </Link>
            <Link to="/cart" className="cart-container" style={{ position: 'relative', display: 'inline-block' }}>
                <img src={cart} alt='cart icon' />
                {cartCount > 0 && (
                    <span 
                        style={{ 
                            position: 'absolute', 
                            top: '-8px', 
                            right: '-8px', 
                            backgroundColor: '#ff4d4d', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '20px', 
                            height: '20px', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                    >
                        {cartCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

import logo from './assets/img/logo.svg';
import cart from './assets/img/cart.svg';

export const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt='logo icon' />
            <img src={cart} alt='cart icon' />
        </div>
    );
};

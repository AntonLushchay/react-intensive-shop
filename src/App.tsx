import './App.css';
import { Header } from './Header';
import { Product } from './product';
import { BestSellers } from './BestSellers';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { Cart } from './Cart';

function App() {
    return (
        <CartProvider>
            <div className='appContainer'>
                <Header />
                <Routes>
                    <Route path='/' element={<BestSellers />} />
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </div>
        </CartProvider>
    );
}

export default App;

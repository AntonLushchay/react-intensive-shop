import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext';

// Views
import { Header } from './views/Header';
import { BestSellers } from './views/BestSellers';
import { Product } from './views/Product';
import { Cart } from './views/Cart';

function App() {
    return (
        <AppProvider>
            <div className='appContainer'>
                <Header />
                <Routes>
                    <Route path='/' element={<BestSellers />} />
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </div>
        </AppProvider>
    );
}

export default App;

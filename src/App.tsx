import './App.css';
import { Header } from './Header.tsx';
import { Product } from './product.tsx';
import { BestSellers } from './BestSellers.tsx';
import { Route, Routes } from 'react-router';

function App() {
    return (
        <div className='appContainer'>
            <Header />
            <Routes>
                <Route path='/' element={<BestSellers />} />
                <Route path='/product/:id' element={<Product />} />
            </Routes>
        </div>
    );
}

export default App;

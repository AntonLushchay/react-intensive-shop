import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <App />
    </HashRouter>,
);

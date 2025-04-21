import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <App />
    </HashRouter>,
);

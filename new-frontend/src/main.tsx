import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ScrollToTop from './utils/ScrollToTop.tsx';
import { CartProvider } from './context/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
    <Router>
        <CartProvider>
            <ScrollToTop />
            <App />
        </CartProvider>
    </Router>,
);

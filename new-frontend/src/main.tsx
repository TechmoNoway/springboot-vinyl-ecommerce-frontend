import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ScrollToTop from './utils/ScrollToTop.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <Router>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CartProvider>
                    <ScrollToTop />
                    <App />
                </CartProvider>
            </PersistGate>
        </Provider>
    </Router>,
);

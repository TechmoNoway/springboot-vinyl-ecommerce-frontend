import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AudioPlayerProvider>
                <ScrollToTop />
                <App />
              </AudioPlayerProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </Router>
);

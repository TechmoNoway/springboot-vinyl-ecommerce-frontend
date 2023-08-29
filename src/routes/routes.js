import config from '~/config';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import ErrorLayout from '~/layouts/ErrorLayout/ErrorLayout';
import LoginLayout from '~/layouts/LoginLayout/LoginLayout';
import Admin from '~/pages/Admin';
import Cart from '~/pages/Cart';
import Category from '~/pages/Category';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Page404 from '~/pages/Page404';
import Payment from '~/pages/Payment';
import ProductDetail from '~/pages/ProductDetail';
import Profile from '~/pages/Profile';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.product, component: ProductDetail },
    { path: config.routes.category, component: Category },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.page404, component: Page404, layout: ErrorLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

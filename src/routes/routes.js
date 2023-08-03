import config from '~/config';
import LoginLayout from '~/layouts/LoginLayout/LoginLayout';
import Category from '~/pages/Category';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import ProductDetail from '~/pages/ProductDetail';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.product, component: ProductDetail },
    {path: config.routes.category, component: Category}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

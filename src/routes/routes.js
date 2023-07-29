import config from '~/config';
import LoginLayout from '~/layouts/LoginLayout/LoginLayout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: LoginLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

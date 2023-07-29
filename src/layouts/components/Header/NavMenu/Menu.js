import classNames from 'classnames/bind';
import styles from './NavMenu.module.scss';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItem';

const cx = classNames.bind(styles);

const navbarItems = [
    {
        title: 'MÂM ĐĨA',
        to: '/',
    },
    {
        title: 'CHO NGƯỜI MỚI',
        to: '/',
    },
    {
        title: 'BLOG',
        to: '/',
    },
];

function NavMenu() {
    return (
        <nav>
            <NavLink to={'/'} className={cx('nav-item')}>
                <span className={cx('title')}>ĐĨA THAN</span>
            </NavLink>

            {navbarItems.map((item, index) => {
                return <NavItem key={index} to={item.to} title={item.title} />;
            })}
        </nav>
    );
}

export default NavMenu;

import classNames from "classnames/bind";
import styles from './NavMenu.module.scss'
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles)

function NavItem({to, title}) {
    return (
        <NavLink to={to} className={cx('nav-item')}>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default NavItem;
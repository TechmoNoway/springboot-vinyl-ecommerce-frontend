import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import NavMenu from './NavMenu/Menu';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleQuestion,
    faGear,
    faHeart,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import AccountMenu from './AccountMenu/AccountMenu';
import { Link } from 'react-router-dom';
import CartMenu from './CartMenu/CartMenu';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

const USER_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Wishlist',
        to: '/wishlist',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Login/Sign Up',
        to: '/login',
        separate: true,
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(false);

    // const [user, setUser] = useState({});

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem('userInfoData');
    //     if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         setUser(foundUser);
    //         setCurrentUser(true)
    //     }
    // }, []);

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            setCurrentUser(true);
        }

        if (JSON.stringify(user) === '{}' && localStorage.getItem('userInfoData')) {
            setUser(JSON.parse(localStorage.getItem('userInfoData')));
            setCurrentUser(true);
        }
    }, [user, setUser]);

   


    const cartItems = [
        // {
        //     image: 'https://vocrecords.vn/wp-content/uploads/2021/04/blackpink-the-album-pink-front-150x150.jpg',
        //     to: '/',
        //     name: 'Blackpink - the Album',
        //     price: '910,000đ',
        // },
        // {
        //     image: 'https://vocrecords.vn/wp-content/uploads/2021/04/blackpink-the-album-pink-front-150x150.jpg',
        //     to: '/',
        //     name: 'Blackpink - the Album',
        //     price: '910,000đ',
        // },
        // {
        //     image: 'https://vocrecords.vn/wp-content/uploads/2021/04/blackpink-the-album-pink-front-150x150.jpg',
        //     to: '/',
        //     name: 'Blackpink - the Album',
        //     price: '910,000đ',
        // },
    ];

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faHeart} />,
            title: 'Wishlist',
            to: '/wishlist',
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@phuluon',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
            separate: true,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            to: '/login',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img className={cx('logo-link')} src="https://i.ibb.co/5v0CfZj/LOGO2.png" alt=""></img>
                    </Link>
                </div>

                <div className={cx('menu')}>
                    <NavMenu />
                </div>

                <Search />

                <CartMenu items={cartItems}>
                    <button className={cx('user-cart')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </CartMenu>

                <AccountMenu items={currentUser ? userMenu : USER_ITEMS}>
                    {currentUser ? (
                        <img src={user.avatar} alt="" className={cx('user-avatar')}></img>
                    ) : (
                        <button className={cx('user-button')}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                    )}
                </AccountMenu>
            </div>
        </header>
    );
}

export default Header;

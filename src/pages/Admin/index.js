import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('UserToken')) {
        } else {
            navigate('/page404');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />

            <nav className={cx('admin-nav')}>
                <div className={cx('logo-name')}>
                    <div className={cx('logo-image')}>
                        <img
                            className={cx('logo-detail-image')}
                            src="./Images/cat-ocean-eyes-xh-1920x1080.jpg"
                            alt=""
                        />
                    </div>

                    <span className={cx('logo_name')}>SOLEIL RECORDS</span>
                </div>

                <div className={cx('menu-items')}>
                    <ul className={cx('nav-links')}>
                        <li className={cx('nav-link-title')}>
                            <a className={cx('item-link')} href="/">
                                <i className={cx('uil uil-estate')}></i>
                                <span className={cx('link-name')}>User</span>
                            </a>
                        </li>
                        <li className={cx('nav-link-title')}>
                            <a className={cx('item-link')} href="/">
                                <i className={cx('uil uil-files-landscapes')}></i>
                                <span className={cx('link-name')}>Product</span>
                            </a>
                        </li>
                        <li className={cx('nav-link-title')}>
                            <a className={cx('item-link')} href="/">
                                <i className={cx('uil uil-chart')}></i>
                                <span className={cx('link-name')}>Order</span>
                            </a>
                        </li>
                        <li className={cx('nav-link-title')}>
                            <a className={cx('item-link')} href="/">
                                <i className={cx('uil uil-thumbs-up')}></i>
                                <span className={cx('link-name')}>Category</span>
                            </a>
                        </li>
                    </ul>

                    <ul className={cx('logout-mode')}>
                        <li>
                            <a href="/">
                                <i className={cx('uil uil-signout')}></i>
                                <span className={cx('link-name')}>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <section className={cx('dashboard')}>
                <div className={cx('top')}>
                    <div className={cx('search-box')}>
                        <i className={cx('uil uil-search')}></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                    <img src="images/profile.jpg" alt="" />
                </div>

                <div className={cx('dash-content')}>
                    <div className="content">
                        <div className="container">
                            <h2 className="mb-5 mt-4 mx-5">User List</h2>

                            <div className="table-responsive mx-5">
                                <table className="table table-striped custom-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Fullname</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1392</td>
                                            <td>James Yates</td>
                                            <td>Web Designer</td>
                                            <td>+63 983 0962 971</td>
                                            <td>NY University</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
}

export default Admin;

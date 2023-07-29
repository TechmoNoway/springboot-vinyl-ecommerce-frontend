import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <section className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('heading')}>
                    <div className={cx('more-experience')}>
                        <Link to="/">
                            <img className={cx('logo-link')} src="https://i.ibb.co/5v0CfZj/LOGO2.png" alt=""></img>
                        </Link>
                        <p className={cx('more-experience-text')}>TRẢI NGHIỆM ÂM NHẠC TỐT HƠN</p>
                    </div>

                    <div className={cx('infomation')}>
                        <h3 className={cx('infomation-title')}>THÔNG TIN</h3>
                        <div className={cx('infomation-links')}>
                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    About Us
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Mixtape
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Newsletter
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={cx('help')}>
                        <h3 className={cx('help-title')}>TRỢ GIÚP</h3>
                        <div className={cx('help-links')}>
                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Giao hàng
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Thanh toán
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Liên hệ
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Hướng dẫn mua hàng
                                </Link>
                            </div>

                            <div className={cx('link-item')}>
                                <Link className={cx('link-item-text')} to="/">
                                    Chính sách bảo mật
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('bottom')}>
                    Copyright 2022 © <b>SOLEILMUSIC.</b> Powered by teks.info
                </div>
            </div>
        </section>
    );
}

export default Footer;

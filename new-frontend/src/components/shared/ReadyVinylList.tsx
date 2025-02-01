import { FaFacebook, FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getReadyProducts } from '@/services/ProductService';
import { useEffect, useState } from 'react';

const ReadyVinylList = () => {
    const [readyDiscList, setReadyDiscList] = useState([]);

    const fetchReadyDiscList = async () => {
        try {
            const response = await getReadyProducts();
            setReadyDiscList(response?.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReadyDiscList();
    }, []);

    return (
        <>
            <section>
                <div>
                    <div>
                        <span>ĐĨA THAN SẴN SÀNG</span>
                        <span>XEM ĐĨA GIẢM GIÁ</span>
                    </div>

                    <div>
                        {/* {bestDiscList.map((item) => (
                            <div key={item.id} className={cx('vinyl-product')}>
                                <Link to={`/product/${item.albumName}`} className={cx('touch-link-product')}>
                                    <img className={cx('vinyl-image')} src={item.image} alt="" loading="lazy"></img>
                                </Link>
                                <div className={cx('add-links-wrap')}>
                                    <div className={cx('favorite-product-button')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('favorite-product-icon')} />
                                    </div>

                                    <div className={cx('cart-product-button')}>
                                        <a href="/" className={cx('cart-product-link')}>
                                            <FontAwesomeIcon icon={faBagShopping} className={cx('cart-product-icon')} />
                                            THÊM VÀO GIỎ HÀNG
                                        </a>
                                    </div>
                                </div>
                                <Link to={`/product/${item.albumName}`} className={cx('touch-link-product')}>
                                    <div className={cx('vinyl-product-title')}>
                                        <p className={cx('vinyl-name')}>{item.albumName}</p>
                                        <p className={cx('vinyl-author')}>{item.artist}</p>
                                        <p className={cx('vinyl-price')}>{item.price.toLocaleString('en-US')} đ</p>
                                        <div className={cx('vinyl-stock-status')}>
                                            <span className={cx('vinyl-onstock')}>{item.stockStatus}</span>
                                            <span className={cx('vinyl-status')}>{item.status}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div> */}
                        {/* ))} */}
                    </div>

                    <div>
                        <Link to={`/product/`}>
                            <img src={''} alt="" loading="lazy"></img>
                        </Link>
                        <div>
                            <div></div>

                            <div>
                                <a href="/">THÊM VÀO GIỎ HÀNG</a>
                            </div>
                        </div>
                        <Link to={`/product/`}>
                            <div>
                                <p>test</p>
                                <p>test</p>
                                <p>100 đ</p>
                                <div>
                                    <span>CÒN HÀNG</span>
                                    <span>Test</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <ProductCard />

                    <div>
                        <div>
                            <div>
                                <Link to="/">KHÁM PHÁ DANH SÁCH ĐĨA THAN CỦA SOLEIL</Link>
                            </div>
                        </div>

                        <div>
                            <span>
                                <span>Theo dõi SOLEIL RECORDS trên:</span>
                            </span>

                            <span>
                                <div>
                                    <a href="/">
                                        <FaFacebook />
                                    </a>
                                    <a href="/">
                                        <FaInstagram />
                                    </a>
                                    <a href="/">
                                        <FaTiktok />
                                    </a>
                                    <a href="/">
                                        <FaYoutube />
                                    </a>
                                    <a href="/">
                                        <FaSpotify />
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReadyVinylList;

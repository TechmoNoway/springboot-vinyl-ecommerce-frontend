import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Category() {
    const { searchParam } = useParams();

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const handleFillProductList = async () => {
            const { data: response } = await axios.get(
                `http://localhost:8081/api/disc/getMoreDiscByName?searchParam=${searchParam}`,
            );

            setProductList(response.data);
        };

        handleFillProductList();
    }, [searchParam]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('shop-banner')}>
                    <h1 className={cx('shop-banner-title')}>SHOP</h1>
                </div>

                <div className={cx('filter-inputs')}>
                    <div className={cx('input-item')}>
                        <input className={cx('input-detail')} placeholder="THỂ LOẠI"></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input className={cx('input-detail')} placeholder="TÂM TRẠNG"></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input className={cx('input-detail')} placeholder="GIÁ"></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input className={cx('input-detail')} placeholder="TRÌNH TRẠNG KHO"></input>
                    </div>
                </div>

                <div className={cx('product-control')}>
                    <div className={cx('sort-product-module')}>
                        <p className={cx('sortby-text')}>SẮP XẾP BỞI:</p>
                        <select className={cx('select-sort-kind')}>
                            <option className={cx('select-item')} value="menu_order">
                                Thứ Tự Mặc Định
                            </option>
                            <option className={cx('select-item')} value="menu_order">
                                Giá Tăng Dần
                            </option>
                            <option className={cx('select-item')} value="menu_order">
                                Giá Giảm Dần
                            </option>
                        </select>
                    </div>
                </div>

                <div className={cx('product-list')}>
                    {productList.map((item) => (
                        <div key={item.id} className={cx('vinyl-product')}>
                            <Link to={`/product/${item.albumName}`}>
                                <img className={cx('vinyl-image')} src={item.image} alt=""></img>

                                <div className={cx('add-links-wrap')}>
                                    <div></div>

                                    <div></div>
                                </div>

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
                        </div>
                    ))}
                </div>

                <div className={cx('footer')}>
                    <div className={cx('page-numbers')}>
                        <span className={cx('prev-page-btn')}>
                            <FontAwesomeIcon className={cx('prev-icon')} icon={faAngleLeft} />
                        </span>
                        <span>1</span>
                        <span>2</span>
                        <span className={cx('next-page-btn')}>
                            <FontAwesomeIcon className={cx('next-icon')} icon={faAngleRight} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { RecordIcon } from '~/asset/Icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [product, setProduct] = useState({});

    const oldCartList = [];

    const navigate = useNavigate();

    const { albumName } = useParams();

    useEffect(() => {
        const handleLoadProductInfo = async () => {
            const { data: response } = await axios.get(
                `http://localhost:8081/api/disc/getLessDiscByName?searchParam=${albumName}`,
            );

            setProduct(...response.data);
        };

        handleLoadProductInfo();
    }, [albumName]);

    const handleFormatPrice = () => {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(product.price);
        return formattedNumber;
    };

    const handleAddProductToCart = () => {
        const arrayCartList = JSON.parse(sessionStorage.getItem('cartList'));

        if (arrayCartList === null) {
            sessionStorage.setItem('cartList', JSON.stringify([{ ...product }, ...oldCartList]));
        } else {
            sessionStorage.setItem('cartList', JSON.stringify([{ ...product }, ...arrayCartList]));
        }

        navigate('/cart');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('content-inner')}>
                    <div className={cx('left-content')}>
                        <img className={cx('main-image')} src={product.image} alt=""></img>
                        <div className={cx('buying-notice')}>
                            <div className={cx('buying-notice-inner')}>
                                <div className={cx('notice-title')}>
                                    <RecordIcon className={cx('icon')} />
                                    <span className={cx('notice-title-text')}>LƯU Ý KHI MUA HÀNG</span>
                                </div>
                                <div className={cx('notice-info')}>
                                    <div className={cx('notice-info-inner')}>
                                        <ul className={cx('notice-info-text')}>
                                            <li>
                                                Vui lòng thanh toán trước 100% giá trị đối với đơn hàng có
                                                <strong>sản phẩm order</strong>
                                                &nbsp; (bao gồm cả phí ship).
                                            </li>
                                            <li>
                                                Thanh toán COD chỉ áp dụng với đĩa <strong>có sẵn</strong>.
                                            </li>
                                        </ul>
                                        <div className={cx('trade-link')}>
                                            <Link to="/">
                                                <u className={cx('trade-link-text')}>Quy định đổi trả</u>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('right-content')}>
                        <div className={cx('entry-summary')}>
                            <h4 className={cx('album-name')}>{product.albumName}</h4>

                            <p className={cx('artist')}>{product.artist}</p>

                            <p className={cx('platform')}>{product.platform}</p>

                            <div className={cx('price-line')}>
                                <h4 className={cx('price')}>{handleFormatPrice()} đ</h4>
                                <span className={cx('stock-status')}>Còn Hàng</span>
                            </div>

                            <div className={cx('action-buttons')}>
                                <a href="/" className={cx('demo-audio-btn')}>
                                    <FontAwesomeIcon icon={faVolumeOff} className={cx('demo-audio-icon')} />
                                </a>

                                <span className={cx('favorite-btn')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>

                                <span onClick={handleAddProductToCart} className={cx('add-cart-btn')}>
                                    <span className={cx('add-btn-content')}>THÊM VÀO GIỎ HÀNG</span>
                                </span>
                            </div>

                            <div className={cx('description')}>
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className={cx('disc-info')}>
                            <h4 className={cx('disc-info-title')}>THÔNG TIN ĐĨA</h4>
                            <table className={cx('info-table')}>
                                <tbody>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Trọng lượng</th>
                                        <td className={cx('info-item-value')}>5 kg</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Phát Hành Gốc</th>
                                        <td className={cx('info-item-value')}>{product.releaseYear}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Thể Loại</th>
                                        <td className={cx('info-item-value')}>Soundtrack, Children's</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Màu Đĩa</th>
                                        <td className={cx('info-item-value')}>Đen, Soundtrack</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Định Dạng</th>
                                        <td className={cx('info-item-value')}>{product.platform}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Hãng Phát Hành</th>
                                        <td className={cx('info-item-value')}>{product.studio}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Tình Trạng Đĩa</th>
                                        <td className={cx('info-item-value')}>{product.status}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Tình Trạng Vỏ</th>
                                        <td className={cx('info-item-value')}>{product.status}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Quốc Gia</th>
                                        <td className={cx('info-item-value')}>{product.country}</td>
                                    </tr>
                                    <tr className={cx('info-table-item')}>
                                        <th className={cx('info-item-label')}>Năm Sản Xuất</th>
                                        <td className={cx('info-item-value')}>{product.manufactureYear}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

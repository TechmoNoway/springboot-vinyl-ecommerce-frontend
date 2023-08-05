import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';
import styles from './PaginateProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaginateProduct({ data = [] }) {
    return (
        <>
            <div className={cx('product-list')}>
                {data.map((item) => (
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

                <ReactPaginate />
            </div>
        </>
    );
}

export default PaginateProduct;

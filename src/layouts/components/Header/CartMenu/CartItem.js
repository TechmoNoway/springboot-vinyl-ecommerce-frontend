import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CartMenu.module.scss';

const cx = classNames.bind(styles);

function CartItem({ data }) {
    

    return (
        <Link className={cx('cart-item')} to={data.to}>
            <div className={cx('inner')}>
                <span className={cx('item-title')}>
                    <p className={cx('item-name')}>{data.name} </p>

                    <p className={cx('item-price')}>1 x {data.price}</p>
                </span>
                <span>
                    <img className={cx('item-image')} src={data.image} alt=""></img>
                </span>
            </div>
        </Link>
    );
}

export default CartItem;

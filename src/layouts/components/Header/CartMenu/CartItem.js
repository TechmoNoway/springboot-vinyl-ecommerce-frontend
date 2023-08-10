import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CartMenu.module.scss';

const cx = classNames.bind(styles);

function CartItem({ data }) {

    const handleFormatPrice = (inputPrice) => {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(inputPrice);
        return formattedNumber;
    };

    return (
        <Link className={cx('cart-item')} to={`/product/${data.albumName}`}>
            <div className={cx('inner')}>
                <span className={cx('item-title')}>
                    <p className={cx('item-name')}>{data.albumName} </p>

                    <p className={cx('item-price')}>{data.quantity} x {handleFormatPrice(data.price)}</p>
                </span>
                <span>
                    <img className={cx('item-image')} src={data.image} alt=""></img>
                </span>
            </div>
        </Link>
    );
}

export default CartItem;

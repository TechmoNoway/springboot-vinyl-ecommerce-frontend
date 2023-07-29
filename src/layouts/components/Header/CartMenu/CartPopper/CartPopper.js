import classNames from 'classnames/bind';
import styles from './CartPopper.module.scss';

const cx = classNames.bind(styles);

function CartWrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default CartWrapper;

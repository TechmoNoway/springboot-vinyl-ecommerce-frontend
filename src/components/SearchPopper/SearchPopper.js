import classNames from 'classnames/bind';
import styles from './SearchPopper.module.scss';

const cx = classNames.bind(styles);

function SearchPopper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default SearchPopper;

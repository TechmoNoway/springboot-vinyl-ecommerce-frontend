import classNames from 'classnames/bind';
import styles from './FilterPopper.module.scss';

const cx = classNames.bind(styles);

function FilterPopper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default FilterPopper;

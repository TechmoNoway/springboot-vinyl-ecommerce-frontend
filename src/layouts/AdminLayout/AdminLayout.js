import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default AdminLayout;

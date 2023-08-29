import classNames from 'classnames/bind';
import styles from './ErrorLayout.module.scss';

const cx = classNames.bind(styles);

function ErrorLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div>{children}</div>
        </div>
    );
}

export default ErrorLayout;

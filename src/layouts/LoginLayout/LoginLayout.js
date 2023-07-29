import classNames from "classnames/bind";
import styles from './LoginLayout.module.scss'

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div>{children}</div>
        </div>
    );
}

export default LoginLayout;

import classNames from 'classnames/bind';
import styles from './AccountMenu.module.scss';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function AccountMenu({ children, hideOnClick = false, items = [], onClick }) {
    const handleLogout = () => {
        localStorage.clear();
    };

    const renderItems = () => {
        return items.map((item, index) => {
            if (item.title === 'Log out') {
                return <MenuItem key={index} data={item} onClick={handleLogout} />;
            }

            return <MenuItem key={index} data={item} onClick={onClick} />;
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy interactive offset={[12, 8]} placement="bottom-end" hideOnClick={hideOnClick} render={renderResult}>
            {children}
        </Tippy>
    );
}

export default AccountMenu;

import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';

const cx = classNames.bind(styles);

function FilterItem({itemName, onClick}) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <p className={cx('item-name')}>{itemName}</p>
        </div>
    );
}

export default FilterItem;

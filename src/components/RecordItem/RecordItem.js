import classNames from 'classnames/bind';
import styles from './RecordItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function RecordItem({data}) {
    return (
        <Link to="/" className={cx('wrapper')}>
            <img className={cx('disc-image')} src="" alt=""></img>

            <div className={cx('info')}></div>
        </Link>
    );
}

export default RecordItem;

import classNames from 'classnames/bind';
import styles from './RecordItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function RecordItem({ data }) {
    return (
        <Link to="/" className={cx('wrapper')}>
            <img className={cx('disc-image')} src={data.image} alt=""></img>

            <div className={cx('info')}>
                <h5 className={cx('left-info')}>
                    <span className={cx('name')}>{data.albumName}</span>
                    <div className={cx('price')}>{data.price}đ</div>
                </h5>
                <span className={cx('status')}>{data.status}</span>
                
            </div>
        </Link>
    );
}

export default RecordItem;

import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Admin() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('UserToken')) {
    //     } else {
    //         navigate('/page404');
    //     }
    // }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                    
            </div>
        </>
    );
}

export default Admin;

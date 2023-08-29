import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function Cart() {
    const [discountCode, setDiscountCode] = useState('');
    const [cartItemList, setCartItemList] = useState([{}]);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (localStorage.getItem('UserToken')) {
            setCartItemList(JSON.parse(sessionStorage.getItem('cartList')));
        } else {
            navigate('/page404');
        }
    }, []);

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant', // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    const handleIncreaseQuantity = (index) => {
        if (cartItemList[index].quantity < 5) {
            setCartItemList(() => {
                cartItemList[index].quantity = cartItemList[index].quantity + 1;
                cartItemList[index].stockQuantiy = cartItemList[index].quantity - 1;
                return cartItemList;
            });
        }

        sessionStorage.setItem('cartList', JSON.stringify(cartItemList));
        navigate('/cart');
    };

    const handleDecreaseQuantity = (index) => {
        if (cartItemList[index].quantity > 1) {
            setCartItemList(() => {
                cartItemList[index].quantity = cartItemList[index].quantity - 1;
                cartItemList[index].stockQuantiy = cartItemList[index].quantity + 1;
                return cartItemList;
            });

            sessionStorage.setItem('cartList', JSON.stringify(cartItemList));
            navigate('/cart');
        }
    };

    const handleFormatPrice = (inputPrice) => {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(inputPrice);
        return formattedNumber;
    };

    const handleRemoveFromCart = (itemId) => {
        const filteredCartItemList = cartItemList.filter((item) => item['id'] !== itemId);
        sessionStorage.setItem('cartList', JSON.stringify(filteredCartItemList));
        setCartItemList(filteredCartItemList);
    };

    const handleCalTotalPrice = (array) => {
        return array.reduce((acc, item) => acc + item['price'] * item['quantity'], 0);
    };

    const handleGotoPayment = () => {
        if (cartItemList.length > 0) {
            navigate('/payment');
        } else {
            swal('Sorry', 'You Dont Have Any Disc In Cart', 'warning');
        }
    };

    const renderCartItem = () => {
        if (cartItemList.length > 0) {
            return (
                <>
                    {cartItemList.map((item, index) => (
                        <tr key={index} className={cx('product-item')}>
                            <td className={cx('product-remove')}>
                                <p className={cx('product-remove-text')} onClick={() => handleRemoveFromCart(item?.id)}>
                                    ×
                                </p>
                            </td>
                            <td className={cx('product-thumbnail')}>
                                <Link to={`/product/${item?.albumName}`}>
                                    <img className={cx('product-image')} src={item.image} alt=""></img>
                                </Link>
                            </td>
                            <td className={cx('product-name')}>{item.albumName}</td>
                            <td className={cx('product-price')}>{handleFormatPrice(item.price)} ₫</td>
                            <td className={cx('product-quantity')}>
                                <span className={cx('minus')} onClick={() => handleDecreaseQuantity(index)}>
                                    -
                                </span>
                                <input
                                    className={cx('quantity-input')}
                                    type="text"
                                    value={item.quantity || 0}
                                    onChange={() => console.log('CHNAGE')}
                                />
                                <span className={cx('plus')} onClick={() => handleIncreaseQuantity(index)}>
                                    +
                                </span>
                            </td>
                            <td className={cx('product-subtotal')}>
                                {handleFormatPrice(item.price * item.quantity)} ₫
                            </td>
                        </tr>
                    ))}
                </>
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('cart-header')}>
                    <span className={cx('cart-header-text')}>GIỎ HÀNG</span>
                </div>

                <div className={cx('cart-content')}>
                    <div className={cx('left-content')}>
                        <div className={cx('left-content-inner')}>
                            <table className={cx('cart-table')}>
                                <thead className={cx('table-heading')}>
                                    <tr className={cx('table-row-heading')}>
                                        <th className={cx('title-remove')}></th>
                                        <th className={cx('title-thumbnail')}></th>
                                        <th className={cx('title-name')}>Tên Sản Phẩm</th>
                                        <th className={cx('title-price')}>Đơn Giá</th>
                                        <th className={cx('title-quantity')}>Số Lượng</th>
                                        <th className={cx('title-subtotal')}>Tổng Tiền</th>
                                    </tr>
                                </thead>

                                <tbody className={cx('table-body')}>
                                    {renderCartItem()}

                                    <tr className={cx('discount-code-card')}>
                                        <td className={cx('discount-card-inner')}>
                                            <div className={cx('card-content')}>
                                                <div className={cx('card-title')}>
                                                    <span className={cx('card-title-text')}>MÃ GIẢM GIÁ</span>
                                                    <FontAwesomeIcon
                                                        className={cx('card-title-icon')}
                                                        icon={faAngleDown}
                                                    />
                                                </div>
                                                <div className={cx('card-body')}>
                                                    <div className={cx('card-body-inner')}>
                                                        <p className={cx('form-label')}>Nhập mã giảm giá của bạn:</p>
                                                        <div className={cx('form-code-input')}>
                                                            <input
                                                                type="text"
                                                                className={cx('code-input')}
                                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                                value={discountCode}
                                                            />
                                                            <button className={cx('code-btn')}> ÁP DỤNG</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={cx('cart-actions')}>
                                <Link className={cx('keep-buying-link')} to="/category">
                                    TIẾP TỤC MUA HÀNG
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={cx('right-content')}>
                        <div className={cx('shipping-tax')}>
                            <div className={cx('shipping-tax-header')}>
                                <span className={cx('tax-header-text')}>DỬ TOÁN VẬN CHUYỂN VÀ THUẾ</span>
                                <FontAwesomeIcon className={cx('tax-header-icon')} icon={faAngleDown} />
                            </div>
                            <div className={cx('shipping-tax-body')}>
                                <div className={cx('tax-body-inner')}>
                                    <div className={cx('choice-radio')}>
                                        <input className={cx('choice-input')} type="radio" name="a"></input>
                                        <label className={cx('choice-label')}>THANH TOÁN CHUYỂN KHOẢN: 50,000 ₫</label>
                                    </div>
                                    <div className={cx('choice-radio')}>
                                        <input className={cx('choice-input')} type="radio" name="a"></input>
                                        <label className={cx('choice-label')}>
                                            THANH TOÁN KHI NHẬN HÀNG (COD): 65,000 ₫
                                        </label>
                                    </div>
                                    <div className={cx('choice-radio')}>
                                        <input className={cx('choice-input')} type="radio" name="a"></input>
                                        <label className={cx('choice-label')}>
                                            NHẬN TẠI 11/133 THÁI HÀ (Thanh toán trước & đến lấy)
                                        </label>
                                    </div>
                                    <div className={cx('choice-description')}>
                                        Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('cart-total')}>
                            <div className={cx('cart-total-header')}>
                                <span className={cx('total-header-text')}>DỬ TOÁN VẬN CHUYỂN VÀ THUẾ</span>
                                <FontAwesomeIcon className={cx('total-header-icon')} icon={faAngleDown} />
                            </div>
                            <div className={cx('cart-total-body')}>
                                <table className={cx('cart-total-table')}>
                                    <tbody className={cx('table-tbody')}>
                                        <tr className={cx('cart-subtotal-item')}>
                                            <th className={cx('cart-subtotal-title')}>Tạm Tính</th>
                                            <td className={cx('cart-subtotal-value')}>
                                                {handleFormatPrice(handleCalTotalPrice(cartItemList))} ₫
                                            </td>
                                        </tr>
                                        <tr className={cx('order-total-item')}>
                                            <th className={cx('order-total-title')}>Tổng Cộng</th>
                                            <td className={cx('order-total-value')}>
                                                {handleFormatPrice(handleCalTotalPrice(cartItemList))} ₫
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('payment-conduct')}>
                                <div className={cx('payment-conduct-text')} onClick={handleGotoPayment}>
                                    TIẾN HÀNH THANH TOÁN
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;

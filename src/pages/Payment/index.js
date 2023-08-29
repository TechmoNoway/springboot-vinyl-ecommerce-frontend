import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import axios from 'axios';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Payment() {
    const [form, setForm] = useState({
        address: '',
        city: '',
        phone: '',
        email: '',
        note: '',
        firstname: '',
        lastname: '',
    });

    const navigate = useNavigate();

    const { address, city, email, note, firstname, lastname, phone } = form;
    const handleEnterInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { user, setUser } = useContext(UserContext);
    const [productList, setProductList] = useState([]);
    const { pathname } = useLocation();

    useEffect(() => {
        if (localStorage.getItem('UserToken')) {
            setProductList(JSON.parse(sessionStorage.getItem('cartList')));
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

    const handleFormatPrice = (inputPrice) => {
        const formatter = new Intl.NumberFormat('en-US');
        const formattedNumber = formatter.format(inputPrice);
        return formattedNumber;
    };

    const handleCalTotalPrice = (array) => {
        return array.reduce((acc, item) => acc + item['price'] * item['quantity'], 0);
    };

    const handleGetCurrentDate = () => {
        const currentDate = new Date();
        let stringMonth;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        if (month < 10) {
            stringMonth = '0' + month;
        }

        const day = currentDate.getDate();

        return `${year}-${stringMonth}-${day}`;
    };

    const handleSubmitPayment = async () => {
        if (JSON.stringify(user) === '{}') {
            swal('Sorry', 'Please Sign In To Purchase Our Product', 'warning');
        } else {
            console.log(user);

            const { data: orderListResponse } = await axios.get('http://localhost:8081/api/order/getAllOrders');

            let newOrder = {
                id: orderListResponse.data.length + 1,
                userId: user.id,
                userAddress: address + ', ' + city,
                totalPrice: handleCalTotalPrice(productList),
                userPhone: phone,
                email: email,
                note: note,
                fullname: lastname + ' ' + firstname,
                orderDate: handleGetCurrentDate(),
            };

            if (address !== '' || city !== '' || phone !== '' || email !== '' || lastname !== '' || firstname !== '') {
                const { data: orderSaveResponse } = await axios.post(
                    'http://localhost:8081/api/order/saveOrder',
                    newOrder,
                );

                console.log(newOrder);

                if (orderSaveResponse.success === true) {
                    swal('Nice!', 'Thanks For Order Our Product', 'success');
                    sessionStorage.clear();
                    navigate('/');
                } else {
                    swal('Sorry', 'Order Failed', 'error');
                }
            } else {
                swal('Sorry', 'Please Fill Enough Infomation', 'warning');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('payment-content')}>
                <div className={cx('left-content')}>
                    <div className={cx('left-content-header')}>
                        <h3 className={cx('left-content-title')}>CHI TIẾT THANH TOÁN</h3>
                    </div>

                    <div className={cx('left-content-body')}>
                        <div className={cx('fullname')}>
                            <div className={cx('firstname')}>
                                <label className={cx('firstname-text')}>
                                    Tên <abbr className={cx('required')}>*</abbr>
                                </label>
                                <div className={cx('firstname-box')}>
                                    <input
                                        className={cx('firstname-input')}
                                        name="firstname"
                                        value={firstname}
                                        onChange={handleEnterInput}
                                    />
                                </div>
                            </div>

                            <div className={cx('lastname')}>
                                <label className={cx('lastname-text')}>
                                    Họ <abbr className={cx('required')}>*</abbr>
                                </label>
                                <div className={cx('lastname-box')}>
                                    <input
                                        className={cx('lastname-input')}
                                        name="lastname"
                                        value={lastname}
                                        onChange={handleEnterInput}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cx('address')}>
                            <label className={cx('address-text')}>
                                Địa chỉ <abbr className={cx('required')}>*</abbr>
                            </label>
                            <div className={cx('address-box')}>
                                <input
                                    className={cx('input-address')}
                                    name="address"
                                    value={address}
                                    onChange={handleEnterInput}
                                />
                            </div>
                        </div>

                        <div className={cx('city')}>
                            <label className={cx('city-text')}>
                                Tỉnh / Thành phố <abbr className={cx('required')}>*</abbr>
                            </label>
                            <div className={cx('city-box')}>
                                <input
                                    className={cx('input-city')}
                                    name="city"
                                    value={city}
                                    onChange={handleEnterInput}
                                />
                            </div>
                        </div>

                        <div className={cx('phone')}>
                            <label className={cx('phone-text')}>
                                Số điện thoại <abbr className={cx('required')}>*</abbr>
                            </label>
                            <div className={cx('phone-box')}>
                                <input
                                    className={cx('input-phone')}
                                    name="phone"
                                    value={phone}
                                    onChange={handleEnterInput}
                                />
                            </div>
                        </div>

                        <div className={cx('email')}>
                            <label className={cx('email-text')}>
                                Địa chỉ email <abbr className={cx('required')}>*</abbr>
                            </label>
                            <div className={cx('email-box')}>
                                <input
                                    className={cx('input-email')}
                                    name="email"
                                    value={email}
                                    onChange={handleEnterInput}
                                />
                            </div>
                        </div>

                        <div className={cx('note')}>
                            <label className={cx('note-text')}>Ghi chú đơn hàng (tuỳ chọn)</label>
                            <div>
                                <textarea
                                    name="note"
                                    value={note}
                                    onChange={handleEnterInput}
                                    className={cx('note-box')}
                                    rows={'2'}
                                    cols={'5'}
                                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('right-content')}>
                    <div className={cx('right-content-header')}>
                        <h3 className={cx('left-content-title')}>CHI TIẾT THANH TOÁN</h3>
                    </div>

                    <div className={cx('right-content-body')}>
                        <div className={cx('payment-method')}>
                            <label className={cx('payment-method-label')}>Chuyển khoản qua ngân hàng</label>
                            <p className={cx('payment-method-description')}>
                                Thực hiện thanh toán của bạn vào tài khoản ngân hàng của Vọc Records.
                            </p>
                        </div>

                        <div className={cx('payment-table-box')}>
                            <table className={cx('payment-table')}>
                                <thead className={cx('payment-table-header')}>
                                    <tr className={cx('payment-item-title')}>
                                        <th className={cx('product-name-title')}>Sản phẩm</th>
                                        <th className={cx('product-subprice-title')}>Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((item) => (
                                        <tr key={item.id} className={cx('payment-item')}>
                                            <td className={cx('product-name')}>
                                                {item.albumName} &nbsp;
                                                <strong className={cx('product-quantity')}>
                                                    ×&nbsp;{item.quantity}
                                                </strong>
                                            </td>
                                            <td className={cx('product-total')}>
                                                {handleFormatPrice(item.price * item.quantity)} đ
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr className={cx('subtotal')}>
                                        <th className={cx('subtotal-title')}>TỔNG TẠM TÍNH</th>
                                        <td className={cx('subtotal-value')}>
                                            {handleFormatPrice(handleCalTotalPrice(productList))} đ
                                        </td>
                                    </tr>
                                    <tr className={cx('shipping-choices')}>
                                        <th className={cx('shipping-choices-title')}>GIAO HÀNG</th>
                                        <td className={cx('choices')}>
                                            <div className={cx('choice-radio')}>
                                                <input className={cx('choice-input')} type="radio" name="a"></input>
                                                <label className={cx('choice-label')}>FREE SHIP</label>
                                            </div>
                                            <div className={cx('choice-radio')}>
                                                <input className={cx('choice-input')} type="radio" name="a"></input>
                                                <label className={cx('choice-label')}>
                                                    THANH TOÁN CHUYỂN KHOẢN: 50,000 ₫
                                                </label>
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
                                        </td>
                                    </tr>
                                    <tr className={cx('table-total')}>
                                        <th className={cx('table-total-title')}>TỔNG</th>
                                        <td className={cx('table-total-value')}>
                                            {handleFormatPrice(handleCalTotalPrice(productList))} ₫
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className={cx('right-content-footer')}>
                            <p className={cx('right-footer-policy')}>
                                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng
                                website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.
                            </p>
                            <div className={cx('right-footer-total')}>
                                Tổng Cộng:&nbsp;&nbsp;{handleFormatPrice(handleCalTotalPrice(productList))}&nbsp;₫
                            </div>

                            <div className={cx('order-btn')} onClick={handleSubmitPayment}>
                                ĐẶT HÀNG
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;

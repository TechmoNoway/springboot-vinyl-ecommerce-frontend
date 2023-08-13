import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle, faCompactDisc, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faSpotify, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { DiscIcon, DroppingIcon, OkIcon, ShippingIcon } from '~/asset/Icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Home() {
    const [user, setUser] = useState({});
    const [bestDiscList, setBestDiscList] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userInfoData');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }

        const handleGetBestDiscs = async () => {

            const { data: response } = await axios.get('http://localhost:8081/api/disc/getBestDiscs');

            setBestDiscList(response.data)

        } 

        handleGetBestDiscs();

    }, []);

    

    return (
        <div className={cx('wrapper')}>
            <section className={cx('banner')}>
                <div className={cx('left-banner')}>
                    <div className={cx('lbanner-inner')}>
                        <Link to="/" className={cx('title-new-vinyl')}>
                            <FontAwesomeIcon className={cx('to-icon')} icon={faAngleRight} />
                            <span>&nbsp;ĐĨA MỚI </span>
                        </Link>

                        <div className={cx('new-vinyl-des')}>
                            <p>
                                Đĩa than nguyên seal mới toanh <br /> của bạn và chỉ riêng bạn
                            </p>
                        </div>

                        <div className={cx('new-disc-button')}>
                            <Link to="/">
                                <span className={cx('btn-new-content')}>ĐĨA MỚI CÓ SẴN</span>
                                <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
                            </Link>
                        </div>

                        <div className={cx('ghibli-vinyl-button')}>
                            <Link to="/">
                                <span className={cx('btn-ghibli-content')}>ĐĨA THAN GHIBLI</span>
                            </Link>
                        </div>

                        <div className={cx('lbanner-img')}>
                            <img
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Photo-New-disc.png"
                                alt="LeftBannerImage"
                            ></img>
                        </div>
                    </div>
                </div>

                {/* Main banner */}

                <div className={cx('right-banner')}>
                    <div className={cx('rbanner-inner')}>
                        <Link to="/" className={cx('title-old-vinyl')}>
                            <span>ĐĨA VINTAGE&nbsp;</span>
                            <FontAwesomeIcon className={cx('to-icon')} icon={faAngleRight} />
                        </Link>

                        <div className={cx('old-vinyl-des')}>
                            <p>
                                Những chiếc đĩa than vượt năm tháng để đưa <br /> giai điệu nguyên bản tới đôi tai bạn
                            </p>
                        </div>

                        <div className={cx('vietnam-vinyl-button')}>
                            <Link to="/">
                                {/* <img src="https://i.ibb.co/Lrz2VqL/vietnam.png" alt="vietnam" border="0" className={cx('vietnam-icon')} /> */}
                                <span className={cx('btn-vietnam-content')}>ĐĨA THAN VIỆT NAM</span>
                            </Link>
                        </div>

                        <div className={cx('sale-vinyl-button')}>
                            <Link to="/">
                                <FontAwesomeIcon className={cx('disc-icon')} icon={faCompactDisc} />
                                <span className={cx('btn-sale-content')}>ĐĨA VINTAGE SALE-OFF</span>
                            </Link>
                        </div>

                        <div className={cx('rbanner-img')}>
                            <img
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Photo-Vintage-disc.png"
                                alt="RightBannerImage"
                            ></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Choice Banner */}

            <section className={cx('custom-choice')}>
                <div className={cx('create-mixtape')}>
                    <div className={cx('create-mixtape-inner')}>
                        <Link to="/" className={cx('title-create-mixtape')}>
                            <FontAwesomeIcon className={cx('to-icon')} icon={faAngleRight} />
                            <span>&nbsp;TẠO MIXTAPE </span>
                        </Link>

                        <div className={cx('create-mixtape-des')}>
                            <p>
                                Biến âm thanh yêu thích của bản trở thành <br /> vĩnh cữu trên băng cát-xét
                            </p>
                        </div>

                        <div className={cx('discovery-button')}>
                            <Link to="/">
                                <span className={cx('btn-discovery-content')}>KHÁM PHÁ MIXTAPE</span>
                            </Link>
                        </div>

                        <div className={cx('mixtape-image')}>
                            <img
                                className={cx('tapeimg-detail')}
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Mask-group.png"
                                alt=""
                            ></img>
                        </div>
                    </div>
                </div>

                <div className={cx('turntable')}>
                    <div className={cx('turntable-inner')}>
                        <Link to="/" className={cx('title-turntable')}>
                            <span>MÂM ĐĨA </span>
                            <FontAwesomeIcon className={cx('to-icon')} icon={faAngleRight} />
                        </Link>

                        <div className={cx('turntable-des')}>
                            <Link to="/" className={cx('turntable-detail')}>
                                Khám phá ngay
                            </Link>
                        </div>

                        <div className={cx('turntable-image')}>
                            <img
                                className={cx('turntableimg-detail')}
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-1-1.png"
                                alt=""
                            ></img>
                        </div>

                        <div className={cx('fornewone-image')}>
                            <img
                                className={cx('fornewone-detail')}
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Group-8.png"
                                alt=""
                            ></img>
                        </div>
                    </div>
                </div>

                <div className={cx('accessory')}>
                    <div className={cx('accessory-inner')}>
                        <Link to="/" className={cx('title-accessory')}>
                            <span>PHỤ KIỆN </span>
                            <FontAwesomeIcon className={cx('to-icon')} icon={faAngleRight} />
                        </Link>

                        <div className={cx('accessory-des')}>
                            <Link to="/" className={cx('accessory-detail')}>
                                Khám phá ngay
                            </Link>
                        </div>

                        <div className={cx('accessory-image')}>
                            <img
                                className={cx('accessory-detail')}
                                src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-3.png"
                                alt=""
                            ></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* whychoosing section */}

            <section className={cx('whychoosing')}>
                <div className={cx('whychoosing-inner')}>
                    <h2 className={cx('whychoosing-title')}>VÌ SAO CHỌN</h2>

                    <img
                        className={cx('whychoosing-image')}
                        src="https://vocrecords.vn/wp-content/uploads/elementor/thumbs/Logo_ngang-resize-sat-pt01tz3zmsps5x7ng4h1zs82jrju1okgrnkruqs5n6.png"
                        alt=""
                    ></img>

                    <p className={cx('whychoosing-reason')}>
                        VÌ HAI THỨ: ÂM NHẠC HAY VÀ CHẤT LƯỢNG
                        <br /> PHỤC VỤ TỐT NHẤT.
                        <br /> SOLEIL RECORDS Ở ĐÂY LÀ ĐỂ:
                    </p>

                    <div className={cx('whychoosing-description')}>
                        <div className={cx('whychoosing-leftdes')}>
                            <div className={cx('whychoosing-leftdes-inner')}>
                                <div className={cx('leftdes-item')}>
                                    <span className={cx('leftdes-item-icon')}>
                                        <FontAwesomeIcon icon={faCircle} />
                                    </span>
                                    <span className={cx('leftdes-item-sen')}>
                                        Chữa chán cho đôi tai tinh tường của bạn
                                    </span>
                                </div>

                                <div className={cx('leftdes-item')}>
                                    <span className={cx('leftdes-item-icon')}>
                                        <FontAwesomeIcon icon={faCircle} />
                                    </span>
                                    <span className={cx('leftdes-item-sen')}>Hàn gắn tâm hồn vụn vỡ của bạn</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('whychoosing-rightdes')}>
                            <div className={cx('rightdes-item')}>
                                <span className={cx('rightdes-item-icon')}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </span>
                                <span className={cx('rightdes-item-sen')}>
                                    Đưa album yêu thích đến tay bạn nhanh chóng và an toàn với giá hời nhất (hời cho
                                    bạn!)
                                </span>
                            </div>

                            <div className={cx('rightdes-item')}>
                                <span className={cx('rightdes-item-icon')}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </span>
                                <span className={cx('rightdes-item-sen')}>
                                    Dẫn bạn khám phá đĩa than dù đã hay chưa chơi đĩa.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ready Vinyl  */}

            <section className={cx('ready-vinyl')}>
                <div className={cx('ready-vinyl-inner')}>
                    <div className={cx('ready-vinyl-header')}>
                        <span className={cx('ready-vinyl-title')}>ĐĨA THAN SẴN SÀNG</span>
                        <span className={cx('show-sale-vinyl')}>XEM ĐĨA GIẢM GIÁ</span>
                    </div>

                    <div className={cx('ready-vinyl-content')}>
                        {bestDiscList.map((item) => (
                            <div key={item.id} className={cx('vinyl-product')}>
                                <Link to={`/product/${item.albumName}`}>
                                    <img className={cx('vinyl-image')} src={item.image} alt=""></img>

                                    <div className={cx('add-links-wrap')}>
                                        <div></div>

                                        <div></div>
                                    </div>

                                    <div className={cx('vinyl-product-title')}>
                                        <p className={cx('vinyl-name')}>{item.albumName}</p>
                                        <p className={cx('vinyl-author')}>{item.artist}</p>
                                        <p className={cx('vinyl-price')}>{item.price.toLocaleString('en-US')} đ</p>
                                        <div className={cx('vinyl-stock-status')}>
                                            <span className={cx('vinyl-onstock')}>{item.stockStatus}</span>
                                            <span className={cx('vinyl-status')}>{item.status}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className={cx('ready-vinyl-footer')}>
                        <div className={cx('discover-button-inner')}>
                            <div className={cx('discover-list-button')}>
                                <Link to="/" className={cx('btn-discolist-content')}>
                                    KHÁM PHÁ DANH SÁCH ĐĨA THAN CỦA SOLEIL
                                </Link>
                            </div>
                        </div>

                        <div className={cx('follow-us')}>
                            <span className={cx('follow-us-title')}>
                                <span className={cx('follow-us-text')}>Theo dõi SOLEIL RECORDS trên:</span>
                            </span>

                            <span className={cx('social-network-list')}>
                                <div className={cx('social-network')}>
                                    <a className={cx('social-network-item')} href="/">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a className={cx('social-network-item')} href="/">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a className={cx('social-network-item')} href="/">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </a>
                                    <a className={cx('social-network-item')} href="/">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </a>
                                    <a className={cx('social-network-item')} href="/">
                                        <FontAwesomeIcon icon={faSpotify} />
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Soleil Commit */}

            <section className={cx('soleil-commit')}>
                <div className={cx('commit-inner')}>
                    <div className={cx('commit-header')}>
                        <span className={cx('commit-title')}>SOLEIL RECORDS CAM KẾT</span>
                    </div>

                    <div className={cx('commit-content')}>
                        <div className={cx('commit-item')}>
                            <div className={cx('commit-item-inner')}>
                                <Link to="/">
                                    <OkIcon className={cx('item-icon')} />
                                </Link>
                                <span className={cx('item-des')}>
                                    <Link to="/" className={cx('orderby-request')}>
                                        NHẬN ĐẶT ĐĨA RIÊNG THEO YÊU CẦU
                                    </Link>
                                    <p className={cx('find-out-more')}>Tìm hiểu thêm</p>
                                </span>
                            </div>
                        </div>

                        <div className={cx('commit-item')}>
                            <div className={cx('commit-item-inner')}>
                                <Link to="/">
                                    <ShippingIcon className={cx('item-icon')} />
                                </Link>
                                <span className={cx('item-des')}>
                                    <Link to="/" className={cx('orderby-request')}>
                                        SHIP TOÀN QUỐC, FREESHIP ĐƠN HÀNG ĐĨA TỪ 2 TRIỆU ĐỒNG
                                    </Link>
                                    <p className={cx('find-out-more')}>Tìm hiểu thêm</p>
                                </span>
                            </div>
                        </div>

                        <div className={cx('commit-item')}>
                            <div className={cx('commit-item-inner')}>
                                <Link to="/">
                                    <DiscIcon className={cx('item-icon')} />
                                </Link>
                                <span className={cx('item-des')}>
                                    <Link to="/" className={cx('orderby-request')}>
                                        ĐĨA ĐƯỢC BẢO QUẢN CHU ĐÁO
                                    </Link>
                                    <p className={cx('find-out-more')}>Tìm hiểu thêm</p>
                                </span>
                            </div>
                        </div>

                        <div className={cx('commit-item')}>
                            <div className={cx('commit-item-inner')}>
                                <Link to="/">
                                    <DroppingIcon className={cx('item-icon')} />
                                </Link>{' '}
                                <span className={cx('item-des')}>
                                    <Link to="/" className={cx('orderby-request')}>
                                        VẬN CHUYỂN AN TOÀN, TRÁNH HƯ HẠI ĐĨA
                                    </Link>
                                    <p className={cx('find-out-more')}>Tìm hiểu thêm</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Infomation */}

            <section className={cx('other-info')}>
                <div className={cx('other-info-inner')}>
                    <div className={cx('hint')}>
                        <div className={cx('buy-what')}>
                            <div className={cx('buy-what-inner')}>
                                <h4 className={cx('buy-what-title')}>BỐI RỐI CHƯA BIẾT NÊN MUA GÌ?</h4>
                                <p className={cx('buy-what-description')}>
                                    <br /> Đôi khi bạn cần gợi ý đĩa nhạc hay.
                                    <br /> Đôi khi bạn cần tư vấn chọn quà tặng.
                                    <br /> Đừng ngần ngại liên hệ với Soleil qua:
                                </p>
                                <div className={cx('buy-what-buttons')}>
                                    <span className={cx('link-tiktok-button')}>
                                        <Link to="/">
                                            <FontAwesomeIcon className={cx('tiktok-icon')} icon={faTiktok} />
                                            <span className={cx('btn-link-content')}>@SOLEILRECORDS.VN</span>
                                        </Link>
                                    </span>
                                    <span className={cx('link-fb-button')}>
                                        <Link to="/">
                                            <FontAwesomeIcon className={cx('facebook-icon')} icon={faFacebook} />
                                            <span className={cx('btn-link-content')}>FB.COM/SOLEILMUSIC.VN/</span>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('voucher-assign')}>
                            <div className={cx('buy-what-inner')}>
                                <h4 className={cx('voucher-assign-title')}>
                                    ĐĂNG KÝ NHẬN TIN, <br /> VOUCHER VỀ TAY
                                </h4>
                                <p className={cx('voucher-assign-description')}>
                                    Đăng ký để nhận thông tin mới nhất
                                    <br /> về đĩa mới về sản phẩm, khuyến mãi...
                                </p>
                                <div className={cx('voucher-assign-buttons')}>
                                    <span className={cx('voucher-signup-button')}>
                                        <Link to="/">
                                            <span className={cx('btn-voucher-content')}>ĐĂNG KÝ NGAY</span>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('about-listener')}>
                        <div className={cx('playlist-description')}>
                            <div className={cx('playlist-des-inner')}>
                                <h4 className={cx('introduce-title')}>SOLEIL PLAYLIST</h4>
                                <p className={cx('introduce-description')}>
                                    Ở các nơi khác, nhân viên không nghe nhạc tránh xao lãng.
                                    <br /> Ở Vọc Records, chúng tôi ép nhau “phải” nghe nhạc 24/7.
                                    <br /> Stalk xem chúng tôi đang nghe nhạc gì.
                                </p>
                            </div>
                        </div>

                        <div className={cx('what-listening')}>
                            <div className={cx('what-listening-inner')}>
                                <div className={cx('playlist-month')}>
                                    <div className={cx('playlist-month-text')}>PLAYLIST THÁNG 12</div>
                                </div>
                                <div className={cx('what-listening-items')}>
                                    <h4 className={cx('what-listening-title')}>SOLEIL ĐANG NGHE GÌ?</h4>
                                    <div className={cx('socialnet-list')}>
                                        <Link>
                                            <FontAwesomeIcon className={cx('social-icon')} icon={faTiktok} />
                                        </Link>
                                        <Link>
                                            <FontAwesomeIcon className={cx('social-icon')} icon={faYoutube} />
                                        </Link>
                                        <Link>
                                            <FontAwesomeIcon className={cx('social-icon')} icon={faSpotify} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
        </div>
    );
}

export default Home;

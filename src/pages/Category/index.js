import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Category() {
    const { searchParam } = useParams();

    const [productList, setProductList] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const { pathname } = useLocation();
    const itemsPerPage = 15;

    const [form, setForm] = useState({
        categoryName: '',
        moodName: '',
        releaseYear: '',
        stockStatus: '',
    });

    const { categoryName, moodName, releaseYear, stockStatus } = form;

    const handleEnterInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const handleFillProductList = async () => {
            if (searchParam === 'AllDisc') {
                const { data: response } = await axios.get(`http://localhost:8081/api/disc/getAllDisc`);

                setProductList(response.data);

                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(response.data.slice(itemOffset, endOffset));
                setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
            } else {
                const { data: response } = await axios.get(
                    `http://localhost:8081/api/disc/getMoreDiscByName?searchParam=${searchParam}`,
                );

                setProductList(response.data);

                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(response.data.slice(itemOffset, endOffset));
                setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
            }
        };

        handleFillProductList();
    }, [searchParam, itemOffset]);

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    const handleFilterSubmit = async () => {
        if (searchParam === 'AllDisc') {
            const { data: response } = await axios.get(
                `http://localhost:8081/api/disc/getDiscByNameFiltered?searchParam=&categoryName=${categoryName}&moodName=${moodName}&releaseYear=${releaseYear}&stockStatus=${stockStatus}`,
            );

            setProductList(response.data);

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(response.data.slice(itemOffset, endOffset));
            setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
        } else {
            const { data: response } = await axios.get(
                `http://localhost:8081/api/disc/getDiscByNameFiltered?searchParam=${searchParam}&categoryName=${categoryName}&moodName=${moodName}&releaseYear=${releaseYear}&stockStatus=${stockStatus}`,
            );

            setProductList(response.data);

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(response.data.slice(itemOffset, endOffset));
            setCurrentPage(Math.ceil(response.data.length / itemsPerPage));
        }
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % productList.length;
        setItemOffset(newOffset);
    };

    const handleChangeSelectedOption = (e) => {
        const targetValue = e.target.value;
        setSelectedOption(targetValue);
        if (targetValue === 'DEFAULT') {
            setCurrentItems(productList);
        }
        if (targetValue === 'ATOZ') {
            setCurrentItems(() => {
                return productList.slice().sort((a, b) => a.albumName.localeCompare(b.albumName));
            });
        } else if (targetValue === 'ZTOA') {
            setCurrentItems(() => {
                return productList.slice().sort((a, b) => b.albumName.localeCompare(a.albumName));
            });
        } else if (targetValue === 'PRICEASC') {
            setCurrentItems(() => {
                return productList.slice().sort((a, b) => a.price - b.price);
            });
        } else if (targetValue === 'PRICEDESC') {
            setCurrentItems(() => {
                return productList.slice().sort((a, b) => b.price - a.price);
            });
        }
    };

    const renderData = () => {
        return currentItems.map((item) => (
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
                            {/* <span className={cx('vinyl-onstock')}>{item.stockStatus}</span> */}
                            {renderStockStatus(item.stockStatus)}
                            <span className={cx('vinyl-status')}>{item.status}</span>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    };

    const renderStockStatus = (stock) => {
        if (stock === 'Còn Hàng') {
            return <span className={cx('vinyl-onstock')}>{stock}</span>;
        }

        if (stock === 'Preorder') {
            return <span className={cx('vinyl-preorder')}>{stock}</span>;
        }

        if (stock === 'Hết Hàng') {
            return <span className={cx('vinyl-outstock')}>{stock}</span>;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('shop-banner')}>
                    <h1 className={cx('shop-banner-title')}>SHOP</h1>
                </div>

                <div className={cx('filter-inputs')}>
                    <div className={cx('input-item')}>
                        <input
                            name="categoryName"
                            onChange={handleEnterInput}
                            className={cx('input-detail')}
                            placeholder="THỂ LOẠI"
                            value={categoryName}
                        ></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input
                            name="moodName"
                            onChange={handleEnterInput}
                            className={cx('input-detail')}
                            placeholder="TÂM TRẠNG"
                            value={moodName}
                        ></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input
                            name="releaseYear"
                            onChange={handleEnterInput}
                            className={cx('input-detail')}
                            placeholder="THỜI KỲ"
                            value={releaseYear}
                        ></input>
                    </div>

                    <div className={cx('input-item')}>
                        <input
                            name="stockStatus"
                            onChange={handleEnterInput}
                            className={cx('input-detail')}
                            placeholder="TRÌNH TRẠNG KHO"
                            value={stockStatus}
                        ></input>
                    </div>
                </div>

                <div className={cx('product-control')}>
                    <div className={cx('sort-product-module')}>
                        <p className={cx('sortby-text')}>SẮP XẾP BỞI:</p>
                        <select className={cx('select-sort-kind')} onChange={handleChangeSelectedOption}>
                            <option className={cx('select-item')} value="DEFAULT">
                                Thứ Tự Mặc Định
                            </option>
                            <option className={cx('select-item')} value="PRICEASC">
                                Giá Tăng Dần
                            </option>
                            <option className={cx('select-item')} value="PRICEDESC">
                                Giá Giảm Dần
                            </option>
                            <option className={cx('select-item')} value="ATOZ">
                                Xếp Từ A-Z
                            </option>
                            <option className={cx('select-item')} value="ZTOA">
                                Xếp Từ Z-A
                            </option>
                        </select>
                    </div>

                    <div className={cx('filter-box')} onClick={handleFilterSubmit}>
                        <span className={cx('filter-box-text')}>THỰC HIỆN LỌC</span>
                        <FontAwesomeIcon className={cx('filter-icon')} icon={faFilter} />
                    </div>
                </div>

                <div className={cx('product-list')}>{renderData()}</div>

                <div className={cx('footer')}>
                    <ReactPaginate
                        pageCount={Math.ceil(productList.length / itemsPerPage)}
                        pageRangeDisplayed={3}
                        previousLabel="<"
                        nextLabel=">"
                        breakLabel={'...'}
                        onPageChange={handlePageClick}
                        containerClassName={cx('pagination')}
                        activeClassName={cx('active')}
                        renderOnZeroPageCount={null}
                        pageClassName={cx('page-numbers')}
                        previousClassName={cx('prev-page-btn')}
                        nextClassName={cx('next-page-btn')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Category;

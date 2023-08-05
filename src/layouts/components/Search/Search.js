import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import axios from 'axios';
import RecordItem from '~/components/RecordItem/RecordItem';
import SearchPopper from '~/components/SearchPopper/SearchPopper';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [discList, setDistList] = useState([]);

    const [showResult, setShowResult] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        const getAllDiscs = async () => {
            const { data: response } = await axios.get(
                `http://localhost:8081/api/disc/getLessDiscByName?searchParam=${searchValue}`,
            );

            setDistList(response.data);

            setSearchResult(response.data);

            // console.log(response.data);
        };

        getAllDiscs();
    }, [searchValue]);

    const inputRef = useRef();

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSubmit = async () => {
        if (searchValue === '') {
            navigate(`/category/AllDisc`);
        } else {
            navigate(`/category/${searchValue}`);
        }

        handleHideResult();
    };

    const handleSearchKeydown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom-start"
                render={(attr) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attr}>
                        <SearchPopper>
                            {searchResult.map((item) => (
                                <RecordItem key={item.id} data={item} onClick={handleHideResult}></RecordItem>
                            ))}
                        </SearchPopper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search songs, albums, artists..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleSearchKeydown}
                    />

                    <button className={cx('search-btn')} onClick={handleSubmit} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;

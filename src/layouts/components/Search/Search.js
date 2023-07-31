import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import axios from 'axios';
import RecordItem from '~/components/RecordItem/RecordItem';
import SearchPopper from '~/components/SearchPopper/SearchPopper';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const [discList, setDistList] = useState([]);

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
            
            setSearchResult(response.data) 

            console.log(response.data);
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

    const handleSubmit = () => {};

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={searchResult.length > 0}
                placement='bottom-start'
                render={(attr) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attr}>
                        <SearchPopper>
                            {searchResult.map((item) => (
                                <RecordItem key={item.id} data={item}></RecordItem>
                            ))}
                        </SearchPopper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search songs, albums, artists..."
                        spellCheck={false}
                        onChange={handleChange}
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

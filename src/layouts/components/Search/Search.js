import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useRef, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);

    const inputRef = useRef();

    const handleChange = (e) => {
        const currentSearchValue = e.target.value;

        if (!currentSearchValue.startsWith(' ')) {
            setSearchValue(currentSearchValue);
        }
    };

    const handleSubmit = () => {};

    return (
        <div>
            <HeadlessTippy interactive visible={searchResult.length > 0} render={(attr) => (

                   <div className={cx('search-result')} tabIndex='-1' {...attr}>

                        <PopperWrapper >

                            

                        </PopperWrapper>


                   </div> 

            )}>
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

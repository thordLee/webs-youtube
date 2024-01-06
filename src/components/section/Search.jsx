import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

	const [searchKeyword, setSearchKeyword] = useState('');
	const navigate = useNavigate();//주소를 가져오기위해 사용

	const handleSearch = () => {
		console.log(searchKeyword);
		if (searchKeyword) {
			navigate(`/search/${searchKeyword}`);
			setSearchKeyword('');
		}
	}

	return (
		<div id="search">
		<div className="search__inner">
			<label htmlFor="searchInput">
			<span className="ir">검색</span>
			</label>
			<input
			type="search"
			name="searchInput"
			id="searchInput"
			autoComplete="off"
			className='search__input'
			placeholder='검색어를 입력하세요'
			onChange={e => setSearchKeyword(e.target.value)}
			onKeyDown={e => {
				if (e.key==='Enter') {
					handleSearch();
				}
			}}
			>
			</input>
		</div>
		</div>
	)
	}

export default Search

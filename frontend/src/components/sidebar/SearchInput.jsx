import React from 'react';
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
    return (
        <form>
            <input type="text" placeholder={'Поиск'} className={'input input-bordered rounded-full focus:outline-none'}/>
            <button type={'submit'} className={'btn btn-circle text-white'}>
                <FaSearch/>
            </button>
        </form>
    );
};

export default SearchInput;
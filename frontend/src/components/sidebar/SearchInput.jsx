import React, {useState} from 'react';
import { FaSearch } from "react-icons/fa";
import useConversation from "../../store/useConversation.js";
const SearchInput = () => {
    const [searchText, setSearchText] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!searchText) return;
        console.log(searchText);
        setSearchText('');
    }

    return (
        <form>
            <input type="text"
                   placeholder={'Поиск'}
                   className={'input input-bordered rounded-full focus:outline-none'}
                   value={searchText}
                   onChange={(e) => setSearchText(e.target.value)}
            />
            <button type={'submit'} className={'btn btn-circle text-white'} onClick={handleSubmit}>
                <FaSearch/>
            </button>
        </form>
    );
};

export default SearchInput;
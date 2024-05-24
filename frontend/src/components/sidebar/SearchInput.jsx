import React, {useState} from 'react';
import { FaSearch } from "react-icons/fa";
import useConversation from "../../store/useConversation.js";
import User from "./User.jsx";
import SearchedUserList from "./SearchedUserList.jsx";
import {getSearchedUsers} from "../../API/API.js";
const SearchInput = () => {

    const [text, setText] = useState('')
    const [users, setUsers] = useState([]);

    const [searchVisible, setSearchVisible] = useState(false);



    const handleSubmit = async (e) => {
        if(e.target.value !== '') {
            setUsers(await getSearchedUsers(e.target.value));
            setSearchVisible(true);
        }
        else {
            setUsers([]);
            setSearchVisible(false);
        }
    }

    return (
        <form className={'flex'}>
            <div className={'flex relative w-full'}>
                <input type="text"
                       placeholder={'Поиск'}
                       className={'input input-bordered rounded-full focus:outline-none flex-auto'}
                       onChange={(e) => handleSubmit(e)}
                />
                <div className={`z-50 ${searchVisible ? '' : 'hidden'} gap-2 h-fit min-h-8 max-h-44 overflow-auto border border-gray-500 top-14 rounded-bl-3xl absolute bottom-0 right-0 left-0 flex flex-col bg-base-100`}>
                    <SearchedUserList users={users}/>
                </div>
            </div>


        </form>
    );
};

export default SearchInput;
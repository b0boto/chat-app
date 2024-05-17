import React from 'react';
import User from "./User.jsx";

const SearchedUserList = ({users}) => {
    return (
        <div className={'text-center'}>
            {users.length ? users.map((user) => (
                <User user={user} key={user.username}/>
            )) : 'Нет результата'}
            -
        </div>
    );
};

export default SearchedUserList;
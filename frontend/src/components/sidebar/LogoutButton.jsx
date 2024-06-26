import React from 'react';
import { CiLogout } from "react-icons/ci";
import useLogout from '../../hooks/useLogout.js'

const LogoutButton = () => {
    const {loading, logout} = useLogout();

    return (
        <div className={'mt-auto flex-0'}>
            {!loading ? (
                <div className={'flex justify-between'}>
                    <CiLogout className={'w-6 h-6 cursor-pointer'}
                              onClick={logout}
                              title={'Выйти из аккаунта'}

                    />
                </div>

            ) : (
                <span className={'loading loading-spinner'}></span>
            )}


        </div>
    );
};

export default LogoutButton;
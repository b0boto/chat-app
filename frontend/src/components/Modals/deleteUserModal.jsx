import React from 'react';
import toast from "react-hot-toast";

const DeleteUserModal = ({children, visible, setVisible, userId}) => {
    const handleSubmit = () => {
        console.log(userId);
        setVisible(false)
        toast.success('Вы успешно удалили пользователя!')
    }

    return (
        <div className={`modal ${visible ? 'opacity-100 pointer-events-auto' : ''} `}>
            <div className={'modal-box'}>
                <h1 className={'text-center'}>Вы действительно хотите удалить данного пользователя из группы?</h1>

                <div className={'flex items-center justify-center mt-4 gap-4'}>
                    <button className={'btn btn-outline btn-error text-white cursor-pointer'} onClick={handleSubmit}>Удалить</button>
                    <button className={'btn text-white cursor-pointer'} onClick={() => setVisible(false)}>Отменить</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
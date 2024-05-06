import React from 'react';
import toast from "react-hot-toast";

const AddUserModal = ({children, visible, setVisible}) => {
    const handleSubmit = () => {
        setVisible(false)
        toast.success('Вы успешно добавили пользователя!')
    }

    return (
        <div className={`modal ${visible ? 'opacity-100 pointer-events-auto' : ''} `}>
            <div className={'modal-box'}>
                <h1 className={'text-center'}>Введите имя пользователя которого хотите добавить</h1>

                <div className={'flex items-center justify-center mt-4 gap-4'}>
                    <button className={'btn btn-outline btn-error text-white cursor-pointer'} onClick={handleSubmit}>Удалить</button>
                    <button className={'btn text-white cursor-pointer'} onClick={() => setVisible(false)}>Отменить</button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
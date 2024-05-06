import React from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";

const AddGroupButton = () => {



    return (
        <div className={'cursor-pointer hover:bg-gray-700'}>
            <IoMdAddCircleOutline
                onClick={()=>document.getElementById('my_modal_1').showModal()}
                title={'Добавить группу'}
                className={'w-12 h-12'}
            />
        </div>
    );
};

export default AddGroupButton;
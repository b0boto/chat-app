import React, {useState} from 'react';
import useCreateConversation from "../../hooks/useCreateConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";

const CreateGroupModal = () => {
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('GROUP');
    const {createConversation} = useCreateConversation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!groupName) return;
        await createConversation(groupName, groupType);
        setGroupName('');
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className={'flex gap-2'}>
                        <label>Название группы:</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className={'flex gap-2'}>
                        <label>Тип группы:</label>
                        <select name="" id="" onChange={(e) => setGroupType(e.target.value)} value={groupType}>
                            <option value="GROUP">GROUP</option>
                            <option value="CHANNEL">CHANNEL</option>
                        </select>
                    </div>

                    <div className="modal-action">
                        <form method="dialog" className={'justify-between flex w-full'}>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={handleSubmit}>Создать</button>
                            <button className="btn">Закрыть</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CreateGroupModal;
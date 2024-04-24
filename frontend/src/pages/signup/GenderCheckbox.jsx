import React from 'react';

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {


    return (
        <div className={'flex justify-around'}>
            <div className={'form-control'}>
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'Male' ? 'selected' : ""}`}>
                    <span className={'label-text'}>Male</span>
                    <input type="checkbox" className={'checkbox border-slate-900'}
                           checked={selectedGender === 'Male'}
                           onChange={() => onCheckboxChange('Male')}
                    />
                </label>
            </div>
            <div className={'form-control'}>
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'Female' ? 'selected' : ""}`}>
                    <input type="checkbox" className={'checkbox border-slate-900'}
                           checked={selectedGender === 'Female'}
                           onChange={() => onCheckboxChange('Female')}
                    />
                    <span className={'label-text'}>Female</span>
                </label>
            </div>
        </div>
    );
};

export default GenderCheckbox;
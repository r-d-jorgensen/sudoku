import React from 'react';
import InputMask  from 'react-input-mask'

//small component for each number in the puzzle
//TODO: look into useing a useState hook instead of onChange and props
const NumberBox = ({value, id, onChange}) => {
    return (
        <InputMask 
            className="numberBox"
            mask={'9'}
            maskChar={""}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value, id)} />
    );
}

export default NumberBox;

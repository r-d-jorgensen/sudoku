import React from 'react';
import InputMask from 'react-input-mask'

const NumberBox = ({value, id, onChange}) => {
    return (
        <InputMask
            className="numberBox"
            mask="9"
            maskChar=""
            value={value}
            onChange={(e) => onChange(e.currentTarget.value, id)}>
        </InputMask> 
    );
}

export default NumberBox;
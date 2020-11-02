import React from 'react';

const NumberBox = ({value, id, onChange}) => {
    return (
        <input
            className="numberBox"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value, id)}/> 
    );
}

export default NumberBox;
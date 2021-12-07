import React from 'react';

function Title(props) {
    return (
        <div className={`alert mt-3 ${props.color}`}>
            <h1 className='text-center'>{props.text}</h1>
        </div>
    );
}

export default Title;
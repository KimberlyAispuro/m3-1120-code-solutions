import React from 'react';
import ReactDOM from 'react-dom';

function CustomButton(props){
return <button>{props.text}</button>
}

const element = <CustomButton text="Click Me!"/>

ReactDOM.render(
    element,
    document.getElementById('root')
);
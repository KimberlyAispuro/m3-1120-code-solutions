import React from 'react';

export default class ToggleSwitch extends React.Component{
    constructor(props){
        super(props);
        this.state = {isClicked: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        this.setState({isClicked: true });
    }

    render(){
        return(
            <div>
                <input type ={'checkbox'} className={'switchButton'} checked={this.state.handleClick} onChange={this.handleClick}>
                </input>
            </div>
        );
    }
}
import React from 'react';

export default class HotButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {countClick:0};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        this.setState({countClick: this.state.countClick + 1});
    }

    render(){
        const countClick = this.state.countClick;
        let buttonClass;
        if(countClick >= 3 && countClick < 6){
            buttonClass = 'purple';
        } else if(countClick >= 6 && countClick < 9) {
            buttonClass = 'lightpurple';
        } else if(countClick >= 9 && countClick < 12){
            buttonClass = 'coralpeach';
        } else if(countClick >= 12 && countClick < 15){
            buttonClass = 'lightorange';
        } else if(countClick >= 15 && countClick < 18){
            buttonClass = 'yellow';
        } else if(countClick == 18){
            buttonClass = 'white';
        }

        return(
            <div>
                <button className={buttonClass} onClick={this.handleClick}>Hot Button</button>
            </div>
        );
    }
}
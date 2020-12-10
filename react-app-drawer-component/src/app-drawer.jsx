import React from 'react';

export default class AppDrawer extends React.Component{
    constructor(props){
        super(props);
        this.state = {isClicked: false};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event){
        this.setState({isClicked: true });
    }

    render(){
        if(this.state.isClicked){
            return(
                <div className='root'>
                    <a href="">
                        <div className='menu-container'>
                            <ul>
                                <h2><a href="">Menu</a></h2>
                                <li><a href="">About</a></li>
                                <li><a href="">Get Started</a></li>
                                <li><a href="">Sign In</a></li>
                            </ul>
                        </div>
                    </a>
                </div>
            );
        } else {
            return(
                <div className='icon-container' onClick={this.handleClick}>
                    <i className ='fas fa-bars'></i>
                </div>
            );
        }
    }
}
import React, { Component } from 'react';

import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <header className='navbar'>
        <nav className ='navbar_navigation'>
          <div></div>
          <div className="navbar_logo"><a href="/">WORD SEARCH</a></div>
          <div className="Spacer" />
          <div className="navbar_navigation-items">
            <ul>
              <li><a href='/'>Home</a></li>              
              <li><a href='/'>Browse Puzzles</a></li>   
              <li><a href='/'>About Me</a></li>   
            </ul>
          </div>
        </nav> 
      </header>          
    )
  }
}

export default Navigation;

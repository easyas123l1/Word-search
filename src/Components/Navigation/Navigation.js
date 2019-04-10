import React, { Component } from 'react';

import './Navigation.css';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <header className='navbar'>
        <nav className ='navbar_navigation'>
          <div></div>
          <div className="navbar_logo"><NavLink to="/" exact activeStyle={
            {backgroundColor: '#00FFFF',
            color: 'black'}
          }>WORD SEARCH</NavLink></div>
          <div className="Spacer" />
          <div className="navbar_navigation-items">
            <ul>
              <li><NavLink to="/" exact activeStyle={
                {color:'blue',
                backgroundColor:'#00FFFF'}
              }>Home</NavLink>
              </li>              
              <li><NavLink to="/BrowsePuzzles" exact activeStyle={
                {color:'blue',
                backgroundColor:'#00FFFF'}
              }>Browse Puzzles</NavLink>
              </li>   
              <li><NavLink to="/AboutMe" exact activeStyle={
                {color:'blue',
                backgroundColor:'#00FFFF'}
              }>About Me</NavLink>
              </li>   
            </ul>
          </div>
        </nav> 
      </header>          
    )
  }
}

export default Navigation;

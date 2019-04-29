import React, { Component } from 'react';

import './SolvedPuzzle.css';

class SolvedPuzzle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='SolvedPuzzle'>
        <h1>CONGRATULATIONS YOU COMPLETED THE PUZZLE!!! </h1> 
      </div>
    )
  }
}

export default SolvedPuzzle;
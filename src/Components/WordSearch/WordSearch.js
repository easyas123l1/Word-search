import React, { Component } from 'react';

import './WordSearch.css';
import uuid from 'uuid';

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 16
    };
  }

  render() {
    let lines = [];
    for (let i = 0; this.state.size > i; i++) { 
      let line = '';
      for (let i2 = 0; this.state.size > i2; i2++) {
        line += i + ',' + i2 + '  ';
        if ((i2 + 1) === this.state.size ) {
          const newItem = {
            text: line,
            id: uuid.v4()
          }
          lines.push(newItem)
          console.log(i2+1 + ' ' + this.state.size);
        }
      }
    }
    console.log(lines);
    return (
      <div className="wordSearch">
        <div className="findWords">
          {lines.map((line) => (
            <p id='wordRow' key={line.id}>{line.text}</p>
          ))}
        </div>
        <ul>
          {this.props.words.map((word, i) => (
            <li id='wordList' key={word.id}> #{i + 1}: {word.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default WordSearch;
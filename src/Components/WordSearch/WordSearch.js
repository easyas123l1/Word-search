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
      let line = [];
      for (let i2 = 0; this.state.size > i2; i2++) {
        let letter = ''
        letter = i + ',' + i2 
        const newLetter = {
          text: letter,
          id: letter
        }
        line.push(newLetter);
        if (i2 + 1 === this.state.size) {
          const newLine = {
            text: line,
            id: uuid.v4()
          }
          lines.push(newLine);
        }
        }
    }
    console.log(lines);
    console.log(Object.keys(lines))
    return (
      <div className="wordSearch">
        <div className="findWords">
        <ul>
          {lines.map(line => (
            <li id="wordRow" key={line.id} className="findWordRow">
              {line.text.map(letter => (
                <p id="letter" key={letter.id}>
                  {letter.text}
                </p>
              ))}
            </li>
          ))}
        </ul>
          
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
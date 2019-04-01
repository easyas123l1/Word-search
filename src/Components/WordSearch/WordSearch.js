import React, { Component } from 'react';

import './WordSearch.css';
import uuid from 'uuid';

class WordSearch extends Component {
  randomPosition = () => {
    let position1 = '';
    let position2 = '';

    position1 = Math.floor(Math.random() * this.props.size);
    position2 = Math.floor(Math.random() * this.props.size);

    let position = position1 + ', ' + position2;
    return position;
  }

  randomLetter = () => {
    let letter = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    letter = possible.charAt(Math.floor(Math.random() * possible.length));

    return letter; 
  }

  render() {
    let lines = [];
    for (let i = 0; this.props.size > i; i++) { 
      let line = [];
      for (let i2 = 0; this.props.size > i2; i2++) {
        let letterid = '';
        let letter = '';
        letter = this.randomLetter();
        letterid = i + ', ' + i2;
        const newLetter = {
          text: letter,
          id: letterid
        }
        line.push(newLetter);
        if (i2 + 1 === this.props.size) {
          const newLine = {
            text: line,
            id: uuid.v4()
          }
          lines.push(newLine);
        }
        }
    }
    console.log(this.randomPosition());
    return (
      <div className="wordSearch">
        <div className="Puzzle">
        <h1>TITLE OF PUZZLE</h1>
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
        <div className="wordsToFind">
          <ul>
            <h1>WORDS TO FIND:</h1>
            {this.props.words.map((word, i) => (
              <li id='wordList' key={word.id}>{word.text}</li>
            ))}
          </ul>
          <button id='regeneratePuzzle'>Regenerate Puzzle</button>
          <button id='savePuzzle'>Save Puzzle</button>
        </div>     
      </div>
    );
  }
}

export default WordSearch;
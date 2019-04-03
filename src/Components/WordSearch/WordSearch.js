import React, { Component } from 'react';

import './WordSearch.css';
import uuid from 'uuid';

class WordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: []
    }
  }
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
  
  testDirections = (word, position) => {
    let length = word.length;
    let newPosition = position.replace(',','');
    newPosition = newPosition.split(' ');
    let row = newPosition[0];
    let column = newPosition[1];
    //make row and column #'s
    row = +row;
    column = +column;
    //directions to test set default to true
    let up = true;
    let left = true;
    let down = true;
    let right = true;
    if (column - length < 0) {
      up = false;
    }
    if (row - length < 0) {
      left = false;
    }
    if (column + length > this.props.size) {
      down = false;
    }
    if (row + length > this.props.size) {
      right = false;
    }
    return [up, left, down, right, row, column];
  }

  componentWillMount() {
    let words = [];
    for (let word in this.props.words) {
      words.push(this.props.words[word].text);
      }
    for (let word in words) {
      let attempts = 0;
      let possiblePlacement = true;
      do {
        attempts++;
        let directions = this.testDirections(words[word], this.randomPosition());
        let directUp = directions[0];
        let directLeft = directions[1];
        let directDown = directions[2];
        let directRight = directions[3];
        let row = directions[4];
        let column = directions[5];
        if (!directUp && !directLeft && !directDown && !directRight) {
          console.log('wont work');
          possiblePlacement = false;
        }
      }//if attempts hits max spit out error send them back to home page and have them reduce words or increase puzzle size.
      while (attempts < 100 && !possiblePlacement);
    }

    for (let i = 0; this.props.size > i; i++) { 
      let line = [];
      for (let i2 = 0; this.props.size > i2; i2++) {
        let letterid = '';
        let letter = '';
        letterid = i + ', ' + i2;
        letter = letterid //will equal this.randomLetter();
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
          this.setState(state => ({
            lines: state.lines.concat(newLine)
          }))
        }
        }
    }
  }

  render() {
    return (
      <div className="wordSearch">
        <div className="Puzzle">
        <h1>TITLE OF PUZZLE</h1>
        <ul>
          {this.state.lines.map(line => (
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